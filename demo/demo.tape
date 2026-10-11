# Regenerate with `vhs demo/demo.tape` from the repo root. Needs the fork at ../pi-my.
Output demo/demo.gif

Set Shell bash
Set FontSize 15
Set Width 1200
Set Height 640
Set Padding 16
Set Theme "Catppuccin Mocha"
Set TypingSpeed 60ms
Set Framerate 20

# Hidden setup: a throwaway HOME holds the agent dir and project, so ~/.pi/agent and real paths stay out of the recording.
Hide
Type `PI="$PWD/../pi-my/pi-test.sh"; EXT="$PWD"; export HOME="$(cd "$(mktemp -d)" && pwd -P)"; mkdir -p ~/.pi/agent ~/my-project; cd ~/my-project`
Enter
Type `printf '{"defaultProvider":"demo","defaultModel":"demo-model","defaultThinkingLevel":"medium","packages":["%s"],"extensions":["%s/demo/faux.ts"],"tuiMode":"fullscreen","quietStartup":"header","theme":"dark","lastChangelogVersion":"99.0.0"}' "$EXT" "$EXT" > ~/.pi/agent/settings.json`
Enter
Type `PI_CODING_AGENT_DIR=~/.pi/agent PI_SKIP_VERSION_CHECK=1 "$PI" --no-env`
Enter
Sleep 10s
Show

Sleep 2s
Type "How should I start on the parser?"
Sleep 500ms
Enter
Sleep 3s

Type "/name parser-fix"
Sleep 500ms
Enter
Sleep 2.5s

Shift+Tab
Sleep 2.5s

Type "Where should retries live?"
Sleep 500ms
Enter
Sleep 4s
