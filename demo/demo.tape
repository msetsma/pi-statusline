# Regenerate with `vhs demo/demo.tape` from the repo root.
# Needs: vhs, ffmpeg, and the fork at ../pi-my (runs offline with the fake model in demo/faux.ts).
Output demo/demo.gif

Set Shell bash
Set FontSize 22
Set Width 1200
Set Height 680
Set Padding 16
Set Theme "Catppuccin Mocha"
Set TypingSpeed 50ms
Set Framerate 20

# Hidden setup: a throwaway HOME holds the agent dir and project, so ~/.pi/agent and real paths stay out of the recording.
# One prompt is sent before Show so the statusline opens with non-zero context usage.
Hide
Type@1ms `PI="$PWD/../pi-my/pi-test.sh"; EXT="$PWD"; export HOME="$(cd "$(mktemp -d)" && pwd -P)"; mkdir -p ~/.pi/agent ~/my-project; cd ~/my-project`
Enter
Type@1ms `printf '{"defaultProvider":"demo","defaultModel":"demo-model","defaultThinkingLevel":"medium","packages":["%s"],"extensions":["%s/demo/faux.ts"],"tuiMode":"fullscreen","quietStartup":"header","theme":"dark","lastChangelogVersion":"99.0.0"}' "$EXT" "$EXT" > ~/.pi/agent/settings.json`
Enter
Type@1ms `clear; PI_CODING_AGENT_DIR=~/.pi/agent PI_SKIP_VERSION_CHECK=1 "$PI" --no-env`
Enter
Wait+Screen@30s /demo-model/
Type@1ms "How should I start on the parser?"
Enter
Wait+Screen@30s /failing test for the parser/
Sleep 500ms
Show

Sleep 500ms
Shift+Tab
Sleep 2s

Type "/name parser-fix"
Sleep 400ms
Enter
Sleep 2s

Type "Where should retries live?"
Sleep 400ms
Enter
Wait+Screen@10s /In the HTTP client/
Sleep 2.5s
