## WordPress Hosting

In this section, we dive into real-world WordPress hosting using Docker. We'll build a production-ready environment from scratch, focusing on two critical aspects: the core PHP + MySQL stack and ensuring your data survives container restarts with persistent storage.

### PHP + MySQL

WordPress is a PHP application that relies on a MySQL database. To host WordPress in Docker, we need two containers: one for the database (MySQL) and one for the WordPress application (with PHP). This section shows you how to set up a minimal stack that runs WordPress without persistent storage (to illustrate the core components).

Here's a simple `docker-compose.yml` file that creates a WordPress instance with a MySQL database. The stack uses the latest WordPress 6.0 image and MySQL 8.0. **Important**: This setup does not persist data—so if you stop the containers, your WordPress database and site data will be lost.

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: example_password
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
  wordpress:
    image: wordpress:6.0
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
    ports:
      - "8080:80"
    depends_on: [db]
```

When you run `docker-compose up -d`, this stack starts. The WordPress site becomes accessible at `http://localhost:8080`. However, **the database data is not persisted**—so if you restart the stack, the database will reset to the initial state (with the `example_password` and `wordpress` user). This is a common starting point for understanding the stack.

This minimal configuration demonstrates how WordPress communicates with MySQL using environment variables for database credentials. For development, you might want to add environment variables for your actual passwords, but this structure gives you the foundation to build upon.

🐳

### Persistent Storage

In production, **data loss is unacceptable**. Without persistent storage, your WordPress site and database can be lost if the containers restart. This section shows how to add persistent storage using Docker volumes.

We'll extend the previous `docker-compose.yml` to add two volumes:
1. A volume for the MySQL database (to store database files)
2. A volume for WordPress (to store website files)

Here's the updated `docker-compose.yml`:

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: example_password
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    volumes:
      - db_data:/var/lib/mysql
  wordpress:
    image: wordpress:6.0
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
    volumes:
      - wordpress_data:/var/www/html
    ports:
      - "8080:80"
    depends_on: [db]
volumes:
  db_data:
  wordpress_data:
```

**Why this works**:
- The `db_data` volume stores the MySQL database files. When the `db` container restarts, it uses the volume to keep the database intact.
- The `wordpress_data` volume stores WordPress files (themes, plugins, uploads). This ensures your site content survives container restarts.

This setup is **production-ready** for small WordPress sites. For larger deployments, you might use cloud storage solutions, but Docker volumes provide a robust starting point that works with most cloud providers.

💾

## Summary

In this section, we built a WordPress hosting stack using Docker. We started with a basic PHP + MySQL stack (without persistent storage) to understand the core components. Then, we added persistent storage with Docker volumes to ensure your data survives container restarts. This approach gives you a solid foundation for running WordPress in production.

Remember: **persistent storage is non-negotiable** in production environments. Always use volumes for your database and application files.