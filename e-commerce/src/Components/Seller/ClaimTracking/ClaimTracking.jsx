import React, { useState } from 'react';
import './ClaimTracking.css'; // Ensure this is correctly importing the updated CSS file

const ClaimTrackingPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [cppFilter, setCppFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [issueTypeFilter, setIssueTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // Status filter state

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCppFilterChange = (e) => {
    setCppFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleIssueTypeFilterChange = (e) => {
    setIssueTypeFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value); // Update status filter state
  };

  const handleClearFilters = () => {
    setCppFilter('');
    setDateFilter('');
    setIssueTypeFilter('');
    setStatusFilter(''); // Clear status filter
  };

  // Dummy data to illustrate how filtering might work
  const claims = [
    { id: 1, status: 'approved', issueType: 'wrongItem', cppStatus: 'cppEligible', date: '2024-09-01' },
    { id: 2, status: 'rejected', issueType: 'wrongItem', cppStatus: 'cppNotEligible', date: '2024-09-05' },
    // Add more claims as needed
  ];

  // Apply filters to claims
  const filteredClaims = claims.filter((claim) => {
    return (
      (activeTab === 'all' || claim.status === activeTab) &&
      (cppFilter === '' || claim.cppStatus === cppFilter) &&
      (dateFilter === '' || claim.date === dateFilter) &&
      (issueTypeFilter === '' || claim.issueType === issueTypeFilter) &&
      (statusFilter === '' || claim.status === statusFilter) // Filter by status
    );
  });

  return (
    <div className="claim-tracking-page">
      <div className="sidebar">
        <button
          className={`filter-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => handleTabClick('open')}
        >
          Open
        </button>
        <button
          className={`filter-button ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => handleTabClick('approved')}
        >
          Approved
        </button>
        <button
          className={`filter-button ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => handleTabClick('rejected')}
        >
          Rejected
        </button>
      </div>
      <div className="filters">
        <h4>Filter By:</h4>
        <div className="filter-section">
          <h4>Claim Protection Plan</h4>
          <select
            className="filter-select"
            value={cppFilter}
            onChange={handleCppFilterChange}
          >
            <option value="">Select CPP Status</option>
            <option value="cppEligible">CPP Eligible</option>
            <option value="cppNotEligible">CPP Not Eligible</option>
          </select>
        </div>
        <div className="filter-section">
          <h4>Created Date</h4>
          <select
            className="filter-select"
            value={dateFilter}
            onChange={handleDateFilterChange}
          >
            <option value="">Select Date Range</option>
            <option value="today">Today</option>
            <option value="next3Days">Next 3 Days</option>
            <option value="next1Month">Next 1 Month</option>
          </select>
        </div>
        <div className="filter-section">
          <h4>Issue Type</h4>
          <select
            className="filter-select"
            value={issueTypeFilter}
            onChange={handleIssueTypeFilterChange}
          >
            <option value="">Select Issue Type</option>
            <option value="wrongItem">I Have Received Wrong Item</option>
            {/* Add more issue types if needed */}
          </select>
        </div>
        <div className="filter-section">
          <h4>Status</h4>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={handleStatusFilterChange} // Use the function to update status filter
          >
            <option value="">Select Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button className="clear-filters-button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
     
    </div>
  );
};

export default ClaimTrackingPage;
