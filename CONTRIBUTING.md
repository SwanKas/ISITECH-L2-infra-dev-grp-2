## Branching Strategy

We use a simple and effective branching strategy to keep our codebase clean and manageable. Here's how it works:

### 1. `main` Branch

- **Purpose:** This is the production branch. It should always contain stable and tested code that is ready for deployment.
- **Direct Commits:** No direct commits are allowed. All changes must be merged via a Pull Request (PR) from the `pre-prod` branch after passing all necessary reviews and tests.

### 2. `develop` Branch

- **Purpose:** This branch is used for preparing features and fixes for release. It is a staging area for code that is considered ready but requires final testing before going into production.
- **Direct Commits:** No direct commits are allowed. All changes must come from a `feature` branch via a PR. The `develop` branch is merged into `main` once all tests pass and the Product Owner (PO) approves.

### 3. `feature/{feature-name}` Branches

- **Purpose:** These branches are where all new development work occurs. Each feature or fix should have its own branch.
- **Naming Convention:** Use the format `feature/{feature-name}` where `{feature-name}` describes the feature or fix, e.g., `feature/add-navbar`.
- **Direct Commits:** Developers are allowed to commit directly to their `feature` branches. However, regular commits should follow our commit message guidelines.

### 4. Pull Requests (PRs)

- **Opening a PR:**
  - Once your feature is complete and tested locally, open a PR from your `feature/{feature-name}` branch to the `develop` branch.
  - Ensure your PR has a clear and descriptive title and includes a summary of the changes made.

- **Reviews and Approvals:**
  - All PRs must be reviewed by at least one other developer.
  - PRs from junior developers must be reviewed and approved by a senior developer.
  - Once reviewed and all feedback is addressed, the PR can be merged into the `pre-prod` branch.

### 5. Commit Message Guidelines

To maintain a clean and understandable commit history, please follow these guidelines:

- **Use the imperative mood:** ("Fix bug" instead of "Fixed bug" or "Fixes bug").
- **Keep the title concise:** Aim for a maximum of 50 characters.
- **Include a detailed description:** If necessary, provide a more detailed explanation in the body of the commit message.


