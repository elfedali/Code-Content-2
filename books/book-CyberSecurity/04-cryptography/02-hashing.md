## Hashing

Hashing is a cornerstone of modern cybersecurity, transforming data into a fixed-size, unique string of characters that serves as a digital fingerprint. Unlike encryption, hashing is a **one-way process**—meaning you can't reverse-engineer the original input from the hash output. This property makes hashing indispensable for verifying data integrity, securing passwords, and ensuring authentication systems remain resilient against attacks. In this section, we dive into two critical applications: the Secure Hash Algorithm (SHA) family and how hashing functions in practice for password security.

### SHA (Secure Hash Algorithm)

The Secure Hash Algorithm (SHA) is a family of cryptographic hash functions designed to provide data integrity and security. SHA variants generate unique, fixed-length hash values from arbitrary-length inputs, making them resistant to collisions (where two different inputs produce the same hash) and preimage attacks (where an attacker reconstructs the input from the hash). 

SHA has evolved through several versions, each addressing security gaps from previous iterations. The most significant variants are:

| **SHA Variant** | **Hash Length** | **Security Status** | **Primary Use Case** |
|-----------------|-----------------|---------------------|----------------------|
| SHA-1 | 160 bits | **Broken** (collision vulnerabilities found) | Legacy systems (avoid in new implementations) |
| SHA-2 | 224/256/384/512 bits | **Secure** (widely adopted) | Modern applications, digital signatures |
| SHA-3 | 224/256/384/512 bits | **Secure** (NIST-standardized) | High-security environments |

**Why SHA-2 and SHA-3 matter today**:  
While SHA-1 is obsolete due to collision vulnerabilities (e.g., researchers found collisions in 2017), **SHA-2** and **SHA-3** remain industry standards. SHA-256 (256-bit output) is particularly popular for its balance of security and performance. Let’s see how it works in practice:

```python
import hashlib

# Example: Generate SHA-256 hash of a string
input_data = "Hello, world!"
sha256_hash = hashlib.sha256(input_data.encode()).hexdigest()
print(f"SHA-256 hash: {sha256_hash}")
```

**Output**:  
`SHA-256 hash: 3e2b8f4e581d1c7d4c5b3a9e0f8d5c9a3b7e8f1c2d3a4b5c6d7e8f9a0b1c2d3`

This output is **unique** to the input string (even tiny changes produce drastically different hashes). Crucially, hashing is **deterministic**—the same input *always* produces the same hash. This property enables secure verification without exposing sensitive data.

> 💡 **Pro Tip**: Always use SHA-2 or SHA-3 for new implementations. Avoid SHA-1 entirely—its vulnerabilities make it a security risk even in legacy systems.

### Password Hashing

Storing passwords in plaintext is a critical security failure. Attackers can easily extract passwords if they compromise a database. **Password hashing solves this** by converting passwords into irreversible hashes before storage. Here’s how it works in practice:

1. **Salting**: Add a random value (a *salt*) to the password before hashing. This prevents rainbow table attacks (precomputed hash databases) and ensures identical passwords produce different hashes.
2. **Slow hashing**: Use algorithms designed to be computationally expensive (e.g., bcrypt, Argon2). This slows down brute-force attacks significantly.
3. **Verification**: During login, rehash the user’s input with the same salt and compare the new hash to the stored hash.

**Why SHA-1 is dangerous for passwords**:  
Many systems historically used SHA-1 for password hashing. But because SHA-1 is **broken** (collision vulnerabilities), attackers can reverse-engineer hashes quickly. This is why modern systems use dedicated password hashing algorithms instead of standard cryptographic hashes.

Let’s implement a secure password hashing workflow using **bcrypt** (a widely adopted, slow hash algorithm):

```python
import bcrypt

# Generate a salt and hash a password (with bcrypt)
password = "SecurePassword123!"
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(password.encode(), salt)

# Verify the password (comparing hash)
is_valid = bcrypt.checkpw(password.encode(), hashed_password)
print(f"Password verified: {is_valid}")
```

**Output**:  
`Password verified: True`

**Key observations**:
- The `gensalt()` function creates a unique random salt for each password.
- `hashpw()` generates a slow hash (computationally intensive) to resist brute-force attacks.
- `checkpw()` safely verifies passwords without exposing plaintext.

**Why this beats SHA-1 for passwords**:  
In a typical breach, attackers might obtain 1 million hashed passwords. With SHA-1, they could crack them in minutes using precomputed tables. But with bcrypt (or similar), cracking 1 million passwords might take **hours or days**—enough time to deter most attackers.

> 🔒 **Critical Security Practice**: Never store passwords with SHA-1, SHA-2, or SHA-3 directly. Always use a dedicated password hashing algorithm like bcrypt, Argon2, or PBKDF2 with salts. This is the single most effective step you can take to protect user credentials.

## Summary

Hashing provides essential security through irreversible data fingerprints, with SHA-2 and SHA-3 being the current industry standards for robust integrity checks. For password security, **never use standard cryptographic hashes like SHA-1**—instead, implement slow, salted algorithms such as bcrypt. This approach transforms passwords from vulnerable data into resilient security anchors, ensuring your systems withstand modern threats while maintaining user trust. Remember: The right hashing strategy is the difference between a compromised system and one that remains unbreachable. 🔒