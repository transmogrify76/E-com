import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Products.css'; // Adjust path as per your project structure

const AdminProducts = () => {
    // State to manage products and filtered products
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // State for managing filters
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        material: '',
        size: '',
        brand: ''
    });

    // Simulated API call to fetch products (useEffect simulates componentDidMount)
    useEffect(() => {
        // Replace with actual API call to fetch products
        const fetchProducts = async () => {
            try {
                // Example fetch call
                const response = await fetch('https://api.example.com/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products); // Assuming data contains array of products
                    setFilteredProducts(data.products); // Initialize filtered products with all products
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Update filtered products based on filters
    useEffect(() => {
        let filtered = products;

        // Apply filters
        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange.split('-');
            filtered = filtered.filter(product => product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice));
        }
        if (filters.material) {
            filtered = filtered.filter(product => product.material.toLowerCase().includes(filters.material.toLowerCase()));
        }
        if (filters.size) {
            filtered = filtered.filter(product => product.size.toLowerCase().includes(filters.size.toLowerCase()));
        }
        if (filters.brand) {
            filtered = filtered.filter(product => product.brand.toLowerCase().includes(filters.brand.toLowerCase()));
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters({ ...filters, [filterName]: value });
    };

    // Handle clear filters
    const clearFilters = () => {
        setFilters({
            category: '',
            priceRange: '',
            material: '',
            size: '',
            brand: ''
        });
    };

    // Delete product by ID
    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts); // Update filtered products after deletion
    };

    return (
        <div className="admin-products">
            <div className="filters">
                {/* Filter controls */}
                <h2>Filters</h2>
                <div className="filter-item">
                    <label>Category:</label>
                    <input
                        type="text"
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label>Price Range:</label>
                    <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    >
                        <option value="">Select price range</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-200">$100 - $200</option>
                        <option value="200+">$200+</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label>Material:</label>
                    <input
                        type="text"
                        value={filters.material}
                        onChange={(e) => handleFilterChange('material', e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label>Size:</label>
                    <input
                        type="text"
                        value={filters.size}
                        onChange={(e) => handleFilterChange('size', e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label>Brand:</label>
                    <input
                        type="text"
                        value={filters.brand}
                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                    />
                </div>
                <button onClick={clearFilters}>Clear Filters</button>
            </div>
            <div className="product-list">
                {/* Product list */}
                <h2>Product Inventory</h2>
                <div className="products">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div className="product-item" key={product.id}>
                                <h3>{product.name}</h3>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                                <p><strong>Material:</strong> {product.material}</p>
                                <p><strong>Size:</strong> {product.size}</p>
                                <p><strong>Brand:</strong> {product.brand}</p>
                                <div className="product-actions">
                                    {/* <button><FontAwesomeIcon icon={faEdit} /> Edit</button> */}
                                    <button onClick={() => handleDeleteProduct(product.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
