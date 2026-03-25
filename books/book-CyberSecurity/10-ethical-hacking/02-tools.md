## Tools

In the realm of ethical hacking, having the right tools is as crucial as understanding the principles of security. This section dives into two foundational tools that every ethical hacker should master: **Nmap** for network discovery and **Metasploit** for exploitation and post-exploitation. These tools empower you to safely and legally probe networks, identify vulnerabilities, and test defenses without causing harm. Let’s get hands-on with these powerful utilities.

### Nmap

**Nmap** (Network Mapper) is a command-line utility for network discovery and security auditing. It’s the go-to tool for mapping networks, identifying live hosts, open ports, and services running on those hosts. By sending specially crafted packets to target systems, Nmap reveals network topology and potential attack surfaces—making it indispensable for initial reconnaissance.

Nmap operates in several modes, but the most common for ethical hacking are:
- **Ping sweeps** (`-sn`): Find live hosts without port scanning.
- **TCP SYN scans** (`-sS`): Stealthy scans that avoid triggering firewalls.
- **Service detection** (`-sV`): Identify running services and their versions.
- **OS detection** (`-O`): Guess the operating system of targets.

Here’s a practical example of a live host discovery scan on a local network:

```bash
nmap -sn 192.168.1.0/24
```

This command performs a ping sweep to find all live hosts in the subnet `192.168.1.0/24`. The `-sn` flag skips port scanning, reducing network noise while still identifying active systems.

For a more detailed scan that reveals open ports and services, use:

```bash
nmap -sS -sV -O 192.168.1.100
```

This command does a TCP SYN scan (`-sS`), service version detection (`-sV`), and OS detection (`-O`). It’s ideal for identifying vulnerable services (e.g., an open SSH port with weak credentials).

**Key features to remember**:
- **`-sS` (TCP SYN scan)**: Low-visibility scan that minimizes detection by not completing the TCP handshake.
- **`-sV` (Service version detection)**: Crucial for identifying vulnerable software versions (e.g., Apache 2.4.58).
- **`-O` (OS detection)**: Helps in understanding target environments (e.g., distinguishing between Windows Server and Linux).

**Real-world application**:  
Suppose you discover an open port 22 (SSH) on a host. Nmap can reveal if the SSH service is vulnerable to brute-force attacks by showing weak password policies or misconfigured authentication:

```bash
nmap -sV -p 22 192.168.1.100
```

This output might show:  
`22/tcp open  ssh     OpenSSH 8.2p1`

You’d then investigate further—like testing password strength—using other tools within your authorized scope.

### Metasploit

**Metasploit** is an open-source framework for developing and executing exploitation payloads. It’s designed to help security professionals test systems by exploiting known vulnerabilities while maintaining ethical boundaries. Metasploit provides a structured environment for creating, running, and managing exploits—making it a staple in penetration testing.

Metasploit works in three phases:
1. **Exploitation**: Use known vulnerabilities to gain system access.
2. **Post-exploitation**: Maintain access and gather data after compromise.
3. **Payload delivery**: Execute code on compromised systems (e.g., reverse shells).

Here’s a step-by-step example of using Metasploit to exploit a vulnerable SSH service (for educational purposes only on authorized systems):

```bash
msfconsole
use exploit/unix/ssh/ssh_password_brute
set RHOSTS 192.168.1.100
set USERPASS /path/to/userpass.txt
run
```

**Critical notes**:
- **`USERPASS`**: A file containing username/password pairs (e.g., `user1:pass1`).
- **Ethical boundary**: This example assumes you have explicit written permission to test the target.
- **Real-world context**: In practice, you’d first scan for vulnerable services with Nmap before targeting.

**Key features of Metasploit**:
- **Exploit Database**: 10,000+ pre-built exploits for common vulnerabilities (e.g., Windows SMB flaws).
- **Payloads**: Customizable code for post-exploitation (e.g., `reverse_tcp` shells).
- **Post-exploitation modules**: Tools to escalate privileges, extract data, or maintain access.

**Real-world application**:  
If Nmap reveals an open SSH port on a Windows host, Metasploit can exploit it if weak credentials exist:

```bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
run
```

This command targets the EternalBlue vulnerability (a critical Windows SMB flaw). **Always verify you have permission before running such exploits**.

### Summary

In this section, we’ve covered two essential ethical hacking tools: **Nmap** for network discovery and **Metasploit** for exploitation. Nmap helps map networks and identify potential attack surfaces, while Metasploit provides a structured environment to test vulnerabilities and gain controlled access. Both tools require strict adherence to ethical guidelines and legal authorization—never to be used without explicit permission. Mastering these tools is just the beginning; ethical hacking is about responsible discovery, not harm. 🛡️