## System Monitoring: CPU, Memory, and Disk Usage

Understanding how your Linux system utilizes resources is critical for maintaining performance and stability. In this section, we'll cover the essential tools and techniques for monitoring **CPU usage**, **memory usage**, and **disk usage**—three fundamental aspects that directly impact system responsiveness and reliability.

---

### 🔍 CPU Usage

CPU usage measures how much processing power is being consumed by active processes. Sustained high CPU usage can cause system slowdowns, application failures, or even hardware overheating.

**Key Tools & Commands:**
1. **`top`** - Real-time interactive view of processes (best for live monitoring):
   ```bash
   top
   ```
   *How to use:* Run the command → press `q` to exit. The output shows processes sorted by CPU usage (highest first).

2. **`ps`** - Non-interactive view of CPU usage per process:
   ```bash
   ps -eo pcpu,comm --sort=-pcpu
   ```
   *Example output:*
   | pcpu | comm      |
   |------|------------|
   | 3.5  | nginx      |
   | 2.1  | python3    |
   | 1.8  | bash       |
   *This shows `nginx` consuming the most CPU.*

3. **`vmstat`** - System-wide CPU statistics (for deeper analysis):
   ```bash
   vmstat 1 2
   ```
   *Output shows CPU usage (columns `cpu`), memory, and I/O statistics every second.*

**Why it matters:** High CPU usage from a single process (e.g., `nginx` at 3.5%) often indicates a resource-intensive application or inefficient code. Monitoring helps identify bottlenecks before they impact users.

---

### 🧠 Memory Usage

Memory usage tracks RAM and swap space consumption. Insufficient memory can cause applications to crash, slow response times, or trigger swap overhead.

**Key Tools & Commands:**
1. **`free`** - Human-readable memory report:
   ```bash
   free -h
   ```
   *Example output:*
   ```
   total        used        free      shared  buff/cache   available
   Mem:          7.7G        4.2G        2.1G        128M        1.3G        3.4G
   Swap:          2.0G        1.2G        764M
   ```
   *Key columns:*  
   - `available`: Memory available for new applications (critical metric)  
   - `used`: Total RAM consumed  
   - `buff/cache`: Memory used by buffers/cache (not actively in use)

2. **`ps`** - Memory usage per process (resident set size):
   ```bash
   ps -eo rss,comm --sort=-rss
   ```
   *Example output:*  
   `3272888  nginx` → This process uses ~3.2 MB of RAM.

**Why it matters:** The `available` column in `free` shows *usable* memory for new applications. If `available` is low (e.g., <1GB), your system is nearing memory exhaustion.

---

### 💾 Disk Usage

Disk usage involves tracking space consumption across filesystems and files. Inadequate disk space can cause system crashes, application failures, or data loss.

**Key Tools & Commands:**
1. **`df`** - Filesystem disk usage (by mount point):
   ```bash
   df -h
   ```
   *Example output:*
   ```
   Filesystem      Size   Used  Avail Use% Mount point
   /dev/sda1        20G     15G   4.2G  75% /
   /dev/sdb1        100G    50G   50G  50% /home
   ```
   *Key columns:*  
   - `Use%`: Percentage of disk used (alert at >80%)

2. **`du`** - Disk usage by files/directories:
   ```bash
   du -sh /var/log
   ```
   *Output:* `123M    /var/log` → Total size of log directory.

3. **`du`** for granular analysis:
   ```bash
   du -sh /var/log/* | sort -h
   ```
   *Output:* Shows largest log files (e.g., `12M    /var/log/nginx.log`).

**Why it matters:** The `Use%` column in `df` helps identify near-full filesystems (e.g., `/` at 75% usage). The `du` command pinpoints which files/directories consume the most space—critical for cleanup.

---

### 📊 Comparison: `df` vs. `du`

| Command | Purpose                          | Use Case Example                     |
|---------|-----------------------------------|--------------------------------------|
| `df -h` | Filesystem-level disk usage      | Check space on `/` and `/home`      |
| `du -sh`| File/directory-level disk usage  | Find largest files in `/var/log`    |

**Key difference:**  
- `df` shows **filesystem** usage (e.g., how much space `/` consumes).  
- `du` shows **file/directory** usage (e.g., how much space `nginx.log` consumes).

---

## 💡 Summary

In this section, you've learned to:
1. Monitor **CPU usage** with `top` and `ps` to identify resource-hungry processes.
2. Track **memory usage** with `free` to ensure sufficient available RAM.
3. Analyze **disk usage** with `df` (filesystem) and `du` (files/directories) to prevent out-of-space errors.

By regularly checking these metrics, you can proactively resolve performance issues, optimize resource allocation, and maintain a stable Linux environment. **Mastering these tools is essential for any system administrator or developer working with Linux.** 💡

> **Pro Tip**: Combine these commands with cron jobs or monitoring tools (e.g., Prometheus, Grafana) for automated alerts when resources exceed thresholds. Start with `free -h` and `df -h` daily checks—these alone prevent 90% of common resource-related issues.