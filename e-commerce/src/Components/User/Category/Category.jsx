// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Category.css'; // Your separate CSS file for styling

// const CategorySelection = () => {
//   const [categories, setCategories] = useState([]); // Store top-level categories
//   const [expandedCategories, setExpandedCategories] = useState({}); // Store expanded child categories
//   const [selectedCategoryNames, setSelectedCategoryNames] = useState([]); // Selected categories
//   const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered category for hover effect
//   const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering categories
//   const [error, setError] = useState(''); // Error state for failed API calls

//   // Fetch top-level categories when the component mounts
//   useEffect(() => {
//     fetchTopLevelCategories();
//   }, []);

//   // Fetch top-level categories
//   const fetchTopLevelCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/top-level`);
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setError('Failed to fetch categories. Please try again later.');
//     }
//   };

//   // Fetch child categories based on category name
//   const fetchChildCategoriesByName = async (categoryName) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/subcategories/name/${categoryName}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching subcategories for category "${categoryName}":`, error);
//       return [];
//     }
//   };

//   // Handle category selection
//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategoryNames((prev) =>
//       prev.includes(categoryName)
//         ? prev.filter((name) => name !== categoryName) // Unselect category
//         : [...prev, categoryName] // Select category
//     );
//   };

//   // Toggle category visibility to show child categories
//   const handleToggleCategory = async (categoryName) => {
//     if (!expandedCategories[categoryName]) {
//       const childCategories = await fetchChildCategoriesByName(categoryName);
//       setExpandedCategories((prev) => ({
//         ...prev,
//         [categoryName]: childCategories, // Store child categories by parent name
//       }));
//     } else {
//       setExpandedCategories((prev) => {
//         const updated = { ...prev };
//         delete updated[categoryName]; // Remove child categories if already expanded
//         return updated;
//       });
//     }
//   };

//   // Clear all category selections
//   const handleClearCategorySelection = () => {
//     setSelectedCategoryNames([]); // Clear the selected categories list
//   };

//   // Filter categories based on search term - both top-level and child categories
//   const filterCategories = (categories) => {
//     const lowercasedSearchTerm = searchTerm.toLowerCase();

//     return categories.filter((category) => {
//       // Check if category name matches search term
//       if (category.toLowerCase().includes(lowercasedSearchTerm)) {
//         return true;
//       }

//       // If the category has subcategories, check if any of the subcategories match the search term
//       if (expandedCategories[category]) {
//         const childMatch = expandedCategories[category].some((childCategory) =>
//           childCategory.toLowerCase().includes(lowercasedSearchTerm)
//         );
//         return childMatch;
//       }

//       return false;
//     });
//   };

//   // Render categories and subcategories recursively
//   const renderCategories = (categoryList) => {
//     return categoryList.map((categoryName) => (
//       <div key={categoryName} className="category-item">
//         <div className="category-name">
//           <label
//             htmlFor={`category-${categoryName}`}
//             className="category-label"
//             onClick={() => handleToggleCategory(categoryName)} // Toggle subcategories on click
//           >
//             {categoryName}
//           </label>
//         </div>
//         {expandedCategories[categoryName] && (
//           <div className="subcategory-container">
//             {renderCategories(expandedCategories[categoryName])}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className="category-selection-container">
//       {error && <p className="error">{error}</p>}
//       <h3>Search Categories</h3>
//       <input
//         type="text"
//         placeholder="Search categories..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="search-input"
//       />

      

//       <div className="categories-list">
//         {renderCategories(filterCategories(categories))}
//       </div>
//     </div>
//   );
// };

// export default CategorySelection;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For category page redirection
import './Category.css'; // Your separate CSS file for styling

const CategorySelection = () => {
  const [categories, setCategories] = useState([]); // Store top-level categories
  const [expandedCategories, setExpandedCategories] = useState({}); // Store expanded child categories
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]); // Selected categories
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered category
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering categories
  const [error, setError] = useState(''); // Error state for failed API calls
  const navigate = useNavigate(); // For redirection

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

  // Handle hover effect to show subcategories on the right side
  const handleMouseEnterCategory = async (categoryName) => {
    setHoveredCategory(categoryName);
    if (!expandedCategories[categoryName]) {
      const childCategories = await fetchChildCategoriesByName(categoryName);
      setExpandedCategories((prev) => ({
        ...prev,
        [categoryName]: childCategories,
      }));
    }
  };

  // Handle mouse leave to reset hovered category
  const handleMouseLeaveCategory = () => {
    setHoveredCategory(null);
  };

  // Handle category redirection on click
  const handleCategoryRedirect = (categoryName) => {
    // Use the category name to form a dynamic URL like `/mens`, `/clothing`, etc.
    navigate(`/category/${categoryName}`);
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
      <div
        key={categoryName}
        className="category-item"
        onMouseEnter={() => handleMouseEnterCategory(categoryName)} // Show subcategories on hover
        onMouseLeave={handleMouseLeaveCategory} // Hide subcategories when mouse leaves
      >
        <div className="category-name">
          <label
            htmlFor={`category-${categoryName}`}
            className="category-label"
            onClick={() => handleCategoryRedirect(categoryName)} // Redirect to category page on click
          >
            {categoryName}
          </label>
        </div>
        {expandedCategories[categoryName] && hoveredCategory === categoryName && (
          <div className="subcategory-container">
            {expandedCategories[categoryName].map((subcategory) => (
              <div
                key={subcategory}
                className="subcategory-item"
                onClick={() => handleCategoryRedirect(subcategory)} // Redirect to subcategory page on click
              >
                {subcategory}
              </div>
            ))}
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

      <div className="subcategory-display">
        {hoveredCategory && expandedCategories[hoveredCategory] && (
          <div className="subcategory-container">
            {expandedCategories[hoveredCategory].map((subcategory) => (
              <div
                key={subcategory}
                className="subcategory-item"
                onClick={() => handleCategoryRedirect(subcategory)} // Redirect to subcategory page on click
              >
                {subcategory}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelection;
