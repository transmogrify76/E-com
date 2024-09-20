import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cattegories.css'; // Ensure this file exists
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import the edit and trash icons

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [newNestedSubcategoryName, setNewNestedSubcategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editingNestedSubcategory, setEditingNestedSubcategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');
  const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState('');
  const [updatedNestedSubcategoryName, setUpdatedNestedSubcategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    try {
      const response = await axios.post('http://localhost:5000/categories', {
        name: newCategoryName,
        parentId: null,
      });

      setCategories([...categories, response.data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddSubcategory = async () => {
    if (!selectedCategory || !newSubcategoryName) return;

    try {
      const response = await axios.post('http://localhost:5000/categories/subcategory', {
        name: newSubcategoryName,
        parentCategoryName: selectedCategory,
      });

      setCategories(prevCategories =>
        prevCategories.map(category =>
          category.name === selectedCategory
            ? { ...category, subcategories: [...(category.subcategories || []), response.data] }
            : category
        )
      );
      setNewSubcategoryName('');
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const handleAddNestedSubcategory = async () => {
    if (!selectedSubcategory || !newNestedSubcategoryName) return;

    try {
      const response = await axios.post('http://localhost:5000/categories/subcategory/nested', {
        name: newNestedSubcategoryName,
        parentSubcategoryName: selectedSubcategory,
      });

      setCategories(prevCategories =>
        prevCategories.map(category => ({
          ...category,
          subcategories: category.subcategories?.map(subcategory =>
            subcategory.name === selectedSubcategory
              ? { ...subcategory, subcategories: [...(subcategory.subcategories || []), response.data] }
              : subcategory
          )
        }))
      );
      setNewNestedSubcategoryName('');
    } catch (error) {
      console.error('Error adding nested subcategory:', error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !updatedCategoryName) return;

    try {
      await axios.patch(`http://localhost:5000/categories/${editingCategory}`, {
        name: updatedCategoryName,
      });

      setCategories(categories.map(category =>
        category.id === editingCategory ? { ...category, name: updatedCategoryName } : category
      ));
      setEditingCategory(null);
      setUpdatedCategoryName('');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleUpdateSubcategory = async () => {
    if (!editingSubcategory || !updatedSubcategoryName) return;

    try {
      await axios.patch(`http://localhost:5000/categories/subcategory/${editingSubcategory}`, {
        name: updatedSubcategoryName,
      });

      setCategories(categories.map(category => ({
        ...category,
        subcategories: category.subcategories?.map(subcategory =>
          subcategory.name === editingSubcategory ? { ...subcategory, name: updatedSubcategoryName } : subcategory
        )
      })));
      setEditingSubcategory(null);
      setUpdatedSubcategoryName('');
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  const handleUpdateNestedSubcategory = async () => {
    if (!editingNestedSubcategory || !updatedNestedSubcategoryName) return;

    try {
      await axios.patch(`http://localhost:5000/categories/subcategory/nested/${editingNestedSubcategory}`, {
        name: updatedNestedSubcategoryName,
      });

      setCategories(categories.map(category => ({
        ...category,
        subcategories: category.subcategories?.map(subcategory => ({
          ...subcategory,
          subcategories: subcategory.subcategories?.map(nestedSubcategory =>
            nestedSubcategory.name === editingNestedSubcategory ? { ...nestedSubcategory, name: updatedNestedSubcategoryName } : nestedSubcategory
          )
        }))
      })));
      setEditingNestedSubcategory(null);
      setUpdatedNestedSubcategoryName('');
    } catch (error) {
      console.error('Error updating nested subcategory:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteSubcategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/categories/subcategory/${name}`);
      setCategories(categories.map(category => ({
        ...category,
        subcategories: category.subcategories?.filter(subcategory => subcategory.name !== name)
      })));
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const handleDeleteNestedSubcategory = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/categories/subcategory/nested/${name}`);
      setCategories(categories.map(category => ({
        ...category,
        subcategories: category.subcategories?.map(subcategory => ({
          ...subcategory,
          subcategories: subcategory.subcategories?.filter(nestedSubcategory => nestedSubcategory.name !== name)
        }))
      })));
    } catch (error) {
      console.error('Error deleting nested subcategory:', error);
    }
  };

  const renderCategories = () => {
    return categories.filter(category => !category.parentId).map(category => (
      <div key={category.id} className="category-card" style={styles.categoryCard}>
        <div className="category-header" style={styles.header}>
          {editingCategory === category.id ? (
            <input
              type="text"
              value={updatedCategoryName}
              onChange={(e) => setUpdatedCategoryName(e.target.value)}
              placeholder="Update category name"
              style={styles.input}
            />
          ) : (
            <h4>{category.name}</h4>
          )}
          <div className="category-actions" style={styles.actions}>
            {editingCategory === category.id ? (
              <button onClick={handleUpdateCategory} className="btn btn-primary" style={styles.primaryButton}>Save</button>
            ) : (
              <button onClick={() => {
                setEditingCategory(category.id);
                setUpdatedCategoryName(category.name);
              }} className="btn btn-edit" style={styles.editButton}>
                <FaEdit />
              </button>
            )}
            <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-delete" style={styles.deleteButton}>
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="subcategory-list" style={styles.subcategoryList}>
          {category.subcategories && category.subcategories.map(subcategory => (
            <div key={subcategory.id} className="subcategory-card" style={styles.subcategoryCard}>
              <div className="subcategory-header" style={styles.subcategoryHeader}>
                {editingSubcategory === subcategory.name ? (
                  <input
                    type="text"
                    value={updatedSubcategoryName}
                    onChange={(e) => setUpdatedSubcategoryName(e.target.value)}
                    placeholder="Update subcategory name"
                    style={styles.input}
                  />
                ) : (
                  <span>{subcategory.name}</span>
                )}
                <div className="subcategory-actions" style={styles.actions}>
                  {editingSubcategory === subcategory.name ? (
                    <button onClick={handleUpdateSubcategory} className="btn btn-primary" style={styles.primaryButton}>Save</button>
                  ) : (
                    <button onClick={() => {
                      setEditingSubcategory(subcategory.name);
                      setUpdatedSubcategoryName(subcategory.name);
                    }} className="btn btn-edit" style={styles.editButton}>
                      <FaEdit />
                    </button>
                  )}
                  <button onClick={() => handleDeleteSubcategory(subcategory.name)} className="btn btn-delete" style={styles.deleteButton}>
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="nested-subcategory-list" style={styles.nestedSubcategoryList}>
                {subcategory.subcategories && subcategory.subcategories.map(nestedSubcategory => (
                  <div key={nestedSubcategory.id} className="nested-subcategory-card" style={styles.nestedSubcategoryCard}>
                    <div className="nested-subcategory-header" style={styles.nestedSubcategoryHeader}>
                      {editingNestedSubcategory === nestedSubcategory.name ? (
                        <input
                          type="text"
                          value={updatedNestedSubcategoryName}
                          onChange={(e) => setUpdatedNestedSubcategoryName(e.target.value)}
                          placeholder="Update nested subcategory name"
                          style={styles.input}
                        />
                      ) : (
                        <span>{nestedSubcategory.name}</span>
                      )}
                      <div className="nested-subcategory-actions" style={styles.actions}>
                        {editingNestedSubcategory === nestedSubcategory.name ? (
                          <button onClick={handleUpdateNestedSubcategory} className="btn btn-primary" style={styles.primaryButton}>Save</button>
                        ) : (
                          <button onClick={() => {
                            setEditingNestedSubcategory(nestedSubcategory.name);
                            setUpdatedNestedSubcategoryName(nestedSubcategory.name);
                          }} className="btn btn-edit" style={styles.editButton}>
                            <FaEdit />
                          </button>
                        )}
                        <button onClick={() => handleDeleteNestedSubcategory(nestedSubcategory.name)} className="btn btn-delete" style={styles.deleteButton}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="admin-panel-container" style={styles.container}>
      <h2 style={styles.headerText}>Category Management</h2>
      <div className="category-management" style={styles.managementSection}>
        <h3 style={styles.sectionHeader}>Add Category</h3>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddCategory} className="btn btn-primary" style={styles.primaryButton}>Add Category</button>
      </div>
      <div className="subcategory-management" style={styles.managementSection}>
        <h3 style={styles.sectionHeader}>Add Subcategory</h3>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          style={styles.select}
        >
          <option value="">Select Category</option>
          {categories.filter(category => !category.parentId).map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter subcategory name"
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          style={styles.input}
        />
        <button 
          onClick={handleAddSubcategory} 
          className="btn btn-primary" 
          style={styles.primaryButton}
        >
          Add Subcategory
        </button>
      </div>
      <div className="nested-subcategory-management" style={styles.managementSection}>
        <h3 style={styles.sectionHeader}>Add Nested Subcategory</h3>
        <select 
          value={selectedSubcategory} 
          onChange={(e) => setSelectedSubcategory(e.target.value)} 
          style={styles.select}
        >
          <option value="">Select Subcategory</option>
          {categories
            .flatMap(category => category.subcategories || [])
            .map(subcategory => (
              <option key={subcategory.id} value={subcategory.name}>{subcategory.name}</option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Enter nested subcategory name"
          value={newNestedSubcategoryName}
          onChange={(e) => setNewNestedSubcategoryName(e.target.value)}
          style={styles.input}
        />
        <button 
          onClick={handleAddNestedSubcategory} 
          className="btn btn-primary" 
          style={styles.primaryButton}
        >
          Add Nested Subcategory
        </button>
      </div>
      <h3 style={styles.sectionHeader}>Category Hierarchy</h3>
      {renderCategories()}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
  },
  headerText: {
    color: '#343a40',
    marginBottom: '20px',
  },
  managementSection: {
    marginBottom: '20px',
  },
  sectionHeader: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
  },
  primaryButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '10px',
    fontSize: '16px',
    color: '#007bff',
    backgroundColor: '#fff',
    border: '1px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '10px',
    fontSize: '16px',
    color: '#dc3545',
    backgroundColor: '#fff',
    border: '1px solid #dc3545',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  categoryCard: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  subcategoryList: {
    marginTop: '10px',
  },
  subcategoryCard: {
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ced4da',
    borderRadius: '4px',
  },
  subcategoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nestedSubcategoryList: {
    marginTop: '10px',
  },
  nestedSubcategoryCard: {
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#e9ecef',
    border: '1px solid #ced4da',
    borderRadius: '4px',
  },
  nestedSubcategoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default AdminPanel;
