## Automation

Automation is the backbone of modern DevOps practices, enabling teams to eliminate manual errors, accelerate delivery cycles, and maintain consistency across environments. In this section, we'll dive into two foundational pillars: **shell scripts** for lightweight task automation and **CI/CD basics** for end-to-end pipeline orchestration. By mastering these, you’ll build the muscle for scalable cloud-native workflows.

### Shell Scripts

Shell scripts are text files containing a sequence of commands executed by your system’s shell (typically `bash` on Linux). They transform your terminal from a one-off tool into a programmable automation engine—perfect for repetitive tasks, environment setup, and infrastructure-as-code snippets.

#### Why Shell Scripts Matter
- **Reproducibility**: Ensure identical environments across development, testing, and production.
- **Speed**: Execute tasks in seconds instead of minutes.
- **Cost Efficiency**: Reduce human error and manual intervention in cloud environments.
- **Integration**: Seamlessly bridge with cloud services (e.g., AWS CLI, Docker).

#### Core Components
Here’s how a practical shell script works:

1. **Shebang (`#!/bin/bash`)**: Specifies the interpreter. Without this, scripts won’t run.
2. **Variables**: Store dynamic values (e.g., `USER_NAME="dev_user"`).
3. **Conditionals**: Control flow with `if`, `else`, `elif`.
4. **Loops**: Iterate over tasks with `for`, `while`.
5. **Error Handling**: Critical for production scripts using `set -e` or `||`.

#### Real-World Example: Disk Space Monitor
A script that alerts when disk space falls below 10% (common in cloud environments):

```bash
#!/bin/bash

# Define threshold (in percentage)
THRESHOLD=10

# Check disk usage for /var/log
DISK_USAGE=$(df -h /var/log | awk 'NR==2 {print $5}')

# Convert percentage to float for comparison
CURRENT_USAGE=$(echo "$DISK_USAGE" | tr -d % | cut -d. -f1)

# Check if usage is below threshold
if [ "$(echo "$CURRENT_USAGE $THRESHOLD" | tr ' ' '\n' | sort -n | head -1)" -lt "$THRESHOLD" ]; then
  echo "🚨 Disk usage for /var/log is $CURRENT_USAGE% (below $THRESHOLD% threshold)"
  # Send alert via email (example)
  mail -s "Disk Space Alert" admin@example.com <<EOF
Your /var/log disk is low: $CURRENT_USAGE%
Action: Free up space immediately
EOF
else
  echo "✅ Disk usage for /var/log is healthy ($CURRENT_USAGE%)"
fi
```

**Key Insights**:
- Uses `df` to check disk usage (standard Linux tool).
- Handles percentage conversion without floating-point errors.
- Sends an email alert via `mail` (requires `sendmail` or similar installed).
- **Pro Tip**: Always add `set -e` at the top to fail immediately on errors.

#### Another Example: Package Installation
Automate installing dependencies for a Node.js app:

```bash
#!/bin/bash

# Update package lists
sudo apt update

# Install Node.js (v18) and npm
sudo apt install -y curl
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v  # Should output v18.x
npm -v   # Should output latest version
```

**Why This Works**:
- Uses `apt` for Ubuntu-based systems (common in cloud VMs).
- Checks for successful installation via `node -v`/`npm -v`.
- Handles dependencies in order to avoid "dependency hell".

#### When to Use Shell Scripts
| Scenario                          | Shell Script Solution                     |
|------------------------------------|-------------------------------------------|
| Quick environment setup            | `install_deps.sh` (as above)             |
| Infrastructure provisioning        | `terraform apply` (but scripts bridge gaps) |
| Post-deployment checks             | `health_check.sh` (e.g., HTTP status)    |
| Cloud cost monitoring              | `aws cost-analyzer.sh` (via AWS CLI)     |

> 💡 **Remember**: Shell scripts are *not* for complex logic. Use them for **repetitive, low-level tasks**—then scale to higher-level tools (like Kubernetes or Terraform) for complex workflows.

### CI/CD Basics

CI/CD (Continuous Integration/Continuous Delivery) automates the software delivery lifecycle from code commit to production deployment. It’s the bridge between developers and operations—ensuring code changes are tested, built, and deployed reliably without manual intervention.

#### Why CI/CD? The 3-Pillar Approach
1. **Continuous Integration (CI)**: Automatically build and test code changes after every commit.
2. **Continuous Delivery (CD)**: Automatically deploy tested code to a staging environment.
3. **Continuous Deployment (CD)**: Automatically deploy to production *after* passing all checks (advanced).

This reduces release cycles from weeks to minutes and catches issues early—critical in cloud environments where downtime costs thousands per minute.

#### Building a Minimal CI Pipeline with GitHub Actions
GitHub Actions is a free, cloud-native CI/CD platform that runs on Linux. Here’s a simple pipeline for a Python project:

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt

      - name: Run tests
        run: |
          pytest
```

**How This Works**:
1. **Triggers**: Runs on `push` to `main` branch (standard for production pipelines).
2. **Environment**: Uses `ubuntu-latest` (a Linux VM in GitHub’s cloud).
3. **Steps**:
   - `Checkout code`: Fetches your repository.
   - `Set up Python`: Configures Python 3.10.
   - `Install dependencies`: Uses `requirements.txt` (common in Python).
   - `Run tests`: Executes `pytest` (a standard testing framework).

#### Key Components of a Production Pipeline
| Component          | Purpose                                  | Example Tool        |
|---------------------|-------------------------------------------|---------------------|
| **Trigger**         | When to start the pipeline                | GitHub push, GitLab merge |
| **Build**           | Compile code, install dependencies        | Docker, Maven       |
| **Test**            | Run unit/integration tests                | Jest, PyTest        |
| **Deploy**          | Push to staging or production            | AWS Elastic Beanstalk, Kubernetes |
| **Monitoring**      | Verify post-deployment health            | Prometheus, Grafana |

#### Real-World Example: Deploying a Web App to AWS
Here’s a minimal pipeline deploying a Python app to AWS Elastic Beanstalk:

```yaml
# .github/workflows/deploy-to-aws.yml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up AWS CLI
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_KEY }}
          region: us-east-1

      - name: Deploy app
        run: |
          aws elasticbeanstalk create-application-version \
            --application-name my-app \
            --version-label v1 \
            --source-bundle S3Bucket=my-bucket, S3Key=app.zip
```

**Critical Notes**:
- Uses `secrets` to securely store AWS credentials (never hardcode!).
- Deploys to AWS Elastic Beanstalk (a managed service for cloud apps).
- `app.zip` must be built from your code (e.g., via `python setup.py sdist`).

#### Why This Matters for Cloud
- **Cost Control**: CI/CD pipelines run in ephemeral environments (no idle servers).
- **Security**: Secrets management (like GitHub’s `secrets`) prevents credential leaks.
- **Scalability**: Handles thousands of builds per day (e.g., GitHub Actions scales automatically).

> 🛠️ **Pro Tip**: Start small—focus on *one* pipeline (e.g., testing) before adding deployment. Complexity grows exponentially when you skip this step.

## Summary

Shell scripts empower you to automate repetitive Linux tasks with precision—whether monitoring disk space, installing dependencies, or validating infrastructure. CI/CD pipelines, like GitHub Actions, then scale this automation to the cloud by automating testing, builds, and deployments. Together, they form the foundation of reliable, fast, and cost-efficient DevOps workflows. Start with a single shell script and a minimal CI pipeline—then expand as your needs grow. You’ve got this! 💪