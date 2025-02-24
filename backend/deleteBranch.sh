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
git checkout master || { echo "Failed to checkout source branch: master"; exit 1; };
echo "In c:/Eroam/Frontend/eroam2-front place"
echo 
git branch -D  $SOURCE_BRANCH  || { echo "Failed Delete branch"; exit 1; }
exit 0;