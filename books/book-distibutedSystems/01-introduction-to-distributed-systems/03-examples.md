## Examples

### Google

Google's distributed systems form the backbone of the internet's infrastructure. One of the most influential systems is **Google File System (GFS)**, designed to handle massive datasets across thousands of machines. GFS ensures high availability and fault tolerance by dividing large files into chunks and replicating them across the cluster.

A classic example of GFS in action is storing and processing web search data. When a user searches for a term, Google's system processes billions of web pages. To illustrate the distributed nature of GFS, consider a simple file read operation:

```python
# Conceptual example of a file read in GFS (pseudo-code)
def read_file(file_path):
    # 1. Get the master node
    master = get_master()
    # 2. Request the file chunks from the master
    chunks = master.get_file_chunks(file_path)
    # 3. Read chunks from the appropriate data nodes
    data = []
    for chunk in chunks:
        data_node = get_data_node(chunk)
        chunk_data = data_node.read_chunk(chunk)
        data.append(chunk_data)
    # 4. Reconstruct the file
    return reconstruct_file(data)
```

This example shows how GFS distributes the load and ensures that even if one data node fails, the file can still be read from another. Google's **MapReduce** framework further scales computation by parallelizing data processing. For instance, a word count job across a terabyte of text data is broken into smaller tasks that run in parallel on the cluster.

This approach scales to handle the massive data needs of the web 🌐

### Netflix

Netflix's distributed architecture is a masterclass in scalability and resilience. With over 200 million users, Netflix relies on a microservices architecture where each service runs independently and communicates via APIs. A key example is their **service discovery** mechanism using **Eureka**, which helps services find each other in a dynamic environment.

When a user starts streaming a movie, the Netflix service (e.g., `recommendations`) must quickly find the best movie based on user preferences. To ensure this happens without delays, Netflix's system uses a distributed database for real-time data. Here's a simplified example of how a service registers itself with Eureka:

```java
// Java example: Registering a service with Eureka
import com.netflix.eureka.EurekaClient;

public class RecommendationService {
    private final EurekaClient eurekaClient;

    public RecommendationService(EurekaClient eurekaClient) {
        this.eurekaClient = eurekaClient;
    }

    public void registerService() {
        // Register the service with Eureka
        eurekaClient.registerService("recommendations", "http://localhost:8080");
    }
}
```

Netflix also practices **chaos engineering** to proactively identify failures. Their tool, **Chaos Monkey**, randomly terminates instances to ensure the system recovers gracefully. This practice has been instrumental in maintaining reliability during high traffic events.

### Uber

Uber's distributed systems handle real-time ride matching for millions of users. The company's architecture uses **Apache Cassandra** for real-time location data, which allows them to match riders and drivers in milliseconds.

Consider a scenario where a rider requests a ride. The system must quickly find the nearest driver within a 500-meter radius. Here's a simplified example of a Cassandra query to find available drivers:

```sql
-- CQL (Cassandra Query Language) example
SELECT driver_id, driver_location, driver_status
FROM drivers
WHERE driver_location.distance(rider_location) < 500
  AND driver_status = 'available';
```

Uber's system handles over 1 million requests per second during peak hours, demonstrating the power of distributed databases for real-time applications.

This ensures that even during peak traffic, users get a seamless ride experience 🚗

## Summary

In this section, we explored three iconic distributed systems: **Google**'s foundational work on scalability, **Netflix**'s resilience through chaos engineering, and **Uber**'s real-time matching capabilities. Each example illustrates how distributed systems solve distinct challenges while maintaining reliability and performance at scale. The key takeaway is that distributed systems are not just theoretical—they are the backbone of modern internet applications.