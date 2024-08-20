import React, { useState, useEffect } from 'react';
import './ProductManagement.css'; // Include your styling

const ProductManagement = () => {
  // Dummy data
  const initialProducts = [
    {
      id: 1,
      name: 'T-Shirt',
      description: 'A comfortable cotton T-shirt',
      price: 19.99,
      categories: ['Apparel', 'Men'],
      variants: [
        { size: 'S', color: 'Red', stock: 20 },
        { size: 'M', color: 'Blue', stock: 15 },
        { size: 'L', color: 'Green', stock: 10 }
      ]
    },
    {
      id: 2,
      name: 'Jeans',
      description: 'Stylish denim jeans',
      price: 49.99,
      categories: ['Apparel', 'Women'],
      variants: [
        { size: '28', color: 'Black', stock: 25 },
        { size: '30', color: 'Blue', stock: 30 }
      ]
    },
    {
      id: 3,
      name: 'Sneakers',
      description: 'Comfortable sports shoes',
      price: 89.99,
      categories: ['Footwear'],
      variants: [
        { size: '8', color: 'White', stock: 12 },
        { size: '9', color: 'Grey', stock: 18 }
      ]
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [editProduct, setEditProduct] = useState(null);
  const [newVariant, setNewVariant] = useState({ size: '', color: '', stock: '' });
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching products
    // fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditProduct({ ...product });
    setShowVariantForm(false); // Hide variant form when editing product
  };

  const handleSaveEditProduct = () => {
    try {
      // Simulate saving product
      const updatedProducts = products.map(product =>
        product.id === editProduct.id ? editProduct : product
      );
      setProducts(updatedProducts);
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again later.');
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Simulate deleting product
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Please try again later.');
      }
    }
  };

  const handleAddVariant = () => {
    if (editProduct) {
      const updatedVariants = [...editProduct.variants, newVariant];
      setEditProduct({ ...editProduct, variants: updatedVariants });
      setNewVariant({ size: '', color: '', stock: '' });
      setShowVariantForm(false);
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="product-list">
        <h3>Product Listing</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Categories</th>
              <th>Variants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.categories.join(', ')}</td>
                  <td>
                    {product.variants.map((variant, index) => (
                      <div key={index}>
                        Size: {variant.size}, Color: {variant.color}, Stock: {variant.stock}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        handleEditProduct(product);
                        setShowVariantForm(true);
                      }}
                      className="action-button add-variant"
                    >
                      Add Variant
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEditProduct(product)} className="action-button edit">Edit</button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Product Dialog */}
      {editProduct && (
        <div className="dialogg openn">
          <div className="dialogg-contentt">
            <h3>Edit Product</h3>
            <label>
              Name:
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              />
            </label>
            <label>
              Categories:
              <input
                type="text"
                value={editProduct.categories.join(', ')}
                onChange={(e) => setEditProduct({ ...editProduct, categories: e.target.value.split(',').map(cat => cat.trim()) })}
              />
            </label>
            <div>
              <h4>Product Variants</h4>
              {editProduct.variants.map((variant, index) => (
                <div key={index}>
                  <label>
                    Size:
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => {
                        const newVariants = [...editProduct.variants];
                        newVariants[index].size = e.target.value;
                        setEditProduct({ ...editProduct, variants: newVariants });
                      }}
                    />
                  </label>
                  <label>
                    Color:
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => {
                        const newVariants = [...editProduct.variants];
                        newVariants[index].color = e.target.value;
                        setEditProduct({ ...editProduct, variants: newVariants });
                      }}
                    />
                  </label>
                  <label>
                    Stock:
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => {
                        const newVariants = [...editProduct.variants];
                        newVariants[index].stock = e.target.value;
                        setEditProduct({ ...editProduct, variants: newVariants });
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
            {showVariantForm && (
              <div className="variant-formm">
                <h4>Add New Variant</h4>
                <label>
                  Size:
                  <input
                    type="text"
                    value={newVariant.size}
                    onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                  />
                </label>
                <label>
                  Color:
                  <input
                    type="text"
                    value={newVariant.color}
                    onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                  />
                </label>
                <label>
                  Stock:
                  <input
                    type="number"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                  />
                </label>
                <button onClick={handleAddVariant}>Add Variant</button>
              </div>
            )}
            <button onClick={handleSaveEditProduct} className="action-button save">Save Changes</button>
            <button onClick={() => setEditProduct(null)} className="action-button cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
