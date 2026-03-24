## Advanced Scripting

Shell scripting becomes truly powerful when you move beyond basic commands to implement reusable logic, flexible input handling, and complex automation. In this section, we’ll dive deep into three critical advanced concepts: **functions**, **arguments**, and **automation tasks**. These elements form the backbone of professional-grade scripts that solve real-world problems efficiently.

---

### Functions

Functions are the building blocks of reusable, modular scripts. They allow you to encapsulate logic, avoid repetition, and make your scripts more readable and maintainable. Unlike programming languages, shell functions are lightweight and execute directly in your shell environment.

**Why use functions?**  
- Reuse code across multiple scripts  
- Improve readability by breaking complex tasks into logical units  
- Enable error handling and debugging at specific points  
- Reduce script length by 30–50% compared to monolithic approaches

Here’s a practical example of a function that calculates the factorial of a number:

```bash
# Calculate factorial using a recursive function
factorial() {
  local n=$1
  if [ $n -eq 0 ]; then
    echo 1
  else
    echo $(( $n * $(factorial $((n-1))) ))
  fi
}
```

**Key features in action:**  
- `local` declares variables scoped to the function (prevents leaks)  
- `$( )` executes commands in subshells for safe recursion  
- `if [ $n -eq 0 ]` handles the base case  
- The function returns results directly to the caller

> 💡 **Pro tip**: Always use `local` for function variables to avoid polluting the parent scope. This is critical for production scripts where variable leakage can cause subtle bugs.

---

### Arguments

Arguments let your functions accept dynamic input from the user or command line. Mastering argument handling transforms your scripts from static tools into intelligent systems that adapt to real-world scenarios.

**Three critical argument patterns**:

1. **Positional arguments** (default behavior)  
   `$1` = first argument, `$2` = second, etc.  
   Example:  
   ```bash
   # Print all arguments passed to the script
   print_args() {
     echo "Arguments: $@"
   }
   ```

2. **Named arguments** (using `getopts` for flexibility)  
   ```bash
   # Parse flags like --verbose or -f
   parse_flags() {
     local opt
     while getopts ":v:f:" opt; do
       case $opt in
         v) verbose=true ;;
         f) file=$OPTARG ;;
         *) echo "Invalid option: $opt" >&2; exit 1 ;;
       esac
     done
     # Use variables: $verbose, $file
   }
   ```

3. **Default values** (avoiding errors when arguments are missing)  
   ```bash
   # Provide default for 'file' if not specified
   default_file() {
     local file="backup.tar"
     [ -n "$1" ] && file=$1
     echo "Using file: $file"
   }
   ```

**Real-world scenario**: Automating a backup task where users can specify paths or defaults:
```bash
# Backup script with flexible arguments
backup() {
  local source_dir=${1:-"/var/log"}
  local dest_dir=${2:-"/backup"}
  
  echo "Backing up $source_dir to $dest_dir..."
  tar -czf "$dest_dir/$(date +%Y%m%d).tar.gz" -C "$source_dir" .
}

# Usage: backup [source_dir] [dest_dir]
backup "/var/log" "/backup"
```

> 🔍 **Debugging tip**: Always check for empty arguments with `[ -n "$var" ]` to prevent `tar` from failing on missing paths.

---

### Automation Tasks

Automation tasks turn your scripts into living systems that handle repetitive work, monitor environments, and respond to events. This section covers practical automation patterns you’ll use daily.

**Three impactful automation patterns**:

1. **Scheduled tasks** (via cron)  
   Create daily backups with this script:  
   ```bash
   #!/bin/bash
   # Daily backup of critical logs
   BACKUP_DIR="/backup/daily"
   LOG_DIR="/var/log"
   
   # Ensure directory exists
   mkdir -p "$BACKUP_DIR"
   
   # Create compressed backup
   tar -czf "$BACKUP_DIR/$(date +%Y%m%d).tar.gz" -C "$LOG_DIR" .
   
   echo "Backup completed at $(date)" >> "$BACKUP_DIR/backup.log"
   ```

   *Schedule with cron*:  
   `0 2 * * * /path/to/backup.sh`

2. **System health checks** (using `systemd` and `netstat`)  
   ```bash
   # Check for open ports and critical services
   check_services() {
     local critical_services=("httpd" "nginx" "postgresql")
     
     for service in "${critical_services[@]}"; do
       if ! systemctl is-active "$service" &> /dev/null; then
         echo "🚨 Service $service is NOT running!"
       fi
     done
   }
   
   check_services
   ```

3. **Error handling in automation**  
   ```bash
   # Script that handles failures gracefully
   safe_backup() {
     local success=0
     trap 'echo "Backup failed at $(date)" >&2' ERR
     
     echo "Starting backup..."
     tar -czf /backup/$(date +%Y%m%d).tar.gz /var/log &> /dev/null
     success=$?
     
     if [ $success -eq 0 ]; then
       echo "✅ Backup succeeded"
     else
       echo "❌ Backup failed"
       exit 1
     fi
   }
   
   safe_backup
   ```

**Why this matters**:  
Automation isn’t just about writing scripts—it’s about building resilient systems. The `trap` command above ensures failure messages are logged even if the script crashes, while cron schedules prevent manual intervention.

> 🛡️ **Critical insight**: Always include `trap` for error handling in production scripts. A single unhandled failure can cascade into system downtime.

---

## Summary

In advanced shell scripting, **functions** enable reusable logic, **arguments** provide flexible input handling, and **automation tasks** transform scripts into self-sustaining systems. By mastering these concepts, you’ll build scripts that:  
- Solve complex problems without code duplication  
- Adapt to user inputs and environment changes  
- Operate reliably in production (with error handling and scheduling)  

These techniques form the foundation for professional Linux automation—whether you’re managing servers, processing data, or building CI/CD pipelines. Start small, test thoroughly, and scale your scripts with confidence. 💡