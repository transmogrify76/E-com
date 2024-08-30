import React, { useState } from 'react';
import './Wallet.css';


const Wallet = () => {
  const [balance] = useState(1000);
  const [modalVisible, setModalVisible] = useState(false);


  const handleAddBankAccount = () => {
    window.location.href = '/NewBank';
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div className="wallet-container">
      <div className="wallet">
        <div className="wallet-header">
          <h1>My Wallet</h1>
        </div>
        <button className="btn-add-bank" onClick={handleAddBankAccount}>
          + Add Bank Account
        </button>
        <div className="wallet-body">
          <div className="wallet-balance">
            <h3>Current Balance</h3>
            <p className="balance-amount">₹ {balance.toFixed(2)}</p>

            <button type="button" className="btn btn-primary" onClick={toggleModal}>
              Get amount
            </button>

            {modalVisible && (
              <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Get Money</h5>
                      <button type="button" className="close" onClick={toggleModal}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="text" className="form-control" id="amount" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="method">Receive Method</label>
                        <select className="form-control" id="method">
                          <option value="account">Account Number</option>
                          <option value="upi">UPI ID</option>
                          <option value="paypal">PayPal</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="recipient">Recipient</label>
                        <input type="text" className="form-control" id="recipient" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Request Money
                      </button>
                    </div>
                  </div>
                </div>
                </div>
            )}
          </div>

          <div className="transaction-history">
            <h3>Transaction History</h3>
            <ul className="transaction-list">
              {/* Replace with actual transaction data */}
              <li className="transaction-item">
                <div className="transaction-info">
                  <span className="transaction-date">2024-07-01</span>
                  <span className="transaction-amount income">₹ 500.00</span>
                  <span className="transaction-description">OrderId  8769574859</span>
                </div>
              </li>
              <li className="transaction-item">
                <div className="transaction-info">
                  <span className="transaction-date">2024-07-02</span>
                  <span className="transaction-amount income">₹ 200.00</span>
                  <span className="transaction-description">OrderId  876454637</span>
                </div>
              </li>
              <li className="transaction-item">
                <div className="transaction-info">
                  <span className="transaction-date">2024-07-03</span>
                  <span className="transaction-amount income">₹ 450.00</span>
                  <span className="transaction-description">OrderId  8445346453</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Wallet;
