#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
RESET='\033[0m'

set -e  # Exit on any error

# Step 1: Ask for the version bump type
echo -e "${BOLD}${BLUE}Select the type of version bump:${RESET}"
select BUMP_TYPE in patch minor major cancel; do
    case $BUMP_TYPE in
        patch|minor|major)
            echo -e "${GREEN}→ Selected: $BUMP_TYPE${RESET}"
            break
            ;;
        cancel)
            echo -e "${RED}❌ Operation cancelled.${RESET}"
            exit 0
            ;;
        *)
            echo -e "${YELLOW}Invalid option. Please choose 1 (patch), 2 (minor), 3 (major), or 4 (cancel).${RESET}"
            ;;
    esac
done

# Step 2: Ensure we are on main
echo -e "${BLUE}→ Switching to main branch...${RESET}"
git switch main
git pull origin main

# Step 3: Bump version using npm
CURRENT_VERSION=$(node -p "require('./package.json').version")
NEW_VERSION=$(npm version "$BUMP_TYPE" --no-git-tag-version | sed 's/v//')

echo -e "${GREEN}→ Bumped version: $CURRENT_VERSION → $NEW_VERSION${RESET}"

# Step 4: Install to update lockfile
echo -e "${BLUE}→ Running npm install...${RESET}"
npm install

# Step 5: Commit version bump
git add package.json package-lock.json
git commit -m "v$NEW_VERSION"
git push origin main

# Step 6: Create and push tag
git tag "v$NEW_VERSION"
git push origin "v$NEW_VERSION"

# Step 7: Switch to deployment branch
echo -e "${BLUE}→ Switching to deployment branch...${RESET}"
git switch environments/plesk-dev
git pull origin environments/plesk-dev

# Step 8: Merge main
echo -e "${BLUE}→ Merging main into deployment branch...${RESET}"
git merge main

# Step 9: Push deployment branch
echo -e "${BLUE}→ Pushing deployment branch...${RESET}"
git push origin environments/plesk-dev

echo -e "${GREEN}✅ Dev deployment complete. Version: v$NEW_VERSION${RESET}"