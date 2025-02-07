#!/bin/bash
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <branch_1> [<branch_2> ... <branch_n>]"
    exit 1
fi

# Variables
SOURCE_BRANCH=$1
shift
TEST_BRANCH="testCheckBranch23456123"

# Navigate to the project directory
cd c:
cd Eroam/Frontend/eroam2-front || { echo "Failed to navigate to project directory"; exit 1; }
git checkout master;
echo "In c:/Eroam/Frontend/eroam2-front place"

for PullBranch in "$@"; do
    echo "Switching to source branch: $SOURCE_BRANCH"
    git checkout -b $SOURCE_BRANCH 2>/dev/null || git checkout $SOURCE_BRANCH || { echo "Failed to checkout source branch: $SOURCE_BRANCH"; exit 1; }

    echo "Creating test branch: $TEST_BRANCH"
    git checkout -b $TEST_BRANCH || { echo "Failed to create test branch: $TEST_BRANCH"; exit 1; }

    echo "Pulling branch '$PullBranch' into '$TEST_BRANCH' for conflict checks..."


    # Attempt to pull the branch into the test branch
    pull_output=$(git pull main $PullBranch 2>&1)
    echo "$pull_output"

    # Check for conflicts
    if echo "$pull_output" | grep -q "CONFLICT"; then
        echo "Merge conflicts detected while pulling '$PullBranch'. Rolling back changes..."
        git merge --abort || { echo "Failed to abort merge. Manual intervention needed."; exit 1; }
        git checkout $SOURCE_BRANCH
        git branch -D $TEST_BRANCH || { echo "Failed to delete test branch: $TEST_BRANCH"; exit 1; }
        exit 1
    fi

    # Check for swap file error
    if echo "$pull_output" | grep -q "Swap file"; then
        echo "Swap file error detected during pull from '$PullBranch'. Rolling back changes..."
        git merge --abort || { echo "Failed to abort merge. Manual intervention needed."; exit 1; }
        git checkout $SOURCE_BRANCH
        git branch -D $TEST_BRANCH || { echo "Failed to delete test branch: $TEST_BRANCH"; exit 1; }
        exit 1
    fi

    # If no issues, continue
    echo "No conflicts detected. Pull operation successful."


    # Cleanup - Delete the test branch
    echo "Deleting test branch '$TEST_BRANCH'..."
    git checkout $SOURCE_BRANCH
    git branch -D $TEST_BRANCH || { echo "Failed to delete test branch: $TEST_BRANCH"; exit 1; }

    # Final merge to the source branch if all checks pass
    echo "Merging branch '$PullBranch' into source branch '$SOURCE_BRANCH'..."
    git pull main $PullBranch || { echo "Merge failed. Aborting process."; git merge --abort; exit 1; }
    echo "Successfully merged branch '$PullBranch' into '$SOURCE_BRANCH'."
    echo ""
    echo ""
    sleep 2
done
#yarn build;

echo "Successfully completed operations for all branches!"
























