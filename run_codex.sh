#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
codex exec --sandbox workspace-write "Read README.md, AGENTS.md, research/app-spec.md, research/validation-notes.md, and CODEX_TASK.md. Build the app described in CODEX_TASK.md. Verify with npm install and npm run build; add and run tests for the recommendation logic if practical."
