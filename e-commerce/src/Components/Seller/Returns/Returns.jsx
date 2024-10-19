
import React, { useState } from 'react';
import './Returns.css'; // Ensure this is correctly importing the updated CSS file
import ReturnTracking from '../ReturnTracking/ReturnTracking'; // Import the ReturnTracking component
import ClaimTrackingPage from '../ClaimTracking/ClaimTracking'; // Import the ClaimTrackingPage component
import CourierPartnerPreferences from '../CourierPartner/CourierPartner'; // Import the CourierPartnerPreferences component

const ReturnsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortDuration, setSortDuration] = useState('last1Month');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');

  // Sample data for illustration (replace with real data)
  const data = [
    { id: '001', sku: 'ABC123', awb: 'AWB001' },
    { id: '002', sku: 'DEF456', awb: 'AWB002' },
    // Add more items as needed
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Simple search logic for illustration
    const results = data.filter(item =>
      item.id.includes(searchQuery) ||
      item.sku.includes(searchQuery) ||
      item.awb.includes(searchQuery)
    );
    setSearchResults(results);
  };

  const handleSortChange = (e) => {
    setSortDuration(e.target.value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedButton(''); // Reset selected button when closing popup
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className="page-container">
      <div className="left-side">
        <h1>Return/RTO Orders</h1>
      </div>
      <div className="right-side">
        <div className="header">
          <div className="header-left">
            <div className="youtube-logo"></div> {/* Ensure the logo class is applied */}
            <h2 className="how-it-works">How it works?</h2>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Order ID, SKU, or AWB number..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
           
          </div>
        </div>
        <div className="message-box">
          <p className="message-box-title">
            Choose your courier partner for customer returns now
          </p>
          <p>
            Starting 1st Jan 2023, your Customer Returns claims will be investigated and approved only by your courier partners.
          </p>
          <button className="open-partner-button">Open Courier Partner</button>
        </div>
        <div className="tabs">
          <div
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabClick('overview')}
          >
            Overview
          </div>
          <div
            className={`tab-button ${activeTab === 'returnTracking' ? 'active' : ''}`}
            onClick={() => handleTabClick('returnTracking')}
          >
            Return Tracking
          </div>
          <div
            className={`tab-button ${activeTab === 'claimTracking' ? 'active' : ''}`}
            onClick={() => handleTabClick('claimTracking')}
          >
            Claim Tracking
          </div>
          <div
            className={`tab-button ${activeTab === 'courierPartner' ? 'active' : ''}`}
            onClick={() => handleTabClick('courierPartner')}
          >
            Courier Partner
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="summary-section">
                <div className="summary-header">
                  <h3>Summary</h3>
                  <div className="sort-dropdown-container">
                    <select id="sort-by" value={sortDuration} onChange={handleSortChange}>
                      <option value="last1Month">Last 1 Month</option>
                      <option value="last3Months">Last 3 Months</option>
                      <option value="last6Months">Last 6 Months</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="view-trend-section">
                <button className="view-trend-button" onClick={openPopup}>
                  <span className="view-trend-icon"></span> View Trend
                </button>
                <div className="Sort">Sort by:</div>
              </div>
              <div className="product-performance">
                <h3>Product Performance</h3>
                {/* Placeholder for product performance content */}
              </div>
            </div>
          )}
          {activeTab === 'returnTracking' && <ReturnTracking />} {/* Use the ReturnTracking component here */}
          {activeTab === 'claimTracking' && <ClaimTrackingPage />} {/* Use the ClaimTrackingPage component here */}
          {activeTab === 'courierPartner' && <CourierPartnerPreferences />} {/* Use the CourierPartnerPreferences component here */}
        </div>
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="popup-close" onClick={closePopup}>✕</button>
              <h3>Returns Trend</h3>
              <p>Duration: {sortDuration === 'last1Month' ? 'Last 1 Month' : sortDuration === 'last3Months' ? 'Last 3 Months' : 'Last 6 Months'}</p>
              <div className="popup-buttons">
                <button className="popup-button" onClick={() => handleButtonClick('customerReturn')}>Customer Return</button>
                <button className="popup-button" onClick={() => handleButtonClick('courierReturn')}>Courier Return</button>
                <button className="popup-button" onClick={() => handleButtonClick('dualPricing')}>Dual Pricing</button>
              </div>
              {selectedButton && (
                <div className="no-data-message">
                  <p>No data as of now for {selectedButton.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((item, index) => (
                <li key={index}>
                  Order ID: {item.id}, SKU: {item.sku}, AWB: {item.awb}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
