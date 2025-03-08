import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import './Cattegories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

    // Fetch all categories from the API
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

    // Handle adding a new category
    const handleAddCategory = async () => {
        if (!categoryName) {
            setError('Category name is required.');
            return;
        }

        try {
            const payload = {
                name: categoryName,
                parentCategoryNames: selectedCategory ? [selectedCategory] : []
            };
            await axios.post(`${process.env.REACT_APP_BASE_URL}/categories`, payload);
            setCategoryName('');
            setSelectedCategory('');
            fetchCategories();
            setError('');
        } catch (error) {
            setError('Error adding category.');
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategoryByName = async (name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await axios.delete(`${process.env.REACT_APP_BASE_URL}/categories/name/${name}`);
                fetchCategories();
                setError('');
            } catch (error) {
                setError('Error deleting category.');
                console.error('Error deleting category:', error);
            }
        }
    };

    const filteredCategories = searchTerm
        ? categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.childCategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : categories;

    return (
        <div 
            className="categories-container" 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <h1>Categories Management</h1>
            {error && <p className="error">{error}</p>}

            <div className="input-group">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="New Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>

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
                            <div 
                                key={category.id} 
                                className="category-item"
                                onMouseEnter={() => setHoveredCategoryId(category.id)}
                                onMouseLeave={() => setHoveredCategoryId(null)}
                            >
                                <div>
                                    {category.name}
                                    {searchTerm && (
                                        <button onClick={() => handleDeleteCategoryByName(category.name)} className="delete-button">
                                            <AiOutlineDelete />
                                        </button>
                                    )}
                                </div>
                                {hoveredCategoryId === category.id && category.childCategories.length > 0 && (
                                    <div className="subcategories-dropdown">
                                        {category.childCategories.map(subCategory => (
                                            <div key={subCategory.id} className="subcategory-item">
                                                <div>
                                                    {subCategory.name}
                                                    {searchTerm && (
                                                        <button onClick={() => handleDeleteCategoryByName(subCategory.name)} className="delete-button">
                                                            <AiOutlineDelete />
                                                        </button>
                                                    )}
                                                </div>
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
        </div>
    );
};

export default Categories;
