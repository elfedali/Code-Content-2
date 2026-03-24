## File Operations

Welcome to the world of file operations in the Linux terminal! This section covers the essential commands you'll use daily to manage your files and directories. By the end, you'll be confident in copying, moving, deleting, creating, and organizing your data.

### Copying Files and Directories: `cp`

The `cp` command is your primary tool for copying files and directories. It’s used for backups, testing configurations, and avoiding data loss.

**Basic syntax**:
```bash
cp [source] [destination]
```

**Example 1**: Copy a single file
```bash
cp file.txt copy.txt
```
This creates a new file named `copy.txt` from `file.txt`.

**Example 2**: Copy a directory recursively
```bash
cp -r directory1 directory2
```
The `-r` flag ensures directories are copied recursively. Without it, `cp` will fail when encountering a directory.

**Pro tip**: Always use `cp -i` to prompt before overwriting. This prevents accidental data loss.

### Moving and Renaming Files: `mv`

The `mv` command handles both moving and renaming files and directories. It’s a versatile tool for organizing your workspace.

**Basic syntax**:
```bash
mv [source] [destination]
```

**Example 1**: Rename a file
```bash
mv oldname.txt newname.txt
```

**Example 2**: Move a file to a different directory
```bash
mv file.txt /path/to/directory/
```

**Example 3**: Move a directory (recursively)
```bash
mv -i directory1 /path/to/new/location/
```
The `-i` flag prompts for confirmation before moving. This is critical to avoid overwriting.

**Critical reminder**: Moving a file deletes it from its original location. Always verify the destination path before moving!

### Deleting Files and Directories: `rm`

The `rm` command deletes files and directories. Use it with caution—it’s irreversible without backups.

**Basic syntax**:
```bash
rm [file|directory]
```

**Example 1**: Delete a single file
```bash
rm file.txt
```

**Example 2**: Delete a directory recursively
```bash
rm -r directory
```

**Safety first**: Always use `rm -i` to confirm each deletion. Avoid `rm -rf` (which deletes everything without confirmation) unless you’re absolutely sure.

**Critical warning**: Once deleted, files are gone forever. **Back up important files** before using `rm`.

### Creating Empty Files: `touch`

The `touch` command creates new empty files. It’s useful for initializing files or updating timestamps.

**Basic syntax**:
```bash
touch [file1] [file2] ...
```

**Example 1**: Create a single empty file
```bash
touch newfile.txt
```

**Example 2**: Create multiple empty files
```bash
touch file1.txt file2.txt file3.txt
```

**Important note**: `touch` updates the timestamp of existing files. If you run `touch` on a file that already exists, it will update the timestamp but not change the content.

### Creating Directories: `mkdir`

The `mkdir` command creates new directories. It’s essential for organizing your file system.

**Basic syntax**:
```bash
mkdir [directory]
```

**Example 1**: Create a single directory
```bash
mkdir mydirectory
```

**Example 2**: Create nested directories
```bash
mkdir -p directory1/directory2/directory3
```
The `-p` flag creates parent directories if they don’t exist. This is helpful for complex directory structures.

**Pro tip**: Always check the directory exists with `ls` after creation to avoid confusion.

## Summary

In this section, we’ve covered the core file operations:
- `cp`: Copy files and directories (use `-r` for directories)
- `mv`: Move and rename files/directories (use `-i` for safety)
- `rm`: Delete files/directories (use `-i` for confirmation)
- `touch`: Create empty files
- `mkdir`: Create directories (use `-p` for nested directories)

These commands are foundational for Linux file management. Practice them with real files to build confidence! 💡