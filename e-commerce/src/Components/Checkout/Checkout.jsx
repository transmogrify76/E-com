import React from 'react';

import './Checkout.css'

const Checkout = () => {
    const handleClick = () => {
        // Redirect to /payment route
        window.location.href = '/payment';
      };

  return (
    <div className="checkout-container">
      <header>
        <h1>Proceed to Checkout</h1>

      </header>
      <main>
        <section className="order-summary">
          <h2>Order Summary</h2>
          {/* Cart items list - Dummy data */}
          <div className="cart-item">
            <div className="product-name">Product A</div>
            <div className="quantity">Quantity: 2</div>
            <div className="subtotal">Subtotal: $60.00</div>
          </div>
          <div className="cart-item">
            <div className="product-name">Product B</div>
            <div className="quantity">Quantity: 1</div>
            <div className="subtotal">Subtotal: $30.00</div>
          </div>
          {/* Total amount - Dummy data */}
          <div className="total">
            <div className="label">Total:</div>
            <div className="amount">$90.00</div>
          </div>
          {/* Promo code entry - Dummy data */}
          <div className="promo-code">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </div>
        </section>
        <section className="shipping-info">
          <h2>Shipping Information</h2>
          {/* Shipping address form - Dummy data */}
          <form>
            <label>Name:</label>
            <input type="text" placeholder="John Doe" />
            <label>Address:</label>
            <textarea placeholder="123 Street, City, Country" />
            <label>Email:</label>
            <input type="email" placeholder="example@example.com" />
            <label>Phone:</label>
            <input type="tel" placeholder="123-456-7890" />
          </form>
          {/* Shipping options - Dummy data */}
          <div className="shipping-options">
            <label>
              <input type="radio" name="shipping" value="standard" checked />
              Standard Shipping (+$5.00)
            </label>
            <label>
              <input type="radio" name="shipping" value="express" />
              Express Shipping (+$15.00)
            </label>
          </div>
        </section>

      </main>
      <button className="make-payment-button" onClick={handleClick}>
        Make Payment
      </button>

    </div>
  );
};

export default Checkout;
