import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import './Category.css'; // Import the CSS file for styling
import {
  FaDesktop, FaHome, FaPaintBrush, FaCar, FaBaby, FaHeartbeat, FaToolbox, FaGamepad, FaVideo,
  FaMale, FaFemale, FaChild, FaLaptop, FaTv, FaCat, FaHiking, FaCouch, FaIndustry, FaSuitcase, FaPlug, FaTshirt
}  from 'react-icons/fa';
// Import relevant icons from react-icons

const DressCategorySection = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock departments data
    setDepartments([
     'Electronics', 'Computers', 'Smart Home', 'Arts & Crafts', 'Automotive', 'Baby',
      'Beauty and Personal Care', 'Fashion', 'Health and Household', 'Home and Kitchen',
      'Industrial and Scientific', 'Luggage', 'Movies & Television', 'Pet Supplies', 
      'Software', 'Sports and Outdoors', 'Tools & Home Improvement', 'Toys and Games', 
      'Video Games'
    ]);
  }, []);

  // Mock subcategories data
  const mockData = {
    'Electronics': [
      'Accessories & Supplies',
      'Camera & Photo',
      'Car & Vehicle Electronics',
      'Cell Phones & Accessories',
      'Computers & Accessories',
      'GPS & Navigation',
      'Headphones',
      'Home Audio',
      'Office Electronics',
      'Portable Audio & Video'
    ],

    'Computers': [
      'Computer Accessories & Peripherals',
      'Computer Components',
      'Computers & Tablets',
      'Data Storage'
    ],

    'Smart Home': [
      'Amazon Smart Home',
      'Works with Alexa Devices',
      'Smart Home Lighting',
      'Smart Locks and Entry'
    ],

    'Arts & Crafts': [
      'Painting, Drawing & Art Supplies',
      'Beading & Jewelry Making',
      'Crafting',
      'Fabric'
    ],

    'Automotive': [
      'Car Care',
      'Car Electronics & Accessories',
      'Exterior Accessories',
      'Interior Accessories'
    ],


    'Baby': [
      'Activity & Entertainment',
      'Apparel & Accessories',
      'Baby & Toddler Toys',
      'Baby Care',
      'Baby Stationery'
    ],

    'Beauty and Personal Care': [
      'Makeup',
      'Skin Care',
      'Hair Care',
      'Fragrance',
      'Foot, Hand & Nail Care'
    ],

    'Fashion': [
      'Men', 
      'Women', 
      'Kids', 
      'Girls'
    ],  // New Fashion subcategories


    'Health and Household': [
      'Baby & Child Care',
      'Health Care',
      'Household Supplies',
      'Medical Supplies & Equipment',
      'Oral Care'
    ],


    'Home and Kitchen': [
      'Kids Home Store',
      'Kitchen & Dining',
      'Bedding',
      'Bath',
      'Furniture'
    ],

    'Industrial and Scientific': [
      'Abrasive & Finishing Products',
      'Additive Manufacturing Products',
      'Commercial Door Products',
      'Cutting Tools',
      'Fasteners'
    ],

    'Luggage': [
      'Carry-ons',
      'Backpacks',
      'Garment bags',
      'Travel Totes'
    ],

    'Movies & Television': [
      'Movies',
      'TV Shows',
      'Blu-ray',
      '4K Ultra HD'
    ],

    'Pet supplies': [
      'Dogs',
      'Cats',
      'Fish & Aquatic Pet',
      'Birds',
      'Horses'
    ],

    'Software': [
      'Accounting & Finance',
      'Antivirus & Security',
      'Business & Office',
      'Childrens',
      'Design & Illustration'
    ],

    'Sports and Outdoors': [
      'Sports and Outdoors',
      'Outdoor Recreation',
      'Sports & Fitness'
    ],

    'Tools & Home Improvement': [
      'Tools & Home Improvement',
      'Appliances',
      'Building Supplies',
      'Electrical',
      'Hardware',
      'Kitchen & Bath Fixtures'
    ],

    'Toys and Games': [
      'Action Figures & Statues',
      'Arts & Crafts',
      'Baby & Toddler Toys',
      'Building Toys'
    ],

    'Video Games': [
      'Video Games',
      'PlayStation 4',
      'PlayStation 3',
      'Xbox One',
      'Xbox 360'
    ],

    'Women Fashion':[
      'Clothing', 
      'Shoes', 
      'Jewelry', 
      'Watches', 
      'Handbags', 
      'Accessories'
    ],

    'Men\'s Fashion': [
      'Clothing', 
      'Shoes', 
      'Accessories'
    ],
    'Kids Fashion': [
      'Clothing', 
      'Shoes'
    ]
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setSubcategories(mockData[department] || []);
  };

  const handleCategoryClick = (category) => {
    // Mock fetching products
    const products = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 }
    ];
    setProducts(products);
  };

  return (
    <div className="dress-category-section">
      <h2 className="section-title">Shop by Department</h2>
      <div className="department-list">
        {departments.map((department) => (
          <DepartmentCard
            key={department}
            department={department}
            onDepartmentClick={handleDepartmentClick}
            selectedDepartment={selectedDepartment}
          />
        ))}
      </div>
      {selectedDepartment && (
        <SubcategorySection
          department={selectedDepartment}
          subcategories={subcategories}
          onCategoryClick={handleCategoryClick}
          products={products}
        />
      )}
    </div>
  );
};

// DepartmentCard Component
const DepartmentCard = ({ department, onDepartmentClick, selectedDepartment }) => {
  const getIcon = (department) => {
    switch (department) {
      case 'Electronics':
        return <FaPlug className="department-icon" />;  // Electronics icon
      case 'Computers':
        return <FaDesktop className="department-icon" />;
      case 'Smart Home':
        return <FaHome className="department-icon" />;
      case 'Arts & Crafts':
        return <FaPaintBrush className="department-icon" />;
      case 'Automotive':
        return <FaCar className="department-icon" />;
      case 'Baby':
        return <FaBaby className="department-icon" />;
      case 'Beauty and Personal Care':
        return <FaHeartbeat className="department-icon" />; // Beauty icon (can also use a different one)
        case 'Fashion':
      return <FaTshirt className="department-icon" />;
      case "Women's Fashion":
        return <FaFemale className="department-icon" />;
      case "Men's Fashion":
        return <FaMale className="department-icon" />;
      case "Girls Fashion":
        return <FaChild className="department-icon" />; // Girls Fashion
      case "Boys Fashion":
        return <FaChild className="department-icon" />; // Boys Fashion
      case 'Health and Household':
        return <FaHeartbeat className="department-icon" />;
      case 'Home and Kitchen':
        return <FaCouch className="department-icon" />;  // Home & Kitchen
      case 'Industrial and Scientific':
        return <FaIndustry className="department-icon" />;  // Industrial & Scientific
      case 'Luggage':
        return <FaSuitcase className="department-icon" />;  // Luggage
      case 'Movies & Television':
        return <FaTv className="department-icon" />;  // Movies & TV
        case 'Pet Supplies': // Use capital 'S'
        return <FaCat className="department-icon" />;  // Pet Supplies
      case 'Software':
        return <FaLaptop className="department-icon" />;  // Software
      case 'Sports and Outdoors':
        return <FaHiking className="department-icon" />;  // Sports & Outdoors
      case 'Tools & Home Improvement':
        return <FaToolbox className="department-icon" />;
      case 'Toys and Games':
        return <FaGamepad className="department-icon" />;
      case 'Video Games':
        return <FaVideo className="department-icon" />;  // Video Games
      default:
        return null;
    }
  };


  return (
    <div
      className={`department-card ${selectedDepartment === department ? 'active' : ''}`}
      onClick={() => onDepartmentClick(department)}
    >
      <div className="department-header">
        {getIcon(department)}
        <h3 className="department-title">{department}</h3>
      </div>
    </div>
  );
};

// SubcategorySection Component
const SubcategorySection = ({ department, subcategories, onCategoryClick, selectedCategory, products }) => {
  return (
    <div className="subcategory-section">
      <h3 className="subcategory-title">{department} Categories</h3>
      <ul className="subcategory-list">
        {subcategories.map((subcategory) => (
          <li
            key={subcategory}
            className={`subcategory-item ${selectedCategory === subcategory ? 'active' : ''}`}
            onClick={() => onCategoryClick(subcategory)}
          >
            {subcategory}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div className="product-list">
          <h4 className="products-title">Products</h4>
          <ul className="products">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DressCategorySection;
