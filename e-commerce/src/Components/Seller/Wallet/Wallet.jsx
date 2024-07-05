import React, { useState, useEffect } from 'react';
import './Wallet.css';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Fetch balance and transactions from an API or mock data
  useEffect(() => {
    // Example: Fetch balance from an API endpoint
    const fetchBalance = async () => {
      try {
        const response = await fetch('https://api.example.com/wallet/balance');
        const data = await response.json();
        setBalance(data.balance); // Assuming 'balance' is a number representing the account balance
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    // Example: Fetch transactions from an API endpoint
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://api.example.com/wallet/transactions');
        const data = await response.json();
        setTransactions(data.transactions); // Assuming 'transactions' is an array of transaction objects
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchBalance();
    fetchTransactions();
  }, []);

  return (
    <div className="wallet-card">
      <div className="wallet-header">
        <h1>My Wallet</h1>
      </div>

      <div className="wallet-body">
        <div className="wallet-balance">
          <h2>Current Balance</h2>
          <p>${balance.toFixed(2)}</p>
        </div>

        <div className="transaction-history">
          <h2>Transaction History</h2>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>
                <p>{transaction.date}: ${transaction.amount.toFixed(2)} - {transaction.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
