# CodeCascade
# Feature Branch Deployment Management Tool

## Problem Statement
In fast-paced startup environments, managing code deployments can become chaotic due to the continuous integration of new features, bug fixes, and hotfixes. Typically, the workflow involves:

1. Developers create a **feature branch** from the stable **main (production) branch**.
2. The feature branch is merged into the **develop environment** for initial testing.
3. If the code works fine, it is merged into the **sandbox environment**, which mirrors production.
4. Once validated in sandbox, the code is deployed to **production**.

However, a major issue arises when a feature branch introduces breaking changes in the sandbox environment. Since all merged feature branches are combined into the sandbox, removing a problematic feature requires manually reverting the branch and redeploying all other features. This process is inefficient and error-prone.

## Solution
To address this, I am developing a **Feature Branch Deployment Management Tool** that provides:
- A structured way to manage feature branch deployments.
- The ability to **revert a feature branch** without affecting others.
- An **automated deployment process** using **Spring Boot, Bash, and React**.
- A **local branch-based approach** to avoid direct merges into the environment branches.
- **Live tracking of deployment status** using **Server-Sent Events (SSE)**.

## How It Works
1. **Branch & Environment Management:**
   - Users define environments and specify which feature branches should be included.
   - The tool **tracks which branch was pulled and deployed** at what time.

2. **Isolated Deployment Approach:**
   - Instead of merging feature branches directly into the environment branch, it creates a **local branch** on the deployment machine.
   - The tool pulls all required branches into this local branch.
   - Then proceeds with the build and deployment.

3. **Rollback Mechanism:**
   - If a feature branch causes issues, the user can **revert it from the deployment**.
   - The tool will pull all other branches (except the problematic one) and redeploy automatically.

4. **Live Deployment Status Monitoring:**
   - Uses **Server-Sent Events (SSE) over HTTP** to provide real-time updates on branch merging, conflicts, and deployment status.

## Requirements to Run the Tool
- **Spring Boot** (Backend for managing deployment logic)
- **React** (Frontend for UI interaction)
- **Bash Scripts** (For deployment automation)
- **Mysql** (For storing data related to environment and branches)




