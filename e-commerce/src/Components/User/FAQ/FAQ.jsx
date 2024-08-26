import React from 'react';
import './FAQ.css'; // Make sure to create a CSS file for styling

const FAQs = () => {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order using the tracking number provided in the confirmation email."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Please visit our Returns and Exchanges page for more details."
    },
    {
      question: "How can I change my shipping address?",
      answer: "You can change your shipping address by contacting our customer service before the order is shipped."
    }
  ];

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
