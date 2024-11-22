import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetail = () => {
  const { invoiceId } = useParams();  // Get the invoiceId from the URL
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${invoiceId}`);
        if (response.data) {
          setInvoice(response.data);
        }
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetail();
  }, [invoiceId]);

  if (loading) {
    return <div>Loading invoice...</div>;
  }

  return (
    <div className="invoice-detail-container">
      <h2>Invoice Details</h2>
      {invoice ? (
        <div>
          <p><strong>Invoice Number:</strong> {invoice.id}</p>
          <p><strong>Customer Name:</strong> {invoice.user?.name || 'N/A'}</p>
          <p><strong>Total Cost:</strong> ₹{invoice.totalOrderCost}</p>
          <h3>Ordered Items:</h3>
          <ul>
            {invoice.orderedItems.map((item, index) => (
              <li key={index}>
                Product ID: {item.productId}, Quantity: {item.quantity}, Price: ₹{item.priceAfterDiscount}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No details found for this invoice.</p>
      )}
    </div>
  );
};

export default InvoiceDetail;
