import { basename } from "node:path";
import { type ExtensionAPI, type Theme, VERSION } from "@earendil-works/pi-coding-agent";
import { type Component, type TUI, truncateToWidth } from "@earendil-works/pi-tui";

function formatTokens(n: number): string {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
	return n < 1000 ? `${n}` : `${Math.round(n / 1000)}k`;
}

function shortenHome(path: string): string {
	const home = process.env.HOME;
	return home && path.startsWith(home) ? `~${path.slice(home.length)}` : path;
}

export default function piStatusline(pi: ExtensionAPI) {
	// Captured from the first factory call; widgets and header share one TUI.
	let tui: TUI | undefined;
	const rerender = () => tui?.requestRender();

	/** One-line component that renders `text` live on every frame. */
	const line =
		(text: (theme: Theme) => string) =>
		(t: TUI, theme: Theme): Component => {
			tui = t;
			return { render: (width) => [truncateToWidth(text(theme), width)], invalidate() {} };
		};

	pi.on("session_start", (_event, ctx) => {
		if (ctx.mode !== "tui") return;

		ctx.ui.setHeader(
			line(
				(theme) =>
					`${theme.fg("accent", "π pi-my")} ${theme.fg("dim", `v${VERSION}`)} ${theme.fg("muted", shortenHome(ctx.cwd))}`,
			),
		);

		// Winbar: session name, else the cwd basename.
		ctx.ui.setWidget(
			"pi-statusline.winbar",
			line((theme) => theme.fg("muted", pi.getSessionName() ?? basename(ctx.cwd))),
			{ placement: "borderTopRight" },
		);

		// Statusline: model and thinking level on the left, context usage on the right.
		ctx.ui.setWidget(
			"pi-statusline.left",
			line((theme) => {
				const model = ctx.model?.id ?? "no model";
				return `${theme.fg("accent", model)}${theme.fg("dim", ` · ${pi.getThinkingLevel()}`)}`;
			}),
			{ placement: "borderBottomLeft" },
		);
		ctx.ui.setWidget(
			"pi-statusline.right",
			line((theme) => {
				const usage = ctx.getContextUsage();
				if (!usage) return "";
				const used = usage.tokens === null ? "?" : formatTokens(usage.tokens);
				const percent = usage.percent === null ? "" : ` ${Math.round(usage.percent)}%`;
				return theme.fg("dim", `${used}/${formatTokens(usage.contextWindow)}${percent}`);
			}),
			{ placement: "borderBottomRight" },
		);
	});

	// Segments read live state at render time; these events change it without
	// necessarily repainting the editor.
	pi.on("model_select", rerender);
	pi.on("thinking_level_select", rerender);
	pi.on("session_info_changed", rerender);
	pi.on("message_end", rerender);
	pi.on("session_tree", rerender);
	pi.on("session_compact", rerender);
	pi.on("session_shutdown", () => {
		tui = undefined;
	});
}
