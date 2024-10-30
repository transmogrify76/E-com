
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedChildCategoryId, setSelectedChildCategoryId] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            setError('Error fetching categories.');
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProductsByCategoryId = async (categoryId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/category/${categoryId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    const handleCategoryClick = (categoryId) => {
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);
            setProducts([]);
        } else {
            setSelectedCategoryId(categoryId);
            setSelectedChildCategoryId(null); // Reset child category selection
            fetchProductsByCategoryId(categoryId);
        }
    };

    const handleChildCategoryClick = (childCategoryId) => {
        if (selectedChildCategoryId === childCategoryId) {
            setSelectedChildCategoryId(null);
            setProducts([]);
        } else {
            setSelectedChildCategoryId(childCategoryId);
            fetchProductsByCategoryId(childCategoryId);
        }
    };

    const filteredCategories = searchTerm
        ? categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.childCategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : categories;

    return (
        <div className="categories-container">
            <h1>Categories</h1>
            {error && <p className="error">{error}</p>}

            <div className="search-group">
                <input
                    type="text"
                    placeholder="Search Categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <h2>Categories</h2>
            {loading ? (
                <p>Loading categories...</p>
            ) : (
                <div className="parent-categories">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <div key={category.id} className="category-item">
                                <div onClick={() => handleCategoryClick(category.id)}>
                                    {category.name}
                                </div>
                                {selectedCategoryId === category.id && category.childCategories && category.childCategories.length > 0 && (
                                    <div className="subcategories-dropdown">
                                        {category.childCategories.map(subCategory => (
                                            <div key={subCategory.id} className="subcategory-item">
                                                <div onClick={() => handleChildCategoryClick(subCategory.id)}>
                                                    {subCategory.name}
                                                </div>
                                                {selectedChildCategoryId === subCategory.id && subCategory.childCategories && subCategory.childCategories.length > 0 && (
                                                    <div className="nested-subcategories">
                                                        {subCategory.childCategories.map(nestedSubCategory => (
                                                            <div key={nestedSubCategory.id} className="nested-subcategory-item">
                                                                {nestedSubCategory.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No categories found.</p>
                    )}
                </div>
            )}

            {products.length > 0 && (
                <div className="products-container">
                    <h2>Products in Selected Category</h2>
                    <div className="products-list">
                        {products.map(product => (
                            <div key={product.id} className="product-item">
                                <img src={`${process.env.REACT_APP_BASE_URL}/products/images/product/${product.imageId}`} alt={product.name} />
                                <span>{product.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
