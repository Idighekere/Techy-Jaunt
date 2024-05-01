// Create a BankAccount Class and a Transaction Class.Each of these classes will contain the below attributes.

//     BankAccount
// accountNumber | number | private attribute
// accountHolder | string | private attribute
// balance | number | private attribute
// transactions | array | private attribute
// deposit function
//     withdraw function
//     getTransactions function

//     All the above attributes are private and should only be accessible through the use of a getter or setter.

//         Transaction
// type | string | private attribute
// amount | number | private attribute
// timestamp | date | private attribute

// All the above attributes are private and should only be accessible through the use of a getter or setter.
// const person1 = new BankAccount(2345624312, "Idighs Udo", `$2000`)
// const person2 = new BankAccount(7041300445, "Idighekere Udo", `$20000`)
// console.log(person1.accountDetails())
// console.log(person2.accountDetails())
class BankAccount {
  constructor(accountNumber, accountHolder, withdrawLimit) {
    this._accountNumber = accountNumber;
    this._accountHolder = accountHolder;
    this._balance = 0;
    this._transactions = [];
    this._withdrawLimit = withdrawLimit;
    this._withdrawCount = 0;
    this._lastWithdrawalDate = new Date().getDate();
  }

  get accountNumber() {
    return this._accountNumber;
  }
  set accountNumber(num) {
    return (this._accountNumber = num);
  }

  get accountHolder() {
    return this._accountHolder;
  }
  set accountHolder(name) {
    return (this._accountHolder = name);
  }
  get balance() {
    return this._balance;
  }
  set balance(num) {
    return (this._balance = num);
  }
  get withdrawLimit() {
    return this.withdrawLimit;
  }
  set withdrawLimit(num) {
    return (this.withdrawLimit = num);
  }
  get transactions() {
    return this._transactions;
  }

  set transactions(value) {
    return (this._transactions = value);
  }
  deposit(amount) {
    // const balance = this._balance

    if (typeof amount !== "number") {
      return `Amount must be a number`;
    } else {
      this._balance += amount;
      const depositTransaction = new Transaction("deposit", amount);
      this._transactions.push(depositTransaction);
    }
  }
  withdraw(amount) {
    const currentDate = new Date().getDate();

    if (currentDate !== this._lastWithdrawalDate) {
      this._withdrawCount = 0;
      this._lastWithdrawalDate = currentDate;
    }
    try {
      if (
        this._balance >= amount &&
        this._withdrawLimit > this._withdrawCount
      ) {
        this._withdrawCount++;
        this._balance -= amount;
        const withdrawalTransaction = new Transaction("withdraw", amount);
        this._transactions.push(withdrawalTransaction);
      } else if (this._balance < amount) {
        throw new Error(`Insufficient Balance`);
      } else {
        throw new Error(
          `You have exceeded your withdrawal limit of ${this._withdrawLimit}`
        );
        
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  transfer(amount, receiverAccount) {
    if (this._balance >= amount) {
      this._balance -= amount;
      receiverAccount._balance += amount;
      // const transfer = new BankAccount(receiverAccount, receiverName);
      // this._balance += amount;

      const transferTransaction = new Transaction("transfer_out", amount);
      this._transactions.push(transferTransaction);

      const receiveTransaction = new Transaction("transfer_in", amount);
      receiverAccount._transactions.push(receiveTransaction);

      console.log(
        `Transfered  ${amount} to ${receiverAccount.accountHolder}'s account (${receiverAccount.accountNumber}) `
      );
    } else {
      console.log("insufficient funds for transfer");
    }
  }
  getTransactions() {
    return this._transactions;
  }
}

class Transaction {
  constructor(type, amount) {
    this._type = type;
    this._amount = amount;
    this._timestamp = new Date();
  }
}
const acc = new BankAccount(1234567890, "Idighekere Udo", 2);
const acc2 = new BankAccount(2457891238, "Andikan Ise", 3);
// const acc1 = new BankAccount(1234567890, "Idighekere Udo", 2000)
console.log(`Initial Balance: NGN${acc.balance}`);
console.log(`Andikan's Initial Balance : NGN${acc2.balance}`);
// console.log(`Initial Balance: NGN${acc1.balance}`)
acc.deposit(12500);
acc2.deposit(25000);
console.log(`Balance after Deposit: NGN${acc.balance}`);
console.log(`Andikan's Balance after Deposit: NGN${acc2.balance}`);
acc.withdraw(500);
acc.withdraw(2500);
acc.withdraw(500);
acc.withdraw(500);
acc.transfer(5000, acc2);
console.log(`Balance after Withdraw: NGN${acc.balance}`);
console.log(` My Balance after Transfer: NGN${acc.balance}`);
console.log(` Andikan's after Transfer: NGN${acc2.balance}`);
// acc.withdraw(100000);
console.log(`Balance after Withdraw: NGN${acc.balance}`);
acc.deposit(100000);
console.log(`Balance after Deposit: NGN${acc.balance}`);

// console.log(acc2.getTransactions());
console.log(acc.getTransactions());
console.log(new Date().getDate());
