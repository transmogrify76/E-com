import React from 'react';
import ContactUs from '../Contact/Contact';
import FAQs from '../FAQ/FAQ';
import ReturnsAndExchanges from '../ReturnsandExchange/Return';
import './CustomerServicePage.css'; 
import SupportTicket from '../Support_Ticket/support';
// Make sure to create a CSS file for styling

const CustomerServicePage = () => {
  return (
    <div className="customer-service-page">
     
      <FAQs />
      <ReturnsAndExchanges />
      <SupportTicket/>
      <ContactUs />
    
    </div>
  );
}

export default CustomerServicePage;



