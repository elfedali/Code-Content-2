## System Update

Before deploying Docker or any other service on your VPS, it’s critical to ensure your Linux server has the latest security patches and stable package versions. This section covers the two essential steps for maintaining a secure and efficient environment: **updating the package lists** and **upgrading installed packages**. These steps form the foundation of your server’s reliability and security posture.

### Updating Package Lists: `apt update`

The first step is to refresh your system’s package index. This ensures `apt` knows about the latest available packages in your configured repositories. Without this step, `apt upgrade` would not be able to find new versions of packages—resulting in outdated or broken updates.

To update the package lists, run:

```bash
sudo apt update
```

This command fetches the latest package metadata from your repositories. You’ll typically see output similar to:

```
Get:1 http://archive.ubuntu.com/ubuntu focal InRelease [111 kB]
Get:2 http://archive.ubuntu.com/ubuntu focal-updates InRelease [109 kB]
Get:3 http://archive.ubuntu.com/ubuntu focal-security InRelease [108 kB]
...
Fetched 2.1 MB in 1s (2.1 MB/s)
```

**Why this matters**:  
The output shows the progress of downloading repository metadata. The `Fetched` line indicates how much data was downloaded and the speed. If you encounter errors like `The following repositories do not have a release information`, it usually means your repository configuration is outdated or your internet connection is unstable. Fix by checking `/etc/apt/sources.list` or running `sudo apt update` again after resolving configuration issues.

**Pro Tip**: Always run `sudo apt update` *before* any `apt` command that installs or upgrades packages. This guarantees you’re working with the latest package information and avoids potential conflicts.

### Upgrading Installed Packages: `apt upgrade`

The next step is to upgrade your installed packages to their latest versions. This command updates packages *without* removing any installed packages (unlike `apt full-upgrade`), making it safe for production environments.

To upgrade your packages, run:

```bash
sudo apt upgrade
```

This command will upgrade all installed packages to their latest versions. You might see output similar to:

```
The following packages will be upgraded:
  libssl1.1: 1.1.1g-1ubuntu1 -> 1.1.1g-1ubuntu2
  libcurl4: 7.74.0-1ubuntu2.1 -> 7.74.0-1ubuntu2.2
  ...
```

**Key behavior**:  
- ✅ **Safe operation**: Unlike `apt full-upgrade`, this command *does not* remove packages to resolve dependencies. It only updates existing packages.
- ⏱️ **Performance**: The upgrade process may take 5–15 minutes depending on your server’s hardware and package count. Run this during off-peak hours to avoid performance impacts.
- 🔒 **Security**: This step applies critical security patches from your repositories. Outdated packages are a common attack vector for vulnerabilities.

**Why not `apt full-upgrade`?**  
While `apt full-upgrade` handles package removals for dependency resolution, it’s *not recommended* for production VPS environments. It can cause unexpected service disruptions during updates. For Docker deployments, the safer approach is `apt upgrade` followed by `docker compose up` to maintain stability.

## Summary

Updating your Linux server is a foundational step in maintaining a secure and efficient environment for Docker and other services. By following the two steps—**updating the package lists** with `apt update` and **upgrading installed packages** with `apt upgrade`—you ensure your system has the latest security patches and features. This process is safe and non-destructive for most systems, making it a routine step in your VPS maintenance workflow. 🐳