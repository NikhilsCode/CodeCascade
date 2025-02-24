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
git checkout master || { echo "Failed to checkout source branch: $SOURCE_BRANCH"; exit 1; };
echo "In c:/Eroam/Frontend/eroam2-front place"

for PullBranch in "$@"; do
    echo "Switching to source branch: $SOURCE_BRANCH"
    git checkout -b $SOURCE_BRANCH 2>/dev/null || git checkout $SOURCE_BRANCH || { echo "Failed to checkout source branch: $SOURCE_BRANCH"; exit 1; }

 

    echo "Pulling branch '$PullBranch' into '$SOURCE_BRANCH'"


    # Attempt to pull the branch into the source branch
    pull_output=$(git pull main $PullBranch 2>&1)
    echo "$pull_output"

    # Check for conflicts
    if echo "$pull_output" | grep -q "CONFLICT"; then
        echo "Merge conflicts detected while pulling '$PullBranch'. Rolling back changes..."
        git merge --abort || { echo "Failed to abort merge. Manual intervention needed."; exit 1; }
        exit 1
    fi
    # Check for Aborting
        if echo "$pull_output" | grep -q "Aborting"; then
            echo "Aborting detected while pulling '$PullBranch'. Rolling back changes..."
            git merge --abort || { echo "Failed to abort merge. Manual intervention needed."; exit 1; }
            exit 1
        fi
    # Check for swap file error
    if echo "$pull_output" | grep -q "Swap file"; then
        echo "Swap file error detected during pull from '$PullBranch'. Rolling back changes..."
        git merge --abort || { echo "Failed to abort merge. Manual intervention needed."; exit 1; }
        exit 1
    fi

    # If no issues, continue
    echo "No conflicts detected. Pull operation successful."


    # Final merge to the source branch if all checks pass
    echo "Successfully merged branch '$PullBranch' into '$SOURCE_BRANCH'."
    echo ""
    echo ""
done

# echo "Creating Building.........................."
# build_output=$(yarn build 2>&1)

# if echo "$build_output" | grep -q "Build complete"; then
#     echo "Successfully completed operations for all branches!"
    exit 0
# else
#     echo "Build Failed!"
#     echo "$build_output" # Optional: Print the build output for debugging.
#     exit 1
# fi