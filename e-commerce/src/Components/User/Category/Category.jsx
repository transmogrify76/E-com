import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css'; // Your separate CSS file for styling

const CategorySelection = () => {
  const [categories, setCategories] = useState([]); // Store top-level categories
  const [expandedCategories, setExpandedCategories] = useState({}); // Store expanded child categories
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]); // Selected categories
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered category for hover effect
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering categories
  const [error, setError] = useState(''); // Error state for failed API calls

  // Fetch top-level categories when the component mounts
  useEffect(() => {
    fetchTopLevelCategories();
  }, []);

  // Fetch top-level categories
  const fetchTopLevelCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/top-level`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again later.');
    }
  };

  // Fetch child categories based on category name
  const fetchChildCategoriesByName = async (categoryName) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/subcategories/name/${categoryName}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subcategories for category "${categoryName}":`, error);
      return [];
    }
  };

  // Handle category selection
  const handleCategoryChange = (categoryName) => {
    setSelectedCategoryNames((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName) // Unselect category
        : [...prev, categoryName] // Select category
    );
  };

  // Toggle category visibility to show child categories
  const handleToggleCategory = async (categoryName) => {
    if (!expandedCategories[categoryName]) {
      const childCategories = await fetchChildCategoriesByName(categoryName);
      setExpandedCategories((prev) => ({
        ...prev,
        [categoryName]: childCategories, // Store child categories by parent name
      }));
    } else {
      setExpandedCategories((prev) => {
        const updated = { ...prev };
        delete updated[categoryName]; // Remove child categories if already expanded
        return updated;
      });
    }
  };

  // Clear all category selections
  const handleClearCategorySelection = () => {
    setSelectedCategoryNames([]); // Clear the selected categories list
  };

  // Filter categories based on search term - both top-level and child categories
  const filterCategories = (categories) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return categories.filter((category) => {
      // Check if category name matches search term
      if (category.toLowerCase().includes(lowercasedSearchTerm)) {
        return true;
      }

      // If the category has subcategories, check if any of the subcategories match the search term
      if (expandedCategories[category]) {
        const childMatch = expandedCategories[category].some((childCategory) =>
          childCategory.toLowerCase().includes(lowercasedSearchTerm)
        );
        return childMatch;
      }

      return false;
    });
  };

  // Render categories and subcategories recursively
  const renderCategories = (categoryList) => {
    return categoryList.map((categoryName) => (
      <div key={categoryName} className="category-item">
        <div className="category-name">
          <label
            htmlFor={`category-${categoryName}`}
            className="category-label"
            onClick={() => handleToggleCategory(categoryName)} // Toggle subcategories on click
          >
            {categoryName}
          </label>
        </div>
        {expandedCategories[categoryName] && (
          <div className="subcategory-container">
            {renderCategories(expandedCategories[categoryName])}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="category-selection-container">
      {error && <p className="error">{error}</p>}
      <h3>Search Categories</h3>
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      

      <div className="categories-list">
        {renderCategories(filterCategories(categories))}
      </div>
    </div>
  );
};

export default CategorySelection;


