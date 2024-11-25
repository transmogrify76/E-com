// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './OrderIndividual.css'; // Import the CSS file

// const OrderIndividual = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [orderDetails, setOrderDetails] = useState(null);
//   const [shippingRequest, setShippingRequest] = useState(false);
//   const [shippingDetails, setShippingDetails] = useState({
//     productId: '',
//     productName: '',
//     quantity: '',
//     size: '',
//     stockPrice: '',
//     refundPolicy: '',
//     pickupAddress: '',
//     deliveryAddress: '',
//     landmark: '',
//     country: '',
//     state: '',
//     city: '',
//     pin: '',
//     productWeight: '',
//     courier: '',
//     trackingId: '',
//   });
//   const [selectedCourier, setSelectedCourier] = useState('');
//   const [generatedTrackingNumber, setGeneratedTrackingNumber] = useState('');
//   const [status, setStatus] = useState('');

//   const [productDetails, setProductDetails] = useState({});

//   const couriers = ['DHL', 'FedEx', 'UPS', 'India Post']; // List of courier partners

//   useEffect(() => {
//     // Fetch order details from the API
//     fetch(`http://localhost:5000/orders/${orderId}`)
//       .then(response => response.json())
//       .then(data => setOrderDetails(data))
//       .catch(error => console.error('Error fetching order details:', error));
//   }, [orderId]);

//   // Fetch product details based on the productId from the order
//   useEffect(() => {
//     if (orderDetails) {
//       orderDetails.orderedItems.forEach(item => {
//         fetch(`http://localhost:5000/products/${item.productId}`)
//           .then(response => response.json())
//           .then(data => {
//             setProductDetails(prevDetails => ({
//               ...prevDetails,
//               [item.productId]: data
//             }));
//           })
//           .catch(error => console.error('Error fetching product details:', error));
//       });
//     }
//   }, [orderDetails]);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails({
//       ...shippingDetails,
//       [name]: value
//     });
//   };

//   const handleCourierSelection = (e) => {
//     setSelectedCourier(e.target.value);
//   };

//   const handleConfirmSelection = () => {
//     const trackingNumber = `TRACK${Math.floor(Math.random() * 1000000)}`;
//     setGeneratedTrackingNumber(trackingNumber);
//     setShippingDetails({
//       ...shippingDetails,
//       courier: selectedCourier,
//       trackingId: trackingNumber
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedOrderDetails = {
//       ...orderDetails,
//       status: 'Shipped',
//       trackingNumber: generatedTrackingNumber
//     };

//     // Send PATCH request to update the order status to 'Shipped'
//     fetch(`http://localhost:5000/orders/${orderId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedOrderDetails)
//     })
//       .then(response => response.json())
//       .then(updatedOrder => {
//         setOrderDetails(updatedOrder);
//         setShippingRequest(true);
//         navigate('/Orderr');
//       })
//       .catch(error => console.error('Error updating order:', error));
//   };

//   if (!orderDetails) {
//     return <p>Loading order details...</p>;
//   }

//   return (
//     <div className="order-individual-container">
//       <h1>Order Details for Order ID: {orderId}</h1>
//       <p><strong>Purchase Date:</strong> {new Date(orderDetails.orderedAt).toLocaleString()}</p>
//       <p><strong>Customer Name:</strong> {orderDetails.user.name}</p>
//       <p><strong>Total Cost:</strong> {formatCurrency(orderDetails.totalOrderCost)}</p>
//       <p><strong>Status:</strong> {orderDetails.orderingStatus}</p>
//       <p><strong>Payment Status:</strong> {orderDetails.paymentStatus ? 'Paid' : 'Pending'}</p>
//       <p><strong>Shipment Status:</strong> {orderDetails.shipmentStatus}</p>
//       <p><strong>Refund Status:</strong> {orderDetails.refundStatus}</p>

//       {/* Map over ordered items */}
//       <h2>Items:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Color</th>
//             <th>Size</th>
//             <th>Quantity</th>
//             <th>Price After Discount</th>
//             <th>Total Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.orderedItems.map((item) => {
//             const product = productDetails[item.productId] || {}; // Get product details by productId
//             const { name, productDetails: details = [] } = product;
//             const color = details.find(d => d.key === 'color')?.value || 'N/A';
//             const size = details.find(d => d.key === 'size')?.value || 'N/A';

//             return (
//               <tr key={item.productId}>
//                 <td>{item.productId}</td>
//                 <td>{name || 'Loading...'}</td>
//                 <td>{color}</td>
//                 <td>{size}</td>
//                 <td>{item.quantity}</td>
//                 <td>{formatCurrency(item.priceAfterDiscount)}</td>
//                 <td>{formatCurrency(item.priceAfterDiscount * item.quantity)}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {orderDetails.orderingStatus === 'Pending' && (
//         <>
//           {!shippingRequest ? (
//             <div>
//               <h2>Create Shipping Request</h2>
//               <form onSubmit={handleSubmit}>
//                 <fieldset>
//                   <legend>Product Details</legend>
//                   <label>
//                     Product ID:
//                     <input
//                       type="text"
//                       name="productId"
//                       value={shippingDetails.productId}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </label>
//                   <label>
//                     Product Name:
//                     <input
//                       type="text"
//                       name="productName"
//                       value={shippingDetails.productName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </label>
//                   <label>
//                     Quantity:
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={shippingDetails.quantity}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </label>
//                 </fieldset>
//                 <fieldset>
//                   <legend>Courier Details</legend>
//                   <label>
//                     Courier Partner:
//                     <select value={selectedCourier} onChange={handleCourierSelection} required>
//                       <option value="">Select a courier</option>
//                       {couriers.map((courier, index) => (
//                         <option key={index} value={courier}>{courier}</option>
//                       ))}
//                     </select>
//                   </label>
//                   <button type="button" onClick={handleConfirmSelection}>Confirm Selection</button>
//                   <label>
//                     Tracking ID:
//                     <input
//                       type="text"
//                       name="trackingId"
//                       value={generatedTrackingNumber}
//                       readOnly
//                     />
//                   </label>
//                 </fieldset>
//                 <button type="submit">Submit Shipping Request</button>
//               </form>
//             </div>
//           ) : (
//             <p>Shipping request has been created for this order.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default OrderIndividual;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderIndividual.css'; // Import the CSS file

const OrderIndividual = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingRequest, setShippingRequest] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    productId: '',
    productName: '',
    quantity: '',
    size: '',
    stockPrice: '',
    refundPolicy: '',
    pickupAddress: '',
    deliveryAddress: '',
    landmark: '',
    country: '',
    state: '',
    city: '',
    pin: '',
    productWeight: '',
    courier: '',
    trackingId: '',
  });
  const [selectedCourier, setSelectedCourier] = useState('');
  const [generatedTrackingNumber, setGeneratedTrackingNumber] = useState('');
  const [status, setStatus] = useState('');
  const [shipmentStatus, setShipmentStatus] = useState('');  // New state for shipment status

  const [productDetails, setProductDetails] = useState({});

  const couriers = ['DHL', 'FedEx', 'UPS', 'India Post']; // List of courier partners

  useEffect(() => {
    // Fetch order details from the API
    fetch(`http://localhost:5000/orders/${orderId}`)
      .then(response => response.json())
      .then(data => {
        setOrderDetails(data);
        setShipmentStatus(data.shipmentStatus || '');  // Initialize the shipment status
      })
      .catch(error => console.error('Error fetching order details:', error));
  }, [orderId]);

  // Fetch product details based on the productId from the order
  useEffect(() => {
    if (orderDetails) {
      orderDetails.orderedItems.forEach(item => {
        fetch(`http://localhost:5000/products/${item.productId}`)
          .then(response => response.json())
          .then(data => {
            setProductDetails(prevDetails => ({
              ...prevDetails,
              [item.productId]: data
            }));
          })
          .catch(error => console.error('Error fetching product details:', error));
      });
    }
  }, [orderDetails]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value
    });
  };

  const handleCourierSelection = (e) => {
    setSelectedCourier(e.target.value);
  };

  const handleConfirmSelection = () => {
    const trackingNumber = `TRACK${Math.floor(Math.random() * 1000000)}`;
    setGeneratedTrackingNumber(trackingNumber);
    setShippingDetails({
      ...shippingDetails,
      courier: selectedCourier,
      trackingId: trackingNumber
    });
  };

  const handleShipmentStatusChange = (e) => {
    const newStatus = e.target.value;
    setShipmentStatus(newStatus);

    // Send PATCH request to update the shipment status
    fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...orderDetails,
        shipmentStatus: newStatus
      })
    })
      .then(response => response.json())
      .then(updatedOrder => {
        setOrderDetails(updatedOrder);
        console.log('Shipment status updated');
      })
      .catch(error => console.error('Error updating shipment status:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrderDetails = {
      ...orderDetails,
      status: 'Shipped',
      trackingNumber: generatedTrackingNumber
    };

    // Send PATCH request to update the order status to 'Shipped'
    fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedOrderDetails)
    })
      .then(response => response.json())
      .then(updatedOrder => {
        setOrderDetails(updatedOrder);
        setShippingRequest(true);
        navigate('/Orderr');
      })
      .catch(error => console.error('Error updating order:', error));
  };

  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="order-individual-container">
      <h1>Order Details for Order ID: {orderId}</h1>
      <p><strong>Purchase Date:</strong> {new Date(orderDetails.orderedAt).toLocaleString()}</p>
      <p><strong>Customer Name:</strong> {orderDetails.user.name}</p>
      <p><strong>Total Cost:</strong> {formatCurrency(orderDetails.totalOrderCost)}</p>
      <p><strong>Status:</strong> {orderDetails.orderingStatus}</p>
      <p><strong>Payment Status:</strong> {orderDetails.paymentStatus ? 'Paid' : 'Pending'}</p>
      <p><strong>Shipment Status:</strong> {shipmentStatus}</p>

      {/* Shipment Status Update Dropdown */}
      {orderDetails.orderingStatus === 'Pending' && (
        <div>
          <label>
            Update Shipment Status:
            <select value={shipmentStatus} onChange={handleShipmentStatusChange} required>
              <option value="">Select a status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </label>
        </div>
      )}

      {/* Map over ordered items */}
      <h2>Items:</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price After Discount</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.orderedItems.map((item) => {
            const product = productDetails[item.productId] || {}; // Get product details by productId
            const { name, productDetails: details = [] } = product;
            const color = details.find(d => d.key === 'color')?.value || 'N/A';
            const size = details.find(d => d.key === 'size')?.value || 'N/A';

            return (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{name || 'Loading...'}</td>
                <td>{color}</td>
                <td>{size}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.priceAfterDiscount)}</td>
                <td>{formatCurrency(item.priceAfterDiscount * item.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {orderDetails.orderingStatus === 'Pending' && (
        <>
          {!shippingRequest ? (
            <div>
              <h2>Create Shipping Request</h2>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Product Details</legend>
                  <label>
                    Product ID:
                    <input
                      type="text"
                      name="productId"
                      value={shippingDetails.productId}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Product Name:
                    <input
                      type="text"
                      name="productName"
                      value={shippingDetails.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      name="quantity"
                      value={shippingDetails.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Courier Details</legend>
                  <label>
                    Courier Partner:
                    <select value={selectedCourier} onChange={handleCourierSelection} required>
                      <option value="">Select a courier</option>
                      {couriers.map((courier, index) => (
                        <option key={index} value={courier}>{courier}</option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={handleConfirmSelection}>Confirm Selection</button>
                  <label>
                    Tracking ID:
                    <input
                      type="text"
                      name="trackingId"
                      value={generatedTrackingNumber}
                      readOnly
                    />
                  </label>
                </fieldset>
                <button type="submit">Submit Shipping Request</button>
              </form>
            </div>
          ) : (
            <p>Shipping request has been created for this order.</p>
          )}
        </>
      )}
    </div>
  );
};

export default OrderIndividual;