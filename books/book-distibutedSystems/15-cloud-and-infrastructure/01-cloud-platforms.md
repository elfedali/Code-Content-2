## Cloud Platforms ☁️

Cloud platforms have become essential for modern distributed systems, offering scalable infrastructure, robust services, and flexible deployment options. This section covers the three major providers—AWS, GCP, and Azure—with specific examples of their distributed computing capabilities and practical implementation patterns.

### AWS
AWS (Amazon Web Services) is the market leader with extensive maturity in distributed systems. Its **Amazon S3** service provides highly durable object storage, ideal for distributed data pipelines. Here’s a concrete example of uploading a file to S3 using the AWS CLI:

```bash
aws s3 cp ./example.txt s3://my-bucket/example.txt
```

This command uploads a local file to an S3 bucket, demonstrating AWS’s seamless integration with distributed workflows. AWS pricing is usage-based: **$2.30 per month for 100 GB of S3 storage** (as of 2023). AWS excels in global scalability, mature ecosystem support, and hybrid cloud deployments, making it ideal for large-scale enterprise applications.

### GCP
Google Cloud Platform (GCP) emphasizes cost efficiency and AI/ML integration. Its **Google Cloud Storage (GCS)** service offers high-performance object storage optimized for distributed data. Example usage:

```bash
gsutil cp ./example.txt gs://my-bucket/example.txt
```

This uploads a file to GCS, highlighting GCP’s streamlined command structure for distributed workloads. GCP’s pricing is similarly usage-based: **$2.30 per month for 100 GB of Cloud Storage** (as of 2023). GCP shines in data-intensive applications, machine learning pipelines, and cost-optimized distributed architectures.

### Azure
Microsoft Azure provides deep enterprise integration and hybrid cloud capabilities. Its **Azure Blob Storage** service handles large-scale object storage with high durability. Example implementation:

```bash
az storage blob upload --account-name my-account --container-name my-container --file ./example.txt --name example.txt
```

This command uploads a file to Azure Blob Storage, showcasing Azure’s tight integration with Microsoft’s ecosystem. Azure pricing follows a comparable model: **$2.30 per month for 100 GB of Blob Storage** (as of 2023). Azure is optimal for organizations requiring seamless hybrid cloud deployments and enterprise application integration.

## Platform Comparison

| Feature                | AWS                          | GCP                          | Azure                        |
|------------------------|-------------------------------|-------------------------------|-------------------------------|
| **Core Model**         | IaaS (with PaaS/SaaS)         | IaaS (with PaaS/SaaS)         | IaaS (with PaaS/SaaS)         |
| **Key Distributed Service** | Amazon S3, EC2, Lambda      | Google Cloud Storage, Compute Engine | Azure Blob Storage, Virtual Machines |
| **Pricing Example**    | $2.30 for 100 GB storage      | $2.30 for 100 GB storage      | $2.30 for 100 GB storage      |
| **Strengths**          | Global infrastructure, mature | Strong AI/ML, cost efficiency | Hybrid cloud, enterprise integration |

## Summary

✅ This section covered the three major cloud platforms: AWS, GCP, and Azure. Each offers unique strengths for distributed systems—AWS for global scalability, GCP for cost-efficient AI/ML workloads, and Azure for hybrid enterprise integration—while maintaining comparable pricing for foundational storage services. When selecting a platform, prioritize your use case, ecosystem needs, and infrastructure requirements.