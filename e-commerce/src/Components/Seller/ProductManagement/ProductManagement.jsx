// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProductManagement.css'; // Include your styling

// const ProductManagement = () => {
//   // State variables
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [editProduct, setEditProduct] = useState(null);
//   const [newVariant, setNewVariant] = useState({ size: '', color: '', stock: '' });
//   const [showVariantForm, setShowVariantForm] = useState(false);
//   const [searchId, setSearchId] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/products');
//       setProducts(response.data);
//       setFilteredProducts(response.data); // Initialize filteredProducts with all products
//     } catch (err) {
//       console.error('Error fetching products:', err);
//       setError('Failed to fetch products. Please try again later.');
//     }
//   };

//   // Handle search by product ID
//   const handleSearch = () => {
//     if (searchId) {
//       const filtered = products.filter(product => product.id === parseInt(searchId, 10));
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//   };

//   // Handle product edit
//   const handleEditProduct = (product) => {
//     setEditProduct({ ...product });
//     setShowVariantForm(false);
//   };

//   // Save edited product
//   const handleSaveEditProduct = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/products/${editProduct.id}`, editProduct);
//       fetchProducts(); // Refresh product list
//       setEditProduct(null);
//       setShowVariantForm(false);
//     } catch (error) {
//       console.error('Error updating product:', error);
//       setError('Failed to update product. Please try again later.');
//     }
//   };

//   // Handle product deletion
//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`http://localhost:5000/products/${productId}`);
//         fetchProducts(); // Refresh product list
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         setError('Failed to delete product. Please try again later.');
//       }
//     }
//   };

//   // Add new variant
//   const handleAddVariant = () => {
//     if (editProduct) {
//       const updatedVariants = [...(editProduct.variants || []), newVariant];
//       setEditProduct({ ...editProduct, variants: updatedVariants });
//       setNewVariant({ size: '', color: '', stock: '' });
//       setShowVariantForm(false);
//     }
//   };

//   return (
//     <div className="product-management">
//       <h2>Product Management</h2>
//       {error && <p className="error-message">{error}</p>}

//       <div className="search-bar">
//         <input
//           type="text"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           placeholder="Search by Product ID"
//         />
//         <button onClick={handleSearch} className="action-button search">Search</button>
//       </div>

//       <div className="product-list">
//         <h3>Product Listing</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Categories</th>
//               <th>Variants</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map(product => (
//                 <tr key={product.id}>
//                   <td>{product.id}</td>
//                   <td>
//                     <img src={product.imageUrl || 'default-image-url'} alt={product.name} className="product-image" />
//                   </td>
//                   <td>{product.name}</td>
//                   <td>{product.description}</td>
//                   <td>{product.price}</td>
//                   <td>{product.categories ? product.categories.join(', ') : 'No categories'}</td>
                 
//                   <td>
//                     {product.variants && product.variants.length > 0 ? (
//                       product.variants.map((variant, index) => (
//                         <div key={index}>
//                           Size: {variant.size}, Color: {variant.color}, Stock: {variant.stock}
//                         </div>
//                       ))
//                     ) : (
//                       <p>No variants</p>
//                     )}
//                     <button
//                       onClick={() => {
//                         handleEditProduct(product);
//                         setShowVariantForm(true);
//                       }}
//                       className="action-button add-variant"
//                     >
//                       Add Variant
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleEditProduct(product)} className="action-button edit">Edit</button>
//                     <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="no-data">No products found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Product Dialog */}
//       {editProduct && (
//         <div className="dialogg openn">
//           <div className="dialogg-contentt">
//             <h3>Edit Product</h3>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 value={editProduct.name}
//                 onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
//               />
//             </label>
//             <label>
//               Description:
//               <textarea
//                 value={editProduct.description}
//                 onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
//               />
//             </label>
//             <label>
//               Price:
//               <input
//                 type="number"
//                 value={editProduct.price}
//                 onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
//               />
//             </label>
//             <label>
//               Categories:
//               <input
//                 type="text"
//                 value={editProduct.categories ? editProduct.categories.join(', ') : ''}
//                 onChange={(e) => setEditProduct({ ...editProduct, categories: e.target.value.split(',').map(cat => cat.trim()) })}
//               />
//             </label>
//             <label>
//               Image URL:
//               <input
//                 type="text"
//                 value={editProduct.imageUrl || ''}
//                 onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
//               />
//             </label>
//             <div>
//               <h4>Product Variants</h4>
//               {editProduct.variants && editProduct.variants.length > 0 ? (
//                 editProduct.variants.map((variant, index) => (
//                   <div key={index}>
//                     <label>
//                       Size:
//                       <input
//                         type="text"
//                         value={variant.size}
//                         onChange={(e) => {
//                           const newVariants = [...editProduct.variants];
//                           newVariants[index].size = e.target.value;
//                           setEditProduct({ ...editProduct, variants: newVariants });
//                         }}
//                       />
//                     </label>
//                     <label>
//                       Color:
//                       <input
//                         type="text"
//                         value={variant.color}
//                         onChange={(e) => {
//                           const newVariants = [...editProduct.variants];
//                           newVariants[index].color = e.target.value;
//                           setEditProduct({ ...editProduct, variants: newVariants });
//                         }}
//                       />
//                     </label>
//                     <label>
//                       Stock:
//                       <input
//                         type="number"
//                         value={variant.stock}
//                         onChange={(e) => {
//                           const newVariants = [...editProduct.variants];
//                           newVariants[index].stock = e.target.value;
//                           setEditProduct({ ...editProduct, variants: newVariants });
//                         }}
//                       />
//                     </label>
//                   </div>
//                 ))
//               ) : (
//                 <p>No variants</p>
//               )}
//             </div>
//             {showVariantForm && (
//               <div className="variant-formm">
//                 <h4>Add New Variant</h4>
//                 <label>
//                   Size:
//                   <input
//                     type="text"
//                     value={newVariant.size}
//                     onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
//                   />
//                 </label>
//                 <label>
//                   Color:
//                   <input
//                     type="text"
//                     value={newVariant.color}
//                     onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
//                   />
//                 </label>
//                 <label>
//                   Stock:
//                   <input
//                     type="number"
//                     value={newVariant.stock}
//                     onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
//                   />
//                 </label>
//                 <button onClick={handleAddVariant}>Add Variant</button>
//               </div>
//             )}
//             <button onClick={handleSaveEditProduct} className="action-button save">Save Changes</button>
//             <button onClick={() => setEditProduct(null)} className="action-button cancel">Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css'; // Include your styling
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductManagement = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formData, setFormData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filteredProducts with all products
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
      setLoading(false);
    }
  };

  // Handle search by product ID
  const handleSearch = () => {
    if (searchId) {
      const filtered = products.filter(product => product.id === parseInt(searchId, 10));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // Handle product edit
  const handleEditProduct = (product) => {
    setFormData({ ...product });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/products/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      setProducts(products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      ));
      setFilteredProducts(filteredProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      ));
      setFormData(null); // Close the form
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again later.');
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        setProducts(products.filter(product => product.id !== productId));
        setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Please try again later.');
      }
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="search-bar">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by Product ID"
        />
        <button onClick={handleSearch} className="action-button search">Search</button>
      </div>

      <div className="product-list">
        <h3>Product Listing</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img src={product.imageUrl || 'default-image-url'} alt={product.name} className="product-image" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product)} className="action-button edit">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete">
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {formData && (
        <div className="edit-form">
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input 
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleInputChange} 
              />
            </label>
            <label>
              Description:
              <input 
                type="text" 
                name="description" 
                value={formData.description || ''} 
                onChange={handleInputChange} 
              />
            </label>
            <label>
              Price (₹):
              <input 
                type="number" 
                name="price" 
                value={formData.price || ''} 
                onChange={handleInputChange} 
              />
            </label>
             {/* <label>
              Image URL:
              <input 
                type="text" 
                name="imageUrl" 
                value={formData.imageUrl || ''} 
                onChange={handleInputChange} 
              /> 
            </label> */}
            <button type="submit" className="action-button save">Save Changes</button>
            <button type="button" onClick={() => setFormData(null)} className="action-button cancel">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
