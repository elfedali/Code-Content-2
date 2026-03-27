## Branching

In Git, branching is the foundation of collaborative development. It enables teams to work on features, fixes, and experiments in isolation while keeping the main codebase stable. This section dives into the core commands for creating and switching branches—your essential toolkit for professional workflows. We'll explore `git branch`, `git checkout`, and `git switch` with concrete examples that you can run immediately.

### Creating Branches with `git branch`

The `git branch` command is Git's primary tool for creating new branches. It operates in two key modes: **listing existing branches** and **creating new branches**.

To list all branches in your repository:
```bash
git branch
```

This command shows branches in your local repository. The current branch (where you're working) is marked with an asterisk (`*`). For example:
```
* main
  feature/login
  bugfix/fix-login-issue
```

To create a new branch from the current branch (e.g., `main`), use:
```bash
git branch feature/new-feature
```

This creates a new branch named `feature/new-feature` that starts as a copy of your current branch. You'll see it listed in the output of `git branch`.

**Why this matters**: Creating branches early prevents accidental changes to your main codebase. By starting a new branch from `main`, you ensure your feature work doesn't interfere with stable releases.

Here's a practical workflow:
1. Start in `main` (your stable branch)
2. Create a new feature branch:
   ```bash
   git branch feature/user-profile
   ```
3. Verify the branch exists:
   ```bash
   git branch
   ```
   Output:
   ```
   * main
     feature/user-profile
     feature/new-feature
   ```

> 💡 **Pro Tip**: Always create branches from `main` (or your stable branch) to maintain a clean history. Avoid creating branches directly from other feature branches unless you're intentionally merging changes.

### Switching Branches with `git checkout`

The `git checkout` command switches between branches and updates your working directory. It's the traditional way to handle branch transitions in Git. Here's how it works:

To switch to a branch:
```bash
git checkout <branch-name>
```

For example, to switch to the `feature/user-profile` branch you created earlier:
```bash
git checkout feature/user-profile
```

This command updates your working directory to match the branch's state. You'll see an asterisk (`*`) next to the branch name in your terminal when you're on it.

**Key behaviors**:
- If you're on `main` and run `git checkout feature/user-profile`, Git will create a new commit in `feature/user-profile` (if it doesn't exist) or update it with your current state.
- `git checkout` *always* updates your working directory—this is why it's critical to use it carefully when switching branches.

**Real-world example**:
```bash
# Start in main
git checkout main
# Create feature branch
git branch feature/user-profile
# Switch to feature branch
git checkout feature/user-profile
# Now you're on feature/user-profile
```

> ⚠️ **Warning**: Never use `git checkout` to modify files in a branch you're not on. This can cause conflicts or unintended changes. Always switch branches *before* modifying files.

### The Modern Alternative: `git switch`

Git 2.28+ introduced `git switch` as a more intuitive replacement for `git checkout`—especially for branch operations. It simplifies workflows by eliminating the need to remember whether you're switching branches or commits.

**How it works**:
- `git switch` switches *only* to branches (no commit history manipulation)
- It's designed to be safer and more explicit than `git checkout`
- Uses the same syntax as `git checkout` but with clearer intent

To switch to a branch:
```bash
git switch <branch-name>
```

For example, to switch to `feature/user-profile`:
```bash
git switch feature/user-profile
```

**Why `git switch` is better**:
1. **No implicit commits**: Unlike `git checkout`, `git switch` doesn't create new commits when switching branches (it's purely a branch switch).
2. **Simpler workflow**: It avoids the confusing "current branch" state that `git checkout` sometimes causes.
3. **Future-proof**: Git's roadmap prioritizes `git switch` for modern workflows.

**Practical comparison**:
| Command                | When to use                          | Key difference                                  |
|------------------------|---------------------------------------|------------------------------------------------|
| `git checkout`         | Legacy workflows, commits            | Updates working directory *and* may create commits |
| `git switch`           | New projects, modern workflows       | Pure branch switch without side effects         |

**Real-world example**:
```bash
# Start in main
git switch main
# Create feature branch
git branch feature/user-profile
# Switch to feature branch (using modern command)
git switch feature/user-profile
```

> ✨ **Why this matters**: `git switch` is the recommended command for most professional workflows today. It reduces cognitive load and prevents accidental state changes. When you're working with Git 2.28+, use `git switch` instead of `git checkout` for branches.

### Key Takeaways for Professional Branching

1. **Always create branches from `main`** (or your stable branch) to avoid disrupting production.
2. **Use `git switch` for branch operations** in modern Git workflows—it's safer and more explicit than `git checkout`.
3. **Verify your branch context** after switching (e.g., `git branch --list` or `git status`).

Branching isn't just a Git feature—it's your team's safety net. By mastering these commands, you'll build robust, collaborative workflows that scale with your project.

## Summary

This section covered the essentials of branching in Git: creating branches with `git branch`, switching branches with `git checkout`, and modernizing your workflow with `git switch`. You now understand how to start from stable branches, switch contexts safely, and avoid common pitfalls. Remember: **create branches early, switch with `git switch`, and verify your state**. These practices ensure your team stays productive while maintaining code integrity. 🌟