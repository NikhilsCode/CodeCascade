#!/bin/bash
#
## Input validation
#if [ "$#" -ne 2 ]; then
#    echo "Usage: $0 <source_branch> <branch_to_pull>"
#    exit 1
#fi
#
## Variables
#SOURCE_BRANCH=$1
#BRANCH_TO_PULL=$2
#TEST_BRANCH="testCheckBranch2345"
#
#cd c:
#cd Eroam/Frontend/eroam2-front
#echo "in c:/Eroam/Frontend/eroam2-front place"
#
#git stash
## Step 1: Checkout the source branch and pull latest changes
#echo "Switching to source branch: $SOURCE_BRANCH"
#git checkout -b $SOURCE_BRANCH
#git checkout $SOURCE_BRANCH || { echo "Failed to checkout source branch"; exit 1; }
##git pull main  $SOURCE_BRANCH || { echo "Failed to pull source branch"; exit 1; }
#
## Step 2: Create a test branch from source
#echo "Creating test branch: $TEST_BRANCH"
#git checkout -b $TEST_BRANCH || { echo "Failed to create test branch"; exit 1; }
#
## Step 3: Pull the target branch into testCheckBranch
#echo "Pulling branch '$BRANCH_TO_PULL' into '$TEST_BRANCH' for conflict checks..."
#if git pull main $BRANCH_TO_PULL; then
#    echo "No conflicts detected. Pull operation successful."
##     git checkout $SOURCE_BRANCH
##     git pull main $BRANCH_TO_PULL
#
#else
#    echo "Conflicts detected while pulling '$BRANCH_TO_PULL'. Aborting process."
#    git checkout $SOURCE_BRANCH
#    git branch -D $TEST_BRANCH
#    exit 1
#fi
#
## Step 4: Cleanup - Delete testCheckBranch
#echo "Deleting test branch '$TEST_BRANCH'..."
#git checkout $SOURCE_BRANCH
#git branch -D $TEST_BRANCH || { echo "Failed to delete test branch"; exit 1; }
#
#echo "Successfully done"



# Input validation
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_branch> <branch_to_pull>"
    exit 1
fi

# Variables
SOURCE_BRANCH=$1
BRANCH_TO_PULL=$2
TEST_BRANCH="testCheckBranch2345"

cd c:
cd Eroam/Frontend/eroam2-front || { echo "Failed to navigate to project directory"; exit 1; }
echo "In c:/Eroam/Frontend/eroam2-front place"

git stash
# Step 1: Checkout the source branch and pull latest changes
echo "Switching to source branch: $SOURCE_BRANCH"
git checkout -b $SOURCE_BRANCH
git checkout $SOURCE_BRANCH || { echo "Failed to checkout source branch"; exit 1; }

# Step 2: Create a test branch from source
echo "Creating test branch: $TEST_BRANCH"
git checkout -b $TEST_BRANCH || { echo "Failed to create test branch"; exit 1; }

# Step 3: Pull the target branch into the test branch
echo "Pulling branch '$BRANCH_TO_PULL' into '$TEST_BRANCH' for conflict checks..."
pull_output=$(git pull main $BRANCH_TO_PULL 2>&1)

# Check for Vim swap file error in the output
if echo "$pull_output" | grep -q "Swap file"; then
    echo "Swap file error detected during pull. Aborting process."
    git checkout $SOURCE_BRANCH
    git branch -D $TEST_BRANCH
    exit 1
fi

# Check for general pull success or conflict
if [[ $? -ne 0 ]]; then
    echo "Conflicts detected while pulling '$BRANCH_TO_PULL'. Aborting process."
    git checkout $SOURCE_BRANCH
    git branch -D $TEST_BRANCH
    exit 1
else
    echo "No conflicts detected. Pull operation successful."
fi

# Step 4: Cleanup - Delete the test branch
echo "Deleting test branch '$TEST_BRANCH'..."
git checkout $SOURCE_BRANCH
git branch -D $TEST_BRANCH || { echo "Failed to delete test branch"; exit 1; }

echo "Successfully done."
