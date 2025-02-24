
#!/bin/bash
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <branch_1> [<branch_2> ... <branch_n>]"
    exit 1
fi

# Variables
SOURCE_BRANCH=$1
shift


# Navigate to the project directory
cd c:
cd Eroam/Frontend/eroam2-front || { echo "Failed to navigate to project directory"; exit 1; }
git checkout master || { echo "Failed to checkout source branch: $SOURCE_BRANCH"; exit 1; };
 git checkout -b $SOURCE_BRANCH 2>/dev/null || git checkout $SOURCE_BRANCH || { echo "Failed to checkout source branch: $SOURCE_BRANCH"; exit 1; }

echo "Creating Building.........................."
build_output=$(yarn build 2>&1)

if echo "$build_output" | grep -q "Build complete"; then
    echo "Successfully completed operations for all branches!"
    exit 0
else
    echo "Build Failed!"
    echo "$build_output" # Optional: Print the build output for debugging.
    exit 1
fi