## Install Docker Engine

Before diving into Docker installation, let's clarify a key distinction: **Docker Engine** is the core server component that runs containers, while **Docker CLI** is the command-line interface for managing containers. In practice, most installations include both together—but we'll cover each explicitly as requested.

### Ubuntu/Debian

The recommended method for Linux distributions uses Docker's official repository. Here's a step-by-step guide:

1. **Update your system** to ensure all packages are current:
   ```bash
   sudo apt-get update
   ```

2. **Install required dependencies**:
   ```bash
   sudo apt-get install -y apt-transport-https ca-certificates curl
   ```

3. **Add Docker's official GPG key**:
   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

4. **Add Docker's official repository**:
   ```bash
   echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. **Install Docker Engine**:
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io
   ```

After installation, verify your Docker Engine version:
```bash
docker --version
```
This outputs something like `Docker version 24.0.7, build 7d3e3a1`.

### macOS (Homebrew)

For macOS users, Homebrew provides a streamlined installation experience:

1. **Install Homebrew** (if you don't have it):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Docker Engine**:
   ```bash
   brew install docker
   ```

3. **Enable Docker daemon** (required for macOS):
   ```bash
   brew services start docker
   ```

Verify with:
```bash
docker --version
```

### Windows

Windows requires a few approaches depending on your environment:

#### Option 1: Windows Subsystem for Linux (WSL)
The recommended method for Windows users is WSL (supports Ubuntu/Debian):

1. Enable WSL in Windows Settings
2. Install a Linux distribution (e.g., Ubuntu)
3. Follow the Ubuntu installation steps above

#### Option 2: Official Windows Installer
For non-WSL environments:

1. Download the [Docker Desktop for Windows installer](https://www.docker.com/products/docker-desktop)
2. Run the installer and follow prompts
3. Enable the Docker service in Windows Services

Verify with:
```powershell
docker --version
```

> 💡 **Pro Tip**: Always use `docker info` after installation to confirm your Docker Engine status. This command shows critical details like daemon socket paths and storage drivers.

## Install Docker CLI

The Docker CLI (command-line interface) is **typically installed automatically** when you install Docker Engine. However, there are scenarios where you might need to install it separately—such as after system updates or for minimal installations.

### When to Install CLI Separately

| Scenario                          | Why Install Separately?                     |
|------------------------------------|---------------------------------------------|
| System updates after Docker install | CLI might not be included in update packages |
| Minimal Docker installations      | Only CLI needed without full engine         |
| Cross-platform compatibility      | Ensures CLI works across OSes               |

### Installation Methods

#### Linux (Ubuntu/Debian)
If your system lacks the CLI after installing Docker Engine:
```bash
sudo apt-get update
sudo apt-get install -y docker-cli
```

#### macOS (Homebrew)
For macOS users needing the CLI:
```bash
brew install docker-cli
```

#### Windows (PowerShell)
For Windows users:
```powershell
# For WSL environments
sudo apt-get install -y docker-cli

# For Docker Desktop
docker-cli install
```

> 🐳 **Key Insight**: In 99% of production environments, the CLI is installed automatically with Docker Engine. Only install it separately when explicitly required by your deployment strategy.

## Summary

Docker Engine installation is straightforward across all major platforms: **Ubuntu/Debian** uses the official repository, **macOS** leverages Homebrew, and **Windows** supports both WSL and Docker Desktop. The Docker CLI is almost always included with Docker Engine—only install it separately in specific edge cases like system updates or minimal deployments. Always verify installations with `docker --version` to ensure your environment is correctly configured. 🐳