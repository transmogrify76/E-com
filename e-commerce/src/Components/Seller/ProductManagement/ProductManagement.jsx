import React, { useState, useEffect } from 'react';
import './ProductManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categories: [],
    variants: []
  });

  // Fetch all products from the API
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Remove a product by ID
  const removeProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove product');
      }

      setProducts(products.filter(product => product.id !== id));
      setFilteredProducts(filteredProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
      setError("Failed to remove product");
    }
  };

  // Handle search by product ID
  const handleSearch = (event) => {
    setSearchId(event.target.value);
    if (event.target.value) {
      setFilteredProducts(products.filter(product => product.id === parseInt(event.target.value, 10)));
    } else {
      setFilteredProducts(products);
    }
  };

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();

      // Update the product list with the updated product
      setProducts(products.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      ));
      setFilteredProducts(filteredProducts.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      ));
      setEditingProduct(null); // Close the form
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        categories: [],
        variants: []
      });
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product");
    }
  };

  // Open edit form
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      categories: product.categories || [],
      variants: product.variants || []
    });
  };

  // Handle variant change
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      variants: updatedVariants
    }));
  };

  // Handle add new variant
  const handleAddVariant = () => {
    setFormData(prevState => ({
      ...prevState,
      variants: [...prevState.variants, { size: '', color: '', stock: '' }]
    }));
  };

  // Handle remove variant
  const handleRemoveVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      variants: updatedVariants
    }));
  };

  useEffect(() => {
    fetchAllProducts();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className='product-management'>
      <div className="header">
        <h1>Product Management</h1>
        <input 
          type="text" 
          placeholder="Search by Product ID" 
          value={searchId} 
          onChange={handleSearch} 
          className="search-input"
        />
      </div>
      
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {editingProduct && (
            <div className="edit-form">
              <h2>Edit Product</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </label>
                <label>
                  Description:
                  <input 
                    type="text" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                  />
                </label>
                <label>
                  Price (₹):
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                  />
                </label>
                <label>
                  Image URL:
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                  />
                </label>
                <label>
                  Categories (comma separated):
                  <input 
                    type="text" 
                    name="categories" 
                    value={formData.categories.join(', ')} 
                    onChange={(e) => setFormData(prevState => ({
                      ...prevState,
                      categories: e.target.value.split(',').map(cat => cat.trim())
                    }))} 
                  />
                </label>
                <div className="variant-section">
                  <h4>Product Variants</h4>
                  {formData.variants.map((variant, index) => (
                    <div key={index} className="variant-form">
                      <label>
                        Size:
                        <input
                          type="text"
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                        />
                      </label>
                      <label>
                        Color:
                        <input
                          type="text"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                        />
                      </label>
                      <label>
                        Stock:
                        <input
                          type="number"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                        />
                      </label>
                      <button type="button" onClick={() => handleRemoveVariant(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddVariant}>Add Variant</button>
                </div>
                <button type="submit">Update Product</button>
              </form>
            </div>
          )}

          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Categories</th>
                <th>Variants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img src={product.image || 'default-image-url'} alt={product.name} className="product-image" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>₹{product.price}</td>
                    <td>{product.categories ? product.categories.join(', ') : 'N/A'}</td>
                    <td>
                      {product.variants && product.variants.length > 0 ? (
                        <ul>
                          {product.variants.map((variant, index) => (
                            <li key={index}>
                              {variant.size} - {variant.color} - {variant.stock} in stock
                            </li>
                          ))}
                        </ul>
                      ) : 'No variants'}
                    </td>
                    <td>
                      <button 
                        className="edit-button"
                        onClick={() => handleEditClick(product)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => removeProduct(product.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No products available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductManagement;
