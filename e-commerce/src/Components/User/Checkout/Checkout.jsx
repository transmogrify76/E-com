import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { state } = useLocation(); // Get the state passed from the previous page
  const { cartItems } = state || {}; // Destructure cartItems passed from Product Details page
  const [updatedCartItems, setUpdatedCartItems] = useState(cartItems || []); // State for updated cart items
  const [shippingOption, setShippingOption] = useState('none'); // Default shipping option to 'none'
  const [localShippingCost, setLocalShippingCost] = useState(0); // Local shipping cost state
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [error, setError] = useState(null); // Error state
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  }); // State for user's main shipping information
  const [selectedAddress, setSelectedAddress] = useState(null); // Selected address for default
  const [shippingInfo, setShippingInfo] = useState({}); // State for shipping info form (edit on checkout)

  const navigate = useNavigate(); // For navigation
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from localStorage

  // Recalculate the total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    updatedCartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const subtotal = getTotalCartAmount(); // Get subtotal
  const totalWithShipping = subtotal + localShippingCost; // Calculate total with shipping

  // Handle shipping option change
  const handleShippingChange = (e) => {
    const selectedOption = e.target.value;
    setShippingOption(selectedOption);

    // Update shipping cost based on selection
    const newShippingCost = selectedOption === 'express' ? 100 : selectedOption === 'standard' ? 50 : 0;
    setLocalShippingCost(newShippingCost);
  };

  // Handle shipping information change
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    // When address changes, make the PATCH request to update the address
    if (name === 'address' && value !== userInfo.address) {
      handleUpdateAddress(value);
    }
  };

  // Handle address update via PATCH request
  const handleUpdateAddress = async (newAddress) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}/address/Home`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          address: newAddress, // The updated address
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating address: ${response.status} - ${errorText}`);
      }

      const updatedUserData = await response.json();

      // Update the address in the userInfo state
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        address: newAddress, // Set the new address to the state
      }));

      alert('Address updated successfully!');
    } catch (error) {
      setError(error.message);
      alert('Failed to update address');
      console.error('Error updating address:', error);
    }
  };

  // Fetch user data (address and other info)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || !accessToken) {
        console.error('User ID or access token not found');
        navigate('/login'); // Redirect to login if no user ID or token found
        return;
      }

      setLoading(true);
      try {
        // Fetch user's main info (name, email, phone, etc.)
        const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(`Error fetching user data: ${userResponse.status} - ${errorText}`);
        }

        const userData = await userResponse.json();
        setUserInfo({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phoneNumber || '',
          address: userData.address || '', // Add address from user data
        });

        // Fetch user's default address (no need to fetch other addresses)
        const addressResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}/address`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!addressResponse.ok) {
          const errorText = await addressResponse.text();
          throw new Error(`Error fetching address data: ${addressResponse.status} - ${errorText}`);
        }

        const addressData = await addressResponse.json();
        const defaultAddress = addressData.find((address) => address.defaultAddress);

        if (defaultAddress) {
          setSelectedAddress(defaultAddress); // Set default address to state
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            address: defaultAddress.address, // Populate address in userInfo
          }));
        }

        setLoading(false); // Data has been successfully fetched

      } catch (error) {
        setError(error.message);
        setLoading(false); // Data fetching has finished with an error
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, accessToken, navigate]);

  if (loading) return <p>Loading...</p>; // Show loading state while fetching

  if (error) return <p>Error: {error}</p>; // Show error message if something goes wrong

  // Validate if all required fields are filled
  const isFormValid = () => {
    return (
      userInfo.name &&
      userInfo.email &&
      userInfo.phone &&
      userInfo.address &&
      shippingOption !== 'none'
    );
  };

  // Proceed to payment page
  const handleProceedToPayment = () => {
    if (!isFormValid()) {
      alert('Please fill all the shipping information fields.');
      return;
    }

    // Pass cart items with their selected sizes, colors, and product ID to the payment page
    const cartItemsForPayment = updatedCartItems.map((item) => ({
      productId: item.product.id, // Pass product ID
      selectedSize: item.selectedSize, // Pass selected size
      selectedColor: item.selectedColor, // Pass selected color
      quantity: item.quantity,
      total: item.product.price * item.quantity,
    }));

    navigate('/payment', {
      state: {
        subtotal,
        localShippingCost,
        totalWithShipping,
        cartItems: cartItemsForPayment, // Pass updated cart items
        shippingInfo: shippingInfo, // Pass the shipping info
        userAddress: userInfo.address // Pass user address as part of the state
      },
    });
  };

  return (
    <div className="checkout-container">
      <div className="order-summary">
        <header>
          <h1>Proceed to Checkout</h1>
        </header>
        <section className="order-summary-table">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {updatedCartItems.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                updatedCartItems.map((item) => {
                  const { quantity, selectedSize, selectedColor } = item;
                  const product = item.product;
                  if (product && quantity > 0) {
                    return (
                      <tr key={product.id}>
                        <td>
                          <img src={product.image} alt={product.name} className="checkout-product-icon" />
                          {product.name}
                        </td>
                        <td>{item.product.productDetails.find(detail => detail.key === 'size')?.value}</td>
                        <td>{item.product.productDetails.find(detail => detail.key === 'color')?.value}</td>
                        <td>₹{product.price}</td>
                        <td>{quantity}</td>
                        <td>₹{product.price * quantity}</td>
                      </tr>
                    );
                  }
                  return null;
                })
              )}
            </tbody>
          </table>
        </section>

        <div className="checkout-grandtotal">
          <h3>Subtotal: ₹{subtotal}</h3>
          <h3>Shipping: ₹{localShippingCost}</h3>
          <h3>Total: ₹{totalWithShipping}</h3>
        </div>

        <button
          className="proceed-to-payment-button"
          onClick={handleProceedToPayment}
          disabled={!isFormValid()}
        >
          Proceed to Payment
        </button>
      </div>

      <div className="shipping-info">
        <h2>Shipping Information</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleShippingInfoChange}
            placeholder="Enter your name"
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleShippingInfoChange}
            placeholder="Enter your email"
            required
          />
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleShippingInfoChange}
            placeholder="Enter your phone number"
            required
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onClick={() => navigate('/account')} // Redirect to "My Account" page if no address selected
            placeholder="Enter your address"
            readOnly
          />
          <label>Shipping Method:</label>
          <div className="shipping-options">
            <label>
              <input
                type="radio"
                value="standard"
                checked={shippingOption === 'standard'}
                onChange={handleShippingChange}
              />
              Standard Shipping (₹50)
            </label>
            <label>
              <input
                type="radio"
                value="express"
                checked={shippingOption === 'express'}
                onChange={handleShippingChange}
              />
              Express Shipping (₹100)
            </label>
            <label>
              <input
                type="radio"
                value="none"
                checked={shippingOption === 'none'}
                onChange={handleShippingChange}
              />
              None
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
