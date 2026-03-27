## Recovery

In the world of version control, mistakes happen—but Git’s `git reflog` is your ultimate safety net. This command logs *all* reference changes (branches, tags, commits) across your repository history, including operations you might have thought were permanent. It’s your critical tool for recovering accidentally deleted branches, tags, or commits without starting from scratch.

### What is the `git reflog`?

The `git reflog` tracks *reference history*, not commit history like `git log`. It records every time a reference (e.g., `main`, `feature-branch`, `v1.0`) was updated—**even if the reference was later deleted**. This includes:

- Deleted branches (`git branch -d`)
- Deleted tags (`git tag -d`)
- Reset operations (`git reset --hard`)
- Commits not yet pushed to a remote

Unlike `git log`, `git reflog` persists *after* references are deleted, making it indispensable for recovery.

### How to Use `git reflog` for Recovery

Here’s a step-by-step guide to recover a deleted branch:

1. **Create a branch and commit**:
   ```bash
   mkdir myrepo && cd myrepo
   git init
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   git checkout -b feature-branch
   echo "Hello, world!" > hello.txt
   git add hello.txt
   git commit -m "Add hello.txt"
   ```

2. **Delete the branch**:
   ```bash
   git branch -d feature-branch
   ```

3. **Check the reflog**:
   ```bash
   git reflog
   ```
   Output example:
   ```
   5a3b4c0 (feature-branch) HEAD -> feature-branch
   1b2c3d4 (HEAD -> main) commit (Add hello.txt)
   0a1b2c3 (main)
   ```

4. **Recover the branch**:
   ```bash
   git branch feature-branch 5a3b4c0
   ```

5. **Verify**:
   ```bash
   git branch -a  # Shows feature-branch in list
   ```

**Key Insight**: The `git reflog` shows the *exact commit hash* (`5a3b4c0`) that was on the deleted branch before deletion. You can always recover it using this hash.

### Advanced Use Cases

| Scenario              | Command Example                          |
|-----------------------|-------------------------------------------|
| Recover deleted tag   | `git tag v1.0 5a3b4c0`                   |
| Recover a commit      | `git checkout -b recovery 5a3b4c0`       |
| View all references   | `git reflog --graph` (visualizes history) |

### Summary

The `git reflog` is your repository’s recovery lifeline. It logs *all* reference changes—including deleted branches and tags—so you can always restore critical states. With a single `git reflog` command, you can recover from accidental deletions, resets, or other common mistakes. **Always keep your `git reflog`**—it’s the only true safety net for Git recovery.

🛡️