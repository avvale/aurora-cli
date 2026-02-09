#!/bin/bash
PID_FILE="/tmp/claude-music.pid"
MUSIC_FILE="$CLAUDE_PROJECT_DIR/.claude/assets/mario.mp3"

# If already playing, exit
if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    exit 0
fi

# Start music in background
afplay "$MUSIC_FILE" &
echo $! > "$PID_FILE"
exit 0
