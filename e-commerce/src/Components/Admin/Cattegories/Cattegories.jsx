

import React, { useState } from 'react';
import './Cattegories.css';

const AdminPanel = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Men', parent: null, products: ['Men Product 1', 'Men Product 2'] },
    { id: 2, name: 'Women', parent: null, products: ['Women Product 1', 'Women Product 2'] },
    { id: 3, name: 'Kids', parent: null, products: ['Kids Product 1', 'Kids Product 2'] },
    { id: 4, name: 'Tops', parent: 2, products: ['Top Product 1', 'Top Product 2'] },
    { id: 5, name: 'Bottoms', parent: 2, products: ['Bottom Product 1', 'Bottom Product 2'] },
    { id: 6, name: 'Shoes', parent: 2, products: ['Shoe Product 1', 'Shoe Product 2'] },
    { id: 7, name: 'Accessories', parent: 2, products: ['Accessory Product 1', 'Accessory Product 2'] },
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  const handleAddCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      name: newCategoryName,
      parent: null,
      products: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName(''); // Clear input after adding category
    console.log('Adding category:', newCategory);
  };

  const handleAddSubcategory = () => {
    const categoryId = Number(selectedCategory);
    if (!categoryId || newSubcategoryName.trim() === '') {
      return; // Ensure category and subcategory name are selected/entered
    }

    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        const updatedCategory = {
          ...category,
          products: [...category.products, `New ${newSubcategoryName} Product`],
        };
        return updatedCategory;
      }
      return category;
    });

    setCategories(updatedCategories);
    setNewSubcategoryName(''); // Clear input after adding subcategory
  };

  const getSubcategoryProducts = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.products : [];
  };

  const renderSubcategories = () => {
    return categories.filter(category => category.parent).map(category => (
      <div key={category.id}>
        <h3>{category.name}</h3>
        <ul>
          {getSubcategoryProducts(category.id).map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="admin-panel-container">
    
      <div className="admin-panel-content">
        <div className="category-management">
          <h2>Category Management - Add Category Form</h2>
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>
        <div className="subcategory-form">
          <h2>Subcategory Management - Add Subcategory Form</h2>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <label>Enter Subcategory Name:</label>
          <input
            type="text"
            placeholder="Enter subcategory name"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
          />
          <button onClick={handleAddSubcategory}>Add Subcategory</button>
        </div>
        <div className="category-hierarchy">
          <h2>Category Hierarchy</h2>
          <div className="parent-categories">
            <h3>Parent Categories</h3>
            <ul>
              {categories.filter(category => !category.parent).map(category => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>
          <div className="subcategories">
            <h3>Subcategories</h3>
            {renderSubcategories()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
