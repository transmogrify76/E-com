import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css'; // Import the CSS file for styling
import { FaMale, FaFemale, FaChild } from 'react-icons/fa'; // Import icons from react-icons

const DressCategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fetch subcategories when categories are available
  const fetchSubcategories = (categoryId) => {
    return axios.get(`http://localhost:5000/categories/${categoryId}/subcategories`)
      .then(response => response.data)
      .catch(err => {
        console.error(`Error fetching subcategories for category ${categoryId}:`, err.message);
        return [];
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dress-category-section">
      <h2 className="section-title">Categories</h2>
      <div className="category-list">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            fetchSubcategories={fetchSubcategories}
          />
        ))}
      </div>
    </div>
  );
};

// CategoryCard Component
const CategoryCard = ({ category, fetchSubcategories }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubcategories(category.id)
      .then(subcategories => {
        setSubcategories(subcategories);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [category.id, fetchSubcategories]);

  if (loading) return <div>Loading subcategories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-card">
      <div className="category-header">
        {category.name === 'Men' ? <FaMale className="category-icon" /> :
         category.name === 'Women' ? <FaFemale className="category-icon" /> :
         category.name === 'Kids' ? <FaChild className="category-icon" /> : null}
        <h3 className="category-title">{category.name}</h3>
      </div>
      <ul className="subcategory-list">
        {subcategories.map((subcategory) => (
          <li key={subcategory.id} className="subcategory-item">
            {subcategory.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DressCategorySection;

