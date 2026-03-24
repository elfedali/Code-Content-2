## Network Commands

In this section, we'll dive into the essential network commands that form the backbone of Linux networking operations. These tools empower you to troubleshoot connections, monitor traffic, and interact with remote systems—whether you're debugging a slow internet connection or automating data transfers. Let's start with the most fundamental command: `ping`.

### Ping

`ping` is your go-to command for testing network connectivity and measuring response times. It sends ICMP echo request packets to a target host and waits for an echo reply. This simple tool helps verify if a host is reachable and provides insights into latency and packet loss.

**Why use `ping`?**  
It's the quickest way to check if a service is online (e.g., a web server, database, or another machine) and measure network health. Unlike `traceroute`, `ping` doesn't reveal the path your traffic takes—it only tests the final destination.

**Basic syntax**:  
`ping [target]`  
- `[target]` = IP address, hostname, or domain name

**Example**:  
Test connectivity to `example.com` and measure latency:
```bash
ping example.com
```

**Real-world scenario**:  
When troubleshooting a website that's down, you might first run:
```bash
ping example.com
```
If this fails, you know the issue isn't with your local network but the remote server. If it succeeds, you'd then check DNS resolution with `nslookup` or `dig`.

**Pro tip**:  
Use `-c` to limit the number of packets (avoids constant output):  
```bash
ping -c 3 example.com
```

### ifconfig / ip

These commands manage network interfaces and their configurations. While `ifconfig` is legacy, `ip` is the modern, more powerful replacement. We'll cover both for compatibility and depth.

#### Key differences

| Feature          | `ifconfig`                          | `ip`                                  |
|-------------------|--------------------------------------|----------------------------------------|
| **Status**        | Legacy (deprecated in newer Linux)   | Modern (standard in all recent distros)|
| **Functionality** | Basic interface info                | Advanced: routes, addresses, links    |
| **Syntax**        | `ifconfig [interface]`              | `ip [command] [interface]`            |
| **Use Case**      | Quick checks                       | Complex configurations               |

#### Using `ifconfig` (legacy)
Display active network interfaces and their IP addresses:
```bash
ifconfig
```
**Example output snippet**:
```
eth0: flags=4099 mtu 1500
    inet 192.168.1.100 netmask 255.255.255.0 broadcast 192.168.1.255
    inet6 fe80::a00:270f:1234:5678 prefixlen 64 scopelink
```

#### Using `ip` (modern)
The `ip` command is more flexible and handles routing, addresses, and interfaces. To list all interfaces:
```bash
ip addr
```
**Example output snippet**:
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host 
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pf_back
    inet 192.168.1.100/24 brd 192.168.1.255
```

**Advanced `ip` usage**:  
- Check IP addresses for a specific interface: `ip addr show eth0`  
- Assign an IP: `ip addr add 192.168.1.101/24 dev eth0`  
- View routes: `ip route`  

**Why prefer `ip`?**  
`ip` is more reliable in modern systems (it handles IPv6 natively and avoids `ifconfig`'s deprecated status). Always use `ip` for new configurations.

### netstat

`netstat` displays active network connections, listening ports, and routing tables. It’s crucial for diagnosing network issues like unexpected connections or blocked ports.

**Basic syntax**:  
`netstat [options]`  
- Common options: `-t` (TCP), `-u` (UDP), `-l` (listening ports), `-n` (numeric addresses)

**Example**:  
Check all active TCP connections:
```bash
netstat -t
```

**Real-world scenario**:  
If a web server isn't responding, run:
```bash
netstat -tuln | grep 80
```
This shows if port 80 (HTTP) is open and listening.

**Advanced usage**:  
- Filter by process: `netstat -tuln | grep -E 'apache|nginx'`  
- Show full connection details: `netstat -tunp` (includes process IDs)

**Pro tip**:  
Use `-n` to avoid DNS lookups (faster output):
```bash
netstat -tun
```

### curl

`curl` is a versatile command-line tool for transferring data from or to a server using various protocols (HTTP, HTTPS, FTP, etc.). It’s indispensable for testing APIs, downloading files, and interacting with web services.

**Why use `curl`?**  
It handles authentication, headers, and redirects automatically—making it perfect for debugging RESTful APIs or checking website status.

**Basic syntax**:  
`curl [options] [URL]`  
- Common options: `-v` (verbose), `-I` (head request), `-o` (save output to file)

**Example**:  
Check HTTP status of `example.com`:
```bash
curl -I https://example.com
```

**Real-world scenario**:  
Test a JSON API endpoint:
```bash
curl -sS -H "Content-Type: application/json" -d '{"name":"Test"}' https://api.example.com/data
```
The `-s` flag silences progress bars, `-S` skips errors, and the `-d` sends JSON data.

**Advanced use cases**:  
- Download a file: `curl -O https://example.com/file.zip` (saves as `file.zip`)  
- Save output to a file: `curl -o report.txt https://api.example.com/report`  
- Use cookies: `curl -b "cookie=abc123" https://example.com`

### wget

`wget` is another powerful tool for downloading files from the internet, but it excels in **resilience**—it handles interruptions, retries, and background downloads. Unlike `curl`, it’s optimized for large files and robust connections.

**Basic syntax**:  
`wget [options] [URL]`  
- Common options: `-c` (continue interrupted downloads), `-O` (custom output filename), `-r` (recursive download)

**Example**:  
Download a file with resume capability:
```bash
wget -c https://example.com/largefile.zip
```

**Real-world scenario**:  
Download a website’s entire content (with recursive download):
```bash
wget -r -nH -np --no-parent https://example.com
```
- `-r`: Recursive download  
- `-nH`: Don’t create new directories  
- `--no-parent`: Don’t go outside the starting directory  

**Key differences from `curl`**:  
| Feature          | `curl`                          | `wget`                          |
|-------------------|----------------------------------|----------------------------------|
| **Resume**        | Manual (with `-C`)              | Built-in (`-c`)                 |
| **Background**    | Not native                      | Supports background downloads   |
| **HTTP Methods**  | All (GET, POST, etc.)           | Primarily GET                   |

**Pro tip**:  
For large files, `wget`’s resume feature saves time when connections drop:
```bash
wget -c --retry-conneg=3 https://example.com/10gb_file.zip
```

## Summary

You now have the core network commands to troubleshoot, monitor, and interact with networks on Linux:  
- **`ping`** checks connectivity and latency.  
- **`ifconfig`** (legacy) and **`ip`** (modern) manage interfaces and configurations.  
- **`netstat`** reveals active connections and ports.  
- **`curl`** handles HTTP/HTTPS requests with flexibility.  
- **`wget`** excels at reliable file downloads with resume support.  

Master these tools to turn network issues into opportunities for deeper understanding—whether you're debugging a slow connection or building automated workflows. 🌐