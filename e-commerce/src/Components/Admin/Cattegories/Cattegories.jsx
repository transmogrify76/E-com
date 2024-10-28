
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AiOutlineDelete } from 'react-icons/ai'; // Importing the delete icon
// import './Cattegories.css';

// const Categories = () => {
//     const [categories, setCategories] = useState([]);
//     const [selectedParentCategory, setSelectedParentCategory] = useState('');
//     const [categoryName, setCategoryName] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

//     // Fetch all categories
//     const fetchCategories = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://localhost:5000/categories');
//             setCategories(response.data);
//         } catch (error) {
//             setError('Error fetching categories.');
//             console.error('Error fetching categories:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     // Handle adding a new category
//     const handleAddCategory = async () => {
//         if (!categoryName) {
//             setError('Category name is required.');
//             return;
//         }
//         try {
//             const payload = {
//                 name: categoryName,
//                 parentCategoryNames: selectedParentCategory ? [selectedParentCategory] : []
//             };
//             await axios.post('http://localhost:5000/categories', payload);
//             setCategoryName('');
//             setSelectedParentCategory('');
//             fetchCategories();
//             setError('');
//         } catch (error) {
//             setError('Error adding category.');
//             console.error('Error adding category:', error);
//         }
//     };

//     // Handle deleting a category by name
//     const handleDeleteCategoryByName = async (name) => {
//         try {
//             await axios.delete(`http://localhost:5000/categories/name/${name}`);
//             fetchCategories();
//             setError('');
//         } catch (error) {
//             setError('Error deleting category.');
//             console.error('Error deleting category:', error);
//         }
//     };

//     // Filter categories based on the search term
//     const filteredCategories = searchTerm
//         ? categories.filter(category =>
//             category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             category.childCategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         )
//         : categories;

//     return (
//         <div className="categories-container">
//             <h1>Categories Management</h1>
//             {error && <p className="error">{error}</p>}

//             {/* Select Parent Category */}
//             <div className="input-group">
//                 <select
//                     value={selectedParentCategory}
//                     onChange={(e) => setSelectedParentCategory(e.target.value)}
//                 >
//                     <option value="">Select Parent Category (Optional)</option>
//                     {categories.filter(cat => cat.parentCategories.length === 0).map(category => (
//                         <option key={category.id} value={category.name}>
//                             {category.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Add Category Name Form */}
//             <div className="input-group">
//                 <input
//                     type="text"
//                     placeholder="New Category Name"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                 />
//                 <button onClick={handleAddCategory}>Add Category</button>
//             </div>

//             {/* Search Functionality */}
//             <div className="search-group">
//                 <input
//                     type="text"
//                     placeholder="Search Categories..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             <h2>Categories</h2>
//             {loading ? (
//                 <p>Loading categories...</p>
//             ) : (
//                 <div className="parent-categories">
//                     {filteredCategories.length > 0 ? (
//                         filteredCategories.map((category) => (
//                             <div 
//                                 key={category.id} 
//                                 className="category-item"
//                                 onMouseEnter={() => setHoveredCategoryId(category.id)}
//                                 onMouseLeave={() => setHoveredCategoryId(null)}
//                             >
//                                 <div>
//                                     {category.name}
//                                     {/* Show delete icon only if searching for this category */}
//                                     {searchTerm && (
//                                         <button onClick={() => handleDeleteCategoryByName(category.name)} className="delete-button">
//                                             <AiOutlineDelete />
//                                         </button>
//                                     )}
//                                 </div>
//                                 {hoveredCategoryId === category.id && category.childCategories.length > 0 && (
//                                     <div className="subcategories-dropdown">
//                                         {category.childCategories.map(subCategory => (
//                                             <div key={subCategory.id} className="subcategory-item">
//                                                 <div>
//                                                     {subCategory.name}
//                                                     {/* Show delete icon only if searching for this subcategory */}
//                                                     {searchTerm && (
//                                                         <button onClick={() => handleDeleteCategoryByName(subCategory.name)} className="delete-button">
//                                                             <AiOutlineDelete />
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <p>No categories found.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Categories;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'; // Importing the delete and edit icons
import './Cattegories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedParentCategory, setSelectedParentCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null); // State for editing category
    const [newCategoryName, setNewCategoryName] = useState(''); // State for new category name during editing

    // Fetch all categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/categories');
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
                parentCategoryNames: selectedParentCategory ? [selectedParentCategory] : []
            };
            await axios.post('http://localhost:5000/categories', payload);
            setCategoryName('');
            setSelectedParentCategory('');
            fetchCategories();
            setError('');
        } catch (error) {
            setError('Error adding category.');
            console.error('Error adding category:', error);
        }
    };

    // Handle deleting a category by name
    const handleDeleteCategoryByName = async (name) => {
        try {
            await axios.delete(`http://localhost:5000/categories/name/${name}`);
            fetchCategories();
            setError('');
        } catch (error) {
            setError('Error deleting category.');
            console.error('Error deleting category:', error);
        }
    };

    // Handle setting the category name to search input
    const handleCategoryClick = (name) => {
        setSearchTerm(name);
    };

    // Handle editing a category
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.name); // Set the current name to the input
    };

    // Handle updating a category name
    const handleUpdateCategory = async () => {
        if (!newCategoryName) {
            setError('New category name is required.');
            return;
        }
        try {
            await axios.patch(`http://localhost:5000/categories/name/${editingCategory.name}`, { name: newCategoryName });
            setEditingCategory(null); // Clear editing state
            setNewCategoryName('');
            fetchCategories();
            setError('');
        } catch (error) {
            setError('Error updating category.');
            console.error('Error updating category:', error);
        }
    };

    // Filter categories based on the search term
    const filteredCategories = searchTerm
        ? categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.childCategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : categories;

    return (
        <div className="categories-container">
            <h1>Categories Management</h1>
            {error && <p className="error">{error}</p>}

            {/* Select Parent Category */}
            <div className="input-group">
                <select
                    value={selectedParentCategory}
                    onChange={(e) => setSelectedParentCategory(e.target.value)}
                >
                    <option value="">Select Parent Category (Optional)</option>
                    {categories.filter(cat => cat.parentCategories.length === 0).map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Add Category Name Form */}
            <div className="input-group">
                <input
                    type="text"
                    placeholder="New Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>

            {/* Search Functionality */}
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
                                    <span onClick={() => handleCategoryClick(category.name)}>{category.name}</span>
                                    {/* Show delete and edit icons */}
                                    <button onClick={() => handleDeleteCategoryByName(category.name)} className="delete-button">
                                        <AiOutlineDelete />
                                    </button>
                                    <button className="edit-button" onClick={() => handleEditCategory(category)}>
                                        <AiOutlineEdit />
                                    </button>
                                </div>
                                {hoveredCategoryId === category.id && category.childCategories.length > 0 && (
                                    <div className="subcategories-dropdown">
                                        {category.childCategories.map(subCategory => (
                                            <div key={subCategory.id} className="subcategory-item">
                                                <div>
                                                    <span onClick={() => handleCategoryClick(subCategory.name)}>{subCategory.name}</span>
                                                    {/* Show delete and edit icons for subcategories */}
                                                    <button onClick={() => handleDeleteCategoryByName(subCategory.name)} className="delete-button">
                                                        <AiOutlineDelete />
                                                    </button>
                                                    <button className="edit-button" onClick={() => handleEditCategory(subCategory)}>
                                                        <AiOutlineEdit />
                                                    </button>
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

            {/* Edit Category Form */}
            {editingCategory && (
                <div className="edit-category-form">
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Edit Category Name"
                    />
                    <button onClick={handleUpdateCategory}>Update Category</button>
                    <button onClick={() => setEditingCategory(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Categories;
