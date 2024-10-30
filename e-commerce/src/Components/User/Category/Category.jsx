import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMale, FaFemale, FaChild } from 'react-icons/fa';
import './Category.css'; // Import your CSS file

const DressCategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories
    axios.get(`${process.env.REACT_APP_BASE_URL}/categories`)
      .then(response => {
        console.log(response.data); // Check the structure and IDs here 
        setCategories(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dress-category-section">
      <h2 className="section-title">Categories</h2>
      <div className="category-list">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

// CategoryCard Component
const CategoryCard = ({ category }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [errorSubcategories, setErrorSubcategories] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showNestedSubcategories, setShowNestedSubcategories] = useState(null);

  const handleFetchSubcategories = () => {
    if (!showSubcategories) {
      setLoadingSubcategories(true);
      axios.get(`${process.env.REACT_APP_BASE_URL}/categories/subcategories/name/${encodeURIComponent(category.name)}`)
        .then(response => {
          console.log(response.data); // Check for unique IDs
          setSubcategories(response.data);
          setLoadingSubcategories(false);
          setShowSubcategories(true);
        })
        .catch(err => {
          setErrorSubcategories(err.message);
          setLoadingSubcategories(false);
        });
    } else {
      setShowSubcategories(false);
    }
  };

  const handleFetchNestedSubcategories = (subcategoryId) => {
    if (showNestedSubcategories === subcategoryId) {
      setShowNestedSubcategories(null);
      return;
    }

    setLoadingSubcategories(true); // Set loading state for nested products

    axios.get(`${process.env.REACT_APP_BASE_URL}/subcategories/${subcategoryId}/nested`)
      .then(response => {
        console.log(response.data); // Log nested products
        setSubcategories(prev =>
          prev.map(sub => sub.id === subcategoryId ? { ...sub, nestedProducts: response.data } : sub)
        );
        setShowNestedSubcategories(subcategoryId);
      })
      .catch(err => {
        console.error(`Error fetching nested subcategories for subcategory ${subcategoryId}:`, err.message);
      })
      .finally(() => {
        setLoadingSubcategories(false); // Clear loading state
      });
  };

  return (
    <div className="category-card">
      <div className="category-header" onClick={handleFetchSubcategories}>
        {category.name === 'Men' ? <FaMale className="category-icon" /> :
         category.name === 'Women' ? <FaFemale className="category-icon" /> :
         category.name === 'Kids' ? <FaChild className="category-icon" /> : null}
        <h3 className="category-title">{category.name}</h3>
      </div>
      {loadingSubcategories && <div>Loading subcategories...</div>}
      {errorSubcategories && <div>Error: {errorSubcategories}</div>}
      {showSubcategories && (
        <ul className="subcategory-list">
          {subcategories.map((subcategory, index) => (
            <li key={`${subcategory.id}-${index}`} className="subcategory-item">
              <div onClick={() => handleFetchNestedSubcategories(subcategory.id)}>
                <strong>{subcategory.name}</strong>
              </div>
              {showNestedSubcategories === subcategory.id && subcategory.nestedProducts && (
                <ul className="nested-subcategory-list">
                  {subcategory.nestedProducts.length > 0 ? (
                    subcategory.nestedProducts.map((product, prodIndex) => (
                      <li key={`${product.id}-${prodIndex}`} className="nested-subcategory-item">
                        <img src={product.imageUrl} alt={product.name} />
                        {product.name}
                      </li>
                    ))
                  ) : (
                    <li>No products available</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DressCategorySection;
