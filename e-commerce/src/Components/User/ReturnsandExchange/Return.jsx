import React from 'react';
import './Return.css'; // Make sure to create a CSS file for styling

const ReturnsAndExchanges = () => {
  return (
    <div className="returns-exchanges">
      <h2>Returns and Exchanges</h2>
      <p>
        If you are not satisfied with your purchase, you may return the item within 30 days of receipt. 
        Please ensure the item is in its original condition and packaging. To initiate a return, please 
        contact our customer service or visit our Returns page.
      </p>
      <p>
        Exchanges are subject to availability. To request an exchange, please contact our customer 
        service with your order number and the item you wish to exchange.
      </p>
    </div>
  );
}

export default ReturnsAndExchanges;
