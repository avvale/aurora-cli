#!/bin/bash

# --------------------------------------
# Hotfix helper for production workflow
# --------------------------------------

set -euo pipefail
trap 'echo -e "\033[0;31m❌ Error at line $LINENO. Exiting.\033[0m"' ERR

# --- Branches ---
PROD_BRANCH="environments/plesk-prod"
QA_BRANCH="environments/plesk-qa"
DEV_BRANCH="environments/plesk-dev"
MAIN_BRANCH="main"

# --- Color Definitions ---
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
BOLD='\033[1m'
RESET='\033[0m'

# --- Logging Helper ---
log() {
    local COLOR=$1
    shift
    echo -e "${!COLOR}$*${RESET}"
}

# --- Git Branch Switch & Pull Helper ---
git_switch_and_pull() {
    local BRANCH=$1
    log BLUE "→ Switching to $BRANCH branch..."
    git switch "$BRANCH" > /dev/null 2>&1
    log BLUE "→ Updating $BRANCH from origin..."
    git pull origin "$BRANCH" > /dev/null 2>&1
}

# --- 1) Ir a PROD y update ---
git fetch --all --tags --prune > /dev/null 2>&1
git_switch_and_pull "$PROD_BRANCH"

# --- 2) Calculate next hotfix ---
#    Read the current version from package.json, e.g. "1.1.1"
NEW_VERSION=$(node -p "require('./package.json').version")
BASE_TAG="v$NEW_VERSION"

#    Look for existing tags vX.Y.Z-hotfix.N and calculate the next N
LAST_N=$(
    git tag -l "$BASE_TAG-hotfix.*" \
    | sed -E 's/.*-hotfix\.([0-9]+)$/\1/' \
    | sort -n \
    | tail -1
)

if [[ -z "${LAST_N:-}" ]]; then
    NEXT_N=1
else
    NEXT_N=$((LAST_N + 1))
fi

NEXT_TAG="$BASE_TAG-hotfix.$NEXT_N"
COMMIT_MSG="fix: hotfix deployed in production $NEXT_TAG"

log BLUE "→ Base version in production: $BASE_TAG"
log BLUE "→ Last hotfix detected: ${LAST_N:-none}"
log GREEN "→ Next hotfix will be: $NEXT_TAG"

# --- 3) Add changes and commit in PROD ---
git add -A
if git diff --cached --quiet; then
    log RED "No changes to commit in $PROD_BRANCH. Exiting."
    exit 1
fi

log BLUE "→ Creating commit in $PROD_BRANCH: '$COMMIT_MSG'..."
git commit -m "$COMMIT_MSG" > /dev/null 2>&1

# Save the commit hash for later cherry-pick
HOTFIX_COMMIT="$(git rev-parse HEAD)"
log GREEN "✅ Commit created: $HOTFIX_COMMIT"

# --- 4) Create tag and push to origin ---
log BLUE "→ Creating tag $NEXT_TAG..."
git tag -a "$NEXT_TAG" -m "$NEXT_TAG"

log BLUE "→ Pushing commit and tag to origin..."
git push origin "$PROD_BRANCH" > /dev/null 2>&1
git push origin "$NEXT_TAG" > /dev/null 2>&1
log GREEN "✅ Tag $NEXT_TAG pushed to origin."

# --- 5) Cherry-pick a MAIN ---
git_switch_and_pull "$MAIN_BRANCH"
log BLUE "→ Cherry-pick del commit $HOTFIX_COMMIT a $MAIN_BRANCH..."
if ! git cherry-pick -x "$HOTFIX_COMMIT" > /dev/null 2>&1; then
    log RED "Cherry-pick failed in $MAIN_BRANCH. Please resolve conflicts and run: git cherry-pick --continue"
    exit 2
fi
git push origin "$MAIN_BRANCH" > /dev/null 2>&1
log GREEN "✅ Cherry-pick applied and pushed to $MAIN_BRANCH."
