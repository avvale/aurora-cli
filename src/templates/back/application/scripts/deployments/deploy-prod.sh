#!/bin/bash

# ------------------------------
# Production Deployment Script
# ------------------------------

set -euo pipefail
trap 'echo -e "\033[0;31m❌ Error at line $LINENO. Exiting.\033[0m"' ERR

# --- Step 1: Define branches ---
PROD_BRANCH="environments/plesk-prod"
QA_BRANCH="environments/plesk-qa"
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

# --- Step 2: Switch to production branch and update ---
git_switch_and_pull "$PROD_BRANCH"

# --- Step 3: Merge QA into production ---
log BLUE "→ Merging $QA_BRANCH into $PROD_BRANCH..."
git merge "$QA_BRANCH" > /dev/null 2>&1

# --- Step 4: Push production branch ---
log BLUE "→ Pushing $PROD_BRANCH..."
git push origin "$PROD_BRANCH" > /dev/null 2>&1

# --- Step 5: Show current version ---
NEW_VERSION=$(node -p "require('./package.json').version")
log GREEN "✅ Production deployment complete. Version: v$NEW_VERSION"

# --- Step 6: Return to main branch ---
git_switch_and_pull "$MAIN_BRANCH"
log GREEN "→ Returned to $MAIN_BRANCH branch."