import React, { useState } from 'react';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';

const SellerPricingSection = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 2000.00, stock: 100, discount: 0, offer: '' },
    { id: 2, name: 'Product B', price: 1500.00, stock: 50, discount: 0, offer: '' },
  ]);
  const [competitorPrices, setCompetitorPrices] = useState([]);
  const [newPrice, setNewPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [newStock, setNewStock] = useState('');
  const [insightsData, setInsightsData] = useState([]);

  const updatePrice = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, price: parseFloat(newPrice) } : product
    ));
    setNewPrice('');
  };

  const updateStock = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, stock: parseInt(newStock) } : product
    ));
    setNewStock('');
  };

  const applyDiscount = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, discount: parseFloat(discountPercent) } : product
    ));
    setDiscountPercent('');
  };

  const applyOffer = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, offer: offerDescription } : product
    ));
    setOfferDescription('');
  };

  const addCompetitorPrice = (name, price) => {
    setCompetitorPrices(prev => [...prev, { name, price: parseFloat(price) }]);
  };

  const fetchInsights = () => {
    const totalProducts = products.length;
    const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
    const averagePrice = products.reduce((acc, product) => acc + product.price, 0) / totalProducts;
    const insights = [
      { strategy: 'Total Products', performance: totalProducts },
      { strategy: 'Total Stock', performance: totalStock },
      { strategy: 'Average Price', performance: `₹${averagePrice.toFixed(2)}` },
    ];
    setInsightsData(insights);
  };

  return (
    <div className="seller-pricing-section p-4">
      <h1 className="text-center">Seller Pricing Management</h1>

      <section className="product-listing">
        <h2>Product Listings</h2>
        <Table
          striped
          bordered
          hover
          style={{ width: '90%', margin: '0 auto', borderCollapse: 'collapse' }}
        >
          <thead style={{ backgroundColor: '#f8f9fa', height: '30px' }}>
            <tr>
              <th style={{ padding: '5px', fontSize: '14px', textAlign: 'left' }}>Product Name</th>
              <th style={{ padding: '5px', fontSize: '14px', textAlign: 'right' }}>Price (₹)</th>
              <th style={{ padding: '5px', fontSize: '14px', textAlign: 'right' }}>Discounted Price (₹)</th>
              <th style={{ padding: '5px', fontSize: '14px', textAlign: 'right' }}>Stock</th>
              <th style={{ padding: '5px', fontSize: '14px', textAlign: 'left' }}>Special Offer</th>
              <th style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td style={{ padding: '5px' }}>{product.name}</td>
                <td style={{ padding: '5px', textAlign: 'right' }}>₹{product.price.toFixed(2)}</td>
                <td style={{ padding: '5px', textAlign: 'right' }}>₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</td>
                <td style={{ padding: '5px', textAlign: 'center' }}>{product.stock}</td>
                <td style={{ padding: '5px' }}>{product.offer || 'None'}</td>
                <td style={{ padding: '5px', textAlign: 'center' }}>
                  <InputGroup className="mb-2" style={{ width: '200px' }}>
                    <FormControl
                      type="number"
                      placeholder="New Price"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      style={{ height: '30px', fontSize: '14px' }}
                    />
                    <Button variant="success" onClick={() => updatePrice(product.id)}>Update Price</Button>
                  </InputGroup>

                  {/* Gap between Update Price and Update Stock */}
                  <div style={{ marginBottom: '15px' }} /> {/* Gap added here */}

                  <InputGroup className="mb-2" style={{ width: '200px' }}>
                    <FormControl
                      type="number"
                      placeholder="New Stock"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      style={{ height: '30px', fontSize: '14px' }}
                    />
                    <Button variant="info" onClick={() => updateStock(product.id)}>Update Stock</Button>
                  </InputGroup>
                  <div style={{ marginBottom: '15px' }} /> {/* Gap added here */}


                  <InputGroup className="mb-2" style={{ width: '200px' }}>
                    <FormControl
                      type="number"
                      placeholder="Discount %"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      style={{ height: '30px', fontSize: '14px' }}
                    />
                    <Button variant="warning" onClick={() => applyDiscount(product.id)}>Apply Discount</Button>
                  </InputGroup>

                  <InputGroup className="mb-2" style={{ width: '200px' }}>
                    <FormControl
                      type="text"
                      placeholder="Special Offer"
                      value={offerDescription}
                      onChange={(e) => setOfferDescription(e.target.value)}
                      style={{ height: '30px', fontSize: '14px' }}
                    />
                    <Button variant="secondary" onClick={() => applyOffer(product.id)}>Add Offer</Button>
                  </InputGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="discounts-promotions">
        <h2>Discounts and Promotions</h2>
        <p>Manage discounts and promotional offers for your products.</p>
        <div className="discount-list">
          <h3>Current Discounts</h3>
          <ul>
            {products.filter(product => product.discount > 0).map(product => (
              <li key={product.id}>
                {product.name}: {product.discount}% off - Discounted Price: ₹{((product.price * (1 - product.discount / 100))).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="competitor-price-tracking">
        <h2>Competitor Price Tracking</h2>
        <p>Monitor competitor pricing for similar products.</p>
        <InputGroup className="mb-3" style={{ width: '300px', margin: '0 auto' }}>
          <FormControl
            type="text"
            placeholder="Competitor Name"
            id="competitorName"
            style={{ height: '30px', fontSize: '14px' }}
          />
          <FormControl
            type="number"
            placeholder="Competitor Price (₹)"
            id="competitorPrice"
            style={{ height: '30px', fontSize: '14px' }}
          />
          <Button variant="primary" onClick={() => {
            const name = document.getElementById('competitorName').value;
            const price = document.getElementById('competitorPrice').value;
            addCompetitorPrice(name, price);
            document.getElementById('competitorName').value = '';
            document.getElementById('competitorPrice').value = '';
          }}>
            Add Competitor Price
          </Button>
        </InputGroup>
        <ul>
          {competitorPrices.map((competitor, index) => (
            <li key={index}>{competitor.name}: ₹{competitor.price.toFixed(2)}</li>
          ))}
        </ul>
      </section>

      <section className="pricing-strategy-insights">
        <h2>Pricing Strategy Insights</h2>
        <p>View analytics on pricing strategies and sales performance.</p>
        <Button variant="primary" onClick={fetchInsights}>Fetch Insights</Button>
        <ul>
          {insightsData.map((insight, index) => (
            <li key={index}>{insight.strategy}: {insight.performance}</li>
          ))}
        </ul>
      </section>

      <section className="help-support">
        <h2>Help & Support</h2>
        <p>If you have any questions, please contact support.</p>
        <div className="support-contact">
          <p>Email: support@example.com</p>
          <p>Phone: 1-800-555-0199</p>
        </div>
      </section>
    </div>
  );
};

export default SellerPricingSection;
