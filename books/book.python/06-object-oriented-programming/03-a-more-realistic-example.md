## A More Realistic Example

In the previous section, we covered the basics of classes and objects. Now, let’s dive into a scenario that feels *truly* real-world: **a bank account system**. This isn’t just a theoretical exercise—it’s something you’d build daily in real banking applications. Imagine you’re a bank teller handling transactions while keeping things secure and accurate. Let’s build a `BankAccount` class that handles deposits, withdrawals, and interest—just like your actual bank does.

### Step 1: Defining the BankAccount Class

We start with a class that includes realistic constraints and behaviors. Notice how we use underscores for *conventionally private* attributes (Python doesn’t enforce true privacy, but this pattern helps signal intent):

```python
class BankAccount:
    def __init__(self, account_number: str, initial_balance: float = 0.0):
        """
        Initialize a new bank account with an account number and initial balance.
        """
        self._account_number = account_number  # Conventional private attribute
        self._balance = initial_balance
        self._interest_rate = 0.02  # Annual interest rate (2%)

    def deposit(self, amount: float) -> bool:
        """
        Deposit money into the account.
        Returns True if successful, False otherwise.
        """
        if amount > 0:
            self._balance += amount
            return True
        return False

    def withdraw(self, amount: float) -> bool:
        """
        Withdraw money from the account.
        Returns True if successful, False otherwise.
        """
        if amount > 0 and amount <= self._balance:
            self._balance -= amount
            return True
        return False

    def apply_monthly_interest(self):
        """
        Apply the monthly interest to the account balance.
        This is called once per month.
        """
        monthly_rate = self._interest_rate / 12
        self._balance += self._balance * monthly_rate

    def get_balance(self) -> float:
        """
        Get the current balance of the account.
        """
        return self._balance

    def __str__(self):
        return f"Account {self._account_number}: Balance = ${self._balance:.2f}"
```

### Step 2: Simulating Real Transactions

Now, let’s create an account and simulate a month of banking activity—just like you’d do in a real bank:

```python
# Create a new bank account
my_account = BankAccount(account_number="US123456", initial_balance=1000.0)

# Deposit $500 (valid transaction)
print(f"Deposited $500: {my_account.deposit(500)}")

# Withdraw $200 (valid transaction)
print(f"Withdrew $200: {my_account.withdraw(200)}")

# Check balance after deposits/withdrawals
print(f"Current balance: ${my_account.get_balance():.2f}")

# Apply monthly interest (realistic banking behavior)
my_account.apply_monthly_interest()
print(f"Balance after interest: ${my_account.get_balance():.2f}")
```

**What happens here?**  
- We create an account with a starting balance of $1,000.  
- We deposit $500 → balance becomes $1,500.  
- We withdraw $200 → balance becomes $1,300.  
- After applying **monthly interest** (2% annual rate → ~0.1667% monthly), the balance becomes **$1,300.17**.  

This mirrors real banking: interest compounds *automatically* after each month, and transactions are validated to prevent negative balances or invalid amounts.

### Why This Feels Real

Real banks don’t just handle numbers—they handle *trust*. This example shows:  
- **Validation**: Withdrawals check for sufficient funds (`amount <= self._balance`).  
- **Encapsulation**: Internal state (like `_balance`) is hidden from direct access.  
- **Realistic interest**: Banks use *compounded* interest (not simple), and we calculate it monthly—exactly how most banks operate.  
- **Error handling**: Methods return `True`/`False` to indicate success/failure (e.g., negative deposits are rejected).

You might wonder: *"Why not use `__balance` for true privacy?"* Great question! In Python, we use underscores for *convention* (not enforced privacy). This keeps the code readable while signaling that `_balance` shouldn’t be modified externally. For true privacy, we’d use techniques like `property` decorators—something we’ll cover later.

### A Practical Twist: Transaction History

To make it *even more* realistic (without overcomplicating), let’s add a simple transaction history. This is a common requirement in real banking apps:

```python
class BankAccount:
    def __init__(self, account_number: str, initial_balance: float = 0.0):
        self._account_number = account_number
        self._balance = initial_balance
        self._interest_rate = 0.02
        self._transactions = []  # Track all transactions

    def deposit(self, amount: float) -> bool:
        if amount > 0:
            self._balance += amount
            self._transactions.append((f"Deposit", amount))
            return True
        return False

    def withdraw(self, amount: float) -> bool:
        if amount > 0 and amount <= self._balance:
            self._balance -= amount
            self._transactions.append((f"Withdrawal", amount))
            return True
        return False

    # ... rest of the methods remain the same ...
```

This small addition (tracking transactions) is what makes the example *feel real*. Real banks log every move—so you can track where money goes. It’s a tiny step toward building a full banking system, but it’s *exactly* the kind of detail you’d add in production.

### Key Takeaways

This example proves that **real-world OOP isn’t about complex theory—it’s about solving tangible problems**. By focusing on:  
1. **Validation** (no negative balances),  
2. **Encapsulation** (protecting internal state),  
3. **Realistic behavior** (monthly interest),  
...we built a system that mirrors actual banking.  

You don’t need to master every detail to start building real applications. Start small—like this account—then add features (transaction history, account types, etc.) as your skills grow. The goal? Code that *feels* like it could run in a bank’s real system. 💰