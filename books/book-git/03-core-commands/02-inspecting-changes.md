## Inspecting Changes

Understanding your repository's state is the foundation of effective Git workflows. This section dives into the three essential commands that empower you to visualize, analyze, and verify changes at every stage of your development process. Let's explore them in sequence.

### git status

`git status` provides a real-time snapshot of your working directory and staging area—showing exactly what's tracked, staged, and untracked. It's your first step to understanding where your code stands before committing.

This command reveals:
- Files modified but not yet staged
- New untracked files
- Staged changes ready for commit
- Branch status relative to remote

Here's a typical output showing a repository with untracked files and staged changes:

```text
On branch main
Your branch is up to date with origin/main.
Untracked files:
  (use "git add <file>" to include in what will be committed)
  .gitignore
  newfile.txt

Changes to be committed:
  (use "git remove <file>" to unstage)
  newfile.txt
```

This output tells you:
- Your branch is synchronized with the remote (`origin/main`)
- Two untracked files exist (`newfile.txt` and `.gitignore`)
- One file (`newfile.txt`) is staged for the next commit

For quick visual checks, use `git status -s` to get a concise status string:

```bash
git status -s
```

This outputs:
```
?? .gitignore
M  newfile.txt
```

Where `?` indicates untracked files and `M` shows modified (staged) files.

### git log

`git log` displays your repository's commit history—revealing who made what changes, when, and why. It's the ultimate tool for tracing code evolution and understanding context.

A basic `git log` shows recent commits with these key elements:
- Commit hash (unique identifier)
- Author name and email
- Commit date
- Commit message

Here's a typical output:

```text
commit 1234567890abcdef1234567890abcdef12345678
Author: John Doe <john.doe@example.com>
Date:   Mon Jan 1 00:00:00 2024 +0000

Add initial commit
```

To customize your log view:
- `--oneline`: Shows each commit as a single line (hash, author, date, message)
- `--graph`: Visualizes branch relationships (useful for complex workflows)
- `--since`: Filters commits by date (e.g., `--since="2023-10-01"`)
- `--pretty=format:%h %s`: Customizes output format

Example: View the last 3 commits with concise details:

```bash
git log --oneline -n 3
```

Output:
```
1234567 (HEAD -> main) Add initial commit
890abcdef (feature/branch) Implement login functionality
4567890 Initial commit
```

### git diff

`git diff` compares your working directory with the staging area (or previous commits) to show *exactly* what changes are about to be committed or what has been made but not yet staged.

This command has three critical use cases:

1. **Unstaged changes** (`git diff`):  
   Compares working directory with staging area
   ```bash
   git diff
   ```

2. **Staged changes** (`git diff --cached`):  
   Compares staging area with last commit
   ```bash
   git diff --cached
   ```

3. **Changes since last commit** (`git diff HEAD~1..HEAD`):  
   Shows modifications from the previous commit
   ```bash
   git diff HEAD~1..HEAD
   ```

Here's a typical output showing file modifications:

```text
diff --git a/file.txt b/file.txt
index 1234567..7890123 100644
--- a/file.txt
+++ b/file.txt
@@ -1,2 +1,3 @@
 -Hello
 +Hello World
 +This is a new line
```

This indicates:
- `file.txt` has been modified
- Two new lines added (the `+` lines)
- The original content (`Hello`) was replaced

For visualizing changes across branches, use `git diff branch1..branch2` to compare specific branches.

## Summary

Mastering the art of inspecting changes with `git status`, `git log`, and `git diff` is essential for any professional Git user. These commands provide the clarity and context needed to navigate your repository effectively. ✅