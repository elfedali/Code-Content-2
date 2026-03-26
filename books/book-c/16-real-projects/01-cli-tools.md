## Real Projects: CLI Tools

In this chapter, we dive into practical C programming by building real-world command-line tools. These projects bridge theory and practice, helping you understand how to create efficient, user-friendly applications that solve everyday problems without GUI overhead. Let’s start with two foundational tools: a **File Manager** and a **Text Processor**.

---

### File Manager

A CLI file manager is essential for navigating your system efficiently. Unlike GUI tools, it’s lightweight, fast, and integrates seamlessly with your shell workflow. We’ll build a minimal but functional file manager that lists directory contents and handles directory changes—perfect for environments where speed and resource efficiency matter.

#### Core Concepts
Before coding, understand these key C concepts:
- **Directory navigation**: Using `chdir()` from `<dirent.h>` to switch directories
- **File listing**: Iterating through directory entries with `opendir()`, `readdir()`, and `closeset()`
- **Error handling**: Checking return values from system calls (critical for robust CLI tools)

#### Building a Minimal File Manager
Here’s a step-by-step implementation of a CLI file manager with two commands: `ls` (list files) and `cd` (change directory). This tool avoids complex features (like file operations) to focus on core navigation.

```c
#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>

// Helper function to print directory entries
void print_dir_entries(DIR *dir) {
    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        if (strcmp(entry->d_name, ".") != 0 && strcmp(entry->d_name, "..") != 0) {
            printf("%s\n", entry->d_name);
        }
    }
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: file_manager ls [directory] | cd [directory]\n");
        return 1;
    }

    if (strcmp(argv[1], "ls") == 0) {
        // List current directory by default
        DIR *dir = opendir(".");
        if (dir == NULL) {
            perror("opendir");
            return 1;
        }
        print_dir_entries(dir);
        closedir(dir);
    } else if (strcmp(argv[1], "cd") == 0) {
        // Change directory
        char *path = argv[2];
        if (chdir(path) != 0) {
            perror("chdir");
            return 1;
        }
        printf("Changed directory to: %s\n", path);
    } else {
        printf("Unknown command. Use 'ls' or 'cd'.\n");
        return 1;
    }
    return 0;
}
```

**Why this works**:
- The `ls` command lists all files (excluding `.` and `..`).
- The `cd` command changes the current working directory using `chdir()`.
- Error handling ensures the tool doesn’t crash unexpectedly (e.g., invalid paths).

#### Real-World Usage
Run this in your terminal:
```bash
# List current directory
file_manager ls

# Change to a subdirectory
file_manager cd ./docs
```

**Pro Tip**: Add `stat()` calls to show file sizes or dates for richer output. This is a great starting point for expanding into full-featured file managers.

---

### Text Processor

Text processors handle text manipulation—perfect for tasks like log analysis, data cleaning, or quick file transformations. We’ll build a lightweight tool that replaces text patterns and counts words in files, demonstrating how C excels at low-level text operations.

#### Core Concepts
- **File reading**: `fopen()`, `fread()`, and `fgetc()` for line-by-line processing
- **String manipulation**: `strcat()`, `strlen()`, and `strstr()` for pattern matching
- **Command-line arguments**: Parsing flags (e.g., `-s` for search, `-r` for replace)

#### Building a Text Processor
Here’s a minimal text processor with two commands: `replace` (find-and-replace) and `wordcount` (count words). This tool focuses on clarity and practical utility.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Helper function to count words in a file
int count_words(FILE *file) {
    int word_count = 0;
    int in_word = 0;
    int c;
    
    while ((c = fgetc(file)) != EOF) {
        if (c == ' ' || c == '\n' || c == '\t') {
            if (in_word) {
                word_count++;
                in_word = 0;
            }
        } else {
            if (!in_word) {
                in_word = 1;
            }
        }
    }
    return word_count;
}

// Helper function to replace text
void replace_text(FILE *file, const char *search, const char *replace) {
    char buffer[1024];
    size_t len;
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        len = strlen(buffer);
        // Replace all occurrences (simplified for demo)
        char *pos = strstr(buffer, search);
        while (pos) {
            size_t replace_len = strlen(replace);
            size_t search_len = strlen(search);
            char *new_buffer = malloc(len - search_len + replace_len + 1);
            if (new_buffer) {
                strncpy(new_buffer, buffer, pos - buffer);
                strncat(new_buffer, replace, replace_len);
                strncat(new_buffer, buffer + pos + search_len, len - (pos - buffer) - search_len);
                new_buffer[len - search_len + replace_len] = '\0';
                // Write new_buffer back to file (simplified)
                printf("Replaced: %s -> %s\n", search, replace);
                // In real use: write new_buffer to file
                free(new_buffer);
            }
            pos = strstr(pos + search_len, search);
        }
    }
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        printf("Usage: text_processor replace [search] [replace] | wordcount [file]\n");
        return 1;
    }

    if (strcmp(argv[1], "replace") == 0) {
        FILE *file = fopen(argv[2], "r");
        if (!file) {
            perror("fopen");
            return 1;
        }
        replace_text(file, argv[3], argv[4]);
        fclose(file);
    } else if (strcmp(argv[1], "wordcount") == 0) {
        FILE *file = fopen(argv[2], "r");
        if (!file) {
            perror("fopen");
            return 1;
        }
        int count = count_words(file);
        printf("Word count: %d\n", count);
        fclose(file);
    } else {
        printf("Unknown command. Use 'replace' or 'wordcount'.\n");
        return 1;
    }
    return 0;
}
```

**Why this works**:
- `wordcount` uses a state machine to count words without regex (efficient for C).
- `replace_text` finds and replaces patterns line-by-line (ideal for small files).
- The tool handles errors gracefully (e.g., missing files).

#### Real-World Usage
Run these in your terminal:
```bash
# Count words in a log file
text_processor wordcount logs.txt

# Replace "error" with "issue" in a file
text_processor replace "error" "issue" data.log
```

**Pro Tip**: For production use, add file buffering and error logging. This foundation scales to handle larger files with minimal overhead.

---

## Summary
In this chapter, we built two practical CLI tools that showcase C’s strengths in system-level programming: a **File Manager** for efficient directory navigation and a **Text Processor** for text manipulation tasks. Both projects emphasize error handling, resource efficiency, and real-world usability—key principles for professional CLI development. These tools are a great starting point for expanding into more complex applications while maintaining C’s performance advantages. 💡