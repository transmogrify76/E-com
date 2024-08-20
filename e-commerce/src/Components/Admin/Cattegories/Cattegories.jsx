// AdminPanel.jsx
import React, { useState } from 'react';
import './Cattegories.css'; // Make sure to create and link this CSS file
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

const AdminPanel = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Men', parent: null, products: [] },
    { id: 2, name: 'Women', parent: null, products: [] },
    { id: 3, name: 'Kids', parent: null, products: [] },
    { id: 4, name: 'Tops', parent: 2, products: [] },
    { id: 5, name: 'Bottoms', parent: 2, products: [] },
    { id: 6, name: 'Shoes', parent: 2, products: [] },
    { id: 7, name: 'Accessories', parent: 2, products: [] },
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName) return;

    const newCategory = {
      id: categories.length + 1,
      name: newCategoryName,
      parent: null,
      products: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  const handleAddSubcategory = () => {
    if (!selectedCategory || !newSubcategoryName) return;

    const categoryId = Number(selectedCategory);
    const newSubcategory = {
      id: categories.length + 1,
      name: newSubcategoryName,
      parent: categoryId,
      products: [],
    };

    setCategories([...categories, newSubcategory]);
    setNewSubcategoryName('');
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
  };

  const renderCategories = () => {
    return categories.filter(category => !category.parent).map(category => (
      <div key={category.id} className="category">
        <div className="category-header">
          <span>{category.name}</span>
          <button onClick={() => handleDeleteCategory(category.id)} className="icon-button">
            <FaTrash />
          </button>
        </div>
        <div className="subcategories">
          {categories.filter(subcategory => subcategory.parent === category.id).map(subcategory => (
            <div key={subcategory.id} className="subcategory">
              <span>{subcategory.name}</span>
              <button onClick={() => handleDeleteCategory(subcategory.id)} className="icon-button">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="admin-panel-container">
      <h2>Category Management</h2>
      <div className="category-management">
        <h3>Add Category</h3>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="subcategory-management">
        <h3>Add Subcategory</h3>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.filter(category => !category.parent).map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter subcategory name"
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
        />
        <button onClick={handleAddSubcategory}>Add Subcategory</button>
      </div>
      <h3>Category Hierarchy</h3>
      {renderCategories()}
    </div>
  );
};

export default AdminPanel;
