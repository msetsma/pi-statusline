import { fauxAssistantMessage, fauxProvider } from "@earendil-works/pi-ai";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// Offline model for the demo recording: canned replies, no network.
const replies = [
	"Start with a failing test for the parser, then make the smallest change that passes it.",
	"In the HTTP client, so every caller gets the same backoff without repeating it.",
	"Done. Both cases are covered and the suite is green.",
];

export default function (pi: ExtensionAPI) {
	const faux = fauxProvider({
		provider: "demo",
		models: [{ id: "demo-model", name: "Demo Model", contextWindow: 200_000, reasoning: true }],
		tokensPerSecond: 200,
	});
	faux.setResponses(
		Array.from({ length: 30 }, (_, i) => (_context, options) => {
			// Without prompt caching the usage estimate grows with each turn instead of jumping around.
			if (options) options.cacheRetention = "none";
			return fauxAssistantMessage(replies[i % replies.length]);
		}),
	);
	pi.registerProvider(faux.provider);
}
