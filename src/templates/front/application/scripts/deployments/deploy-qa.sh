#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
BOLD='\033[1m'
RESET='\033[0m'

set -e  # Exit on any error

# Step 1: Switch to qa branch and update with latest changes
echo -e "${BOLD}${BLUE}→ Switching to qa branch...${RESET}"
git switch environments/plesk-qa
git pull origin environments/plesk-qa

# Step 2: Merge development branch into qa branch
echo -e "${BLUE}→ Merging development into qa...${RESET}"
git merge environments/plesk-dev

# Step 3: Push qa branch to remote
echo -e "${BLUE}→ Pushing qa branch...${RESET}"
git push origin environments/plesk-qa

# Get current version from package.json
NEW_VERSION=$(node -p "require('./package.json').version")

echo -e "${GREEN}✅ QA deployment complete. Version: v$NEW_VERSION${RESET}"