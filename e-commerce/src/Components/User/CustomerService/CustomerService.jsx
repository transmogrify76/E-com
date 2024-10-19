import React from 'react';
import ContactUs from '../Contact/Contact';
import FAQs from '../FAQ/FAQ';
import ReturnsAndExchanges from '../ReturnsandExchange/Return';
import './CustomerServicePage.css'; 
// Make sure to create a CSS file for styling

const CustomerServicePage = () => {
  return (
    <div className="customer-service-page">
      <ContactUs />
      <FAQs />
      <ReturnsAndExchanges />
    
    </div>
  );
}

export default CustomerServicePage;
