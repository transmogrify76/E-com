import React, { useState } from 'react';
import './NewBank.css';

const NewBank = () => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    branchName: '',
    accountType: 'savings' // default to savings account type
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Add logic to send form data to server or handle submission
    // You can implement Axios or fetch here to send data to the backend
  };

  return (
    <div className="add-bank-account-form-container">
      <h2>Add Bank Account</h2>
      <form className="add-bank-account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="accountHolderName">Account Holder Name</label>
          <input
            type="text"
            className="form-control"
            id="accountHolderName"
            placeholder="Enter account holder name"
            value={formData.accountHolderName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bankName">Bank Name</label>
          <input
            type="text"
            className="form-control"
            id="bankName"
            placeholder="Enter bank name"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ifscCode">IFSC Code</label>
          <input
            type="text"
            className="form-control"
            id="ifscCode"
            placeholder="Enter IFSC code"
            value={formData.ifscCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="branchName">Branch Name</label>
          <input
            type="text"
            className="form-control"
            id="branchName"
            placeholder="Enter branch name"
            value={formData.branchName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountType">Account Type</label>
          <select
            className="form-control"
            id="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            <option value="savings">Savings Account</option>
            <option value="current">Current Account</option>
            <option value="salary">Salary Account</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Account
        </button>
      </form>
    </div>
  );
};

export default NewBank;
