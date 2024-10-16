
import React, { useState } from 'react';
import './Pricing.css'; // Import CSS for styling


const PricingPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const Popup = ({ onClose }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-button" onClick={onClose}>×</button>
          <h2 className="popup-heading">Introducing Smart Price</h2>
          <div className="popup-underline"></div>
          <p className="popup-description">
            Smart Price helps you stay competitive by auto-updating your price based on competition and gain additional orders.
          </p>
          <h3 className="popup-subheading">How it works?</h3>
          <div className="popup-video">
            <video controls>
              <source src="path_to_your_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="popup-table-container">
            <h4 className="popup-table-heading">Benefits of Smart Price</h4>
            <table className="popup-table">
              <thead>
                <tr>
                  <th>Benefit</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Stay Competitive</td>
                  <td>Automate your pricing to keep up with market changes.</td>
                </tr>
                <tr>
                  <td>Gain Orders</td>
                  <td>Improve sales by adjusting prices based on competition.</td>
                </tr>
                <tr>
                  <td>Save Time</td>
                  <td>Eliminate manual price adjustments and save time.</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pricing-page">
      <section className="pricing-section">
        <div className="pricing-header">
          <h1>Pricing</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search by style, SKU, or catalog ID" />
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-left">
          {/* Content for info-left */}
        </div>
        <div className="info-right">
          <h2>Get rid of manual price updates, automate pricing to beat competition</h2>
          <p>Introducing Smart Price: Gain 10x growth with zero effort</p>
          <button className="know-more-button" onClick={handleOpenPopup}>
            Know More
          </button>
        </div>
      </section>

      <section className="overview-section">
  <h2 className="overview-heading">Overview</h2>
  <div className="overview-boxes">
    <div className="box price-health">
      <img src="path_to_your_image.jpg" alt="Price Health" />
      <div className="box-content">
      <div className="price-health-table">
          <table>
            <thead>
              <tr>
                <th>Insights</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Losing Orders</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Losing Views</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Best Priced</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="box growth">
  <div className="box-content">
    <h3>Growth</h3>
    <p>12th Aug’24 - 10th Sept’24</p>
    <div className="details">
      <div className="detail-item">
        <p>Price Updates</p>
        <p className="value">0</p>
      </div>
      <div className="detail-item">
        <p>Orders</p>
        <p className="value">0</p>
      </div>
      <div className="detail-item">
        <p>Sales</p>
        <p className="value">0</p>
      </div>
    </div>
    <p className="growth-summary">
      119,291 suppliers got 15% order growth in 30 days after reducing prices
    </p>
    <div className="drop-options">
      <label htmlFor="time-period"></label>
      <select id="time-period">
        <option >Last 30 days</option>
        <option>Last 7 days</option>
      </select>
    </div>
  </div>
</div>

  </div>
</section>


      {/* Buttons and Sort Options */}
      <section className="buttons-section">
        <div className="buttons-container">
          <button className="filter-button">All Products</button>
          <button className="filter-button">Losing Orders</button>
          <button className="filter-button">Losing Views</button>
          <button className="filter-button">Best Priced</button>
        </div>
        <div className="underline"></div>
        <div className="sort-options">
          <div className="sort-left">
            <label htmlFor="category">Category:</label>
            <select id="category">
              <option>No Categories Present</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="sort-right">
            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by">
              <option>High Estimated Orders</option>
              <option>Top Selling</option>
              <option>Low Selling</option>
            </select>
          </div>
        </div>
        <p className="no-best-price">Update your product price to make them best priced products</p>
      </section>

      {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default PricingPage;
