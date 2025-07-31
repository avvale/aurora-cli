#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
BOLD='\033[1m'
RESET='\033[0m'

set -e  # Exit on any error

# Step 1: Switch to production branch and update with latest changes
echo -e "${BOLD}${BLUE}→ Switching to production branch...${RESET}"
git switch environments/plesk-prod
git pull origin environments/plesk-prod

# Step 2: Merge quality branch into production branch
echo -e "${BLUE}→ Merging quality into production...${RESET}"
git merge environments/plesk-qa

# Step 3: Push production branch to remote
echo -e "${BLUE}→ Pushing production branch...${RESET}"
git push origin environments/plesk-prod

# Get current version from package.json
NEW_VERSION=$(node -p "require('./package.json').version")

echo -e "${GREEN}✅ Prod deployment complete. Version: v$NEW_VERSION${RESET}"