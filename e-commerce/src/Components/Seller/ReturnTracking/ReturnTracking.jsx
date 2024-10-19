import React, { useState } from 'react';
import './ReturnTracking.css'; // Ensure this is correctly importing the updated CSS file

const ReturnsPage = () => {
  const [activeTab, setActiveTab] = useState('inTransit');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [returnType, setReturnType] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleReturnTypeChange = (type) => {
    setReturnType(type);
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setDateFilter('');
    setReturnType('');
  };

  return (
    <div className="returns-page">
      <div className="tabs">
        <div
          className={`tab-button ${activeTab === 'inTransit' ? 'active' : ''}`}
          onClick={() => handleTabClick('inTransit')}
        >
          In Transit
        </div>
        <div
          className={`tab-button ${activeTab === 'outForDelivery' ? 'active' : ''}`}
          onClick={() => handleTabClick('outForDelivery')}
        >
          Out for Delivery
        </div>
        <div
          className={`tab-button ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => handleTabClick('delivered')}
        >
          Delivered
        </div>
        <div
          className={`tab-button ${activeTab === 'lost' ? 'active' : ''}`}
          onClick={() => handleTabClick('lost')}
        >
          Lost
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 'inTransit' && (
          <div className="status-page">
            <div className="filters">
              <h4>Filter By:</h4>
              <div className="filter-section">
                <h4>Return Created Date</h4>
                <select
                  className="filter-select"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                >
                  <option value="">Select Date Range</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last3Days">Last 3 Days</option>
                  <option value="last1Week">Last 1 Week</option>
                  <option value="last2Weeks">Last 2 Weeks</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>
              <div className="filter-section">
                <h4>Expected Delivery Date</h4>
                <select
                  className="filter-select"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                >
                  <option value="">Select Date Range</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="next3Days">Next 3 Days</option>
                  <option value="next1Week">Next 1 Week</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>
              <div className="filter-section">
                <h4>Return Type</h4>
                <select
                  className="filter-select"
                  value={returnType}
                  onChange={(e) => handleReturnTypeChange(e.target.value)}
                >
                  <option value="">Select Return Type</option>
                  <option value="Customer Requested">Customer Requested</option>
                  <option value="Not Delivered">Not Delivered</option>
                </select>
              </div>
              <button className="clear-filters-button" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
            <div className="results">
              <p className="no-results-message">No results found</p>
            </div>
          </div>
        )}
        {activeTab === 'outForDelivery' && (
          <div className="status-page">
            <div className="filters">
              <div className="filter-section">
                <h4>Status</h4>
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                >
                  <option value="">Select</option>
                  <option value="Final Attempt">Delivering Today</option>
                  <option value="2nd Attempt">To be Reattempted</option>
                </select>
              </div>
              <div className="filter-section">
                <h4>Attempt</h4>
                <select
                  className="filter-select"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                >
                  <option value="">Attempt</option>
                  <option value="tomorrow">Final attempt</option>
                  <option value="next3Days">2nd Attempt</option>
                  <option value="next1Week">1St Attempt</option>
                </select>
              </div>
              <button className="clear-filters-button" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        )}
        {activeTab === 'delivered' && (
          <div className="status-page">
            <div className="filters">
              <div className="filter-section">
                <h4>Return Created Date</h4>
                <select
                  className="filter-select"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                >
                  <option value="">Select Date Range</option>
                  <option value="last1Month">Last 1 Month</option>
                  <option value="last3Months">Last 3 Months</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>
              <div className="filter-section">
                <h4>Return Type</h4>
                <select
                  className="filter-select"
                  value={returnType}
                  onChange={(e) => handleReturnTypeChange(e.target.value)}
                >
                  <option value="">Select Return Type</option>
                  <option value="Customer Requested">Customer Requested</option>
                  <option value="Not Delivered">Not Delivered</option>
                </select>
              </div>
              <button className="clear-filters-button" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
            <div className="results">
              <p className="no-results-message">No results found</p>
            </div>
          </div>
        )}
        {activeTab === 'lost' && (
          <div className="status-page">
            <div className="filters">
              <div className="filter-section">
                <h4>Lost Date</h4>
                <select
                  className="filter-select"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                >
                  <option value="">Select Date Range</option>
                  <option value="last1Month">Last 1 Month</option>
                  <option value="last3Months">Last 3 Months</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>
              <div className="filter-section">
                <h4>Return Type</h4>
                <select
                  className="filter-select"
                  value={returnType}
                  onChange={(e) => handleReturnTypeChange(e.target.value)}
                >
                  <option value="">Select Return Type</option>
                  <option value="Customer Requested">Customer Requested</option>
                  <option value="Not Delivered">Not Delivered</option>
                </select>
              </div>
              <button className="clear-filters-button" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
            <div className="results">
              <p className="no-results-message">No results found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnsPage;
