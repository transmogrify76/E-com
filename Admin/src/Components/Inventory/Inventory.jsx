// import React, { useState } from 'react';
// import './Inventory.css';

// const InventoryOverview = () => {
//   const [inventory, setInventory] = useState([
//     { id: 1, name: 'Product A', quantity: 10 },
//     { id: 2, name: 'Product B', quantity: 20 },
//     { id: 3, name: 'Product C', quantity: 15 },
//   ]);

//   const handleDelete = (id) => {
//     // Filter out the item with the given id
//     const updatedInventory = inventory.filter(item => item.id !== id);
//     setInventory(updatedInventory);
//   };

//   return (
//     <div className="admin-section">
//       <h2>Inventory Overview</h2>
//       <ul>
//         {inventory.map((product) => (
//           <li key={product.id}>
//             <div>
//               <strong>{product.name}</strong> - {product.quantity} in stock
//             </div>
//             <button onClick={() => handleDelete(product.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default InventoryOverview;


import React, { useState } from 'react';
import './Inventory.css'; // Corrected CSS import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { parse, icon } from '@fortawesome/fontawesome-svg-core';


const Inventory = () => {
    const exportToPDF = () => {
        // Logic for exporting products to PDF
        alert('Exporting products to PDF...');
    };

    // Mock data for existing products (replace with actual data handling)
    const [products] = useState([
        { id: 1, name: 'Product A', mrp: 100, sellingPrice: 800, discount: 100, stock: 10 },
        { id: 2, name: 'Product B', mrp: 100, sellingPrice: 800, discount: 100, stock: 7 },
        { id: 3, name: 'Product C', mrp: 100, sellingPrice: 800, discount: 100, stock: 50 },
        { id: 4, name: 'Product D', mrp: 100, sellingPrice: 800, discount: 100, stock: 0 }
    ]);

    return (
        <div className="app-containerr">
            {/* Main Content */}
            <div className="existing-product-containerr">
                <div className="header-containerr">
                    <h2>Existing Products</h2>
                    <div className="export-sectionn">
                        <button onClick={exportToPDF}><FontAwesomeIcon icon={faFilePdf} /> Export to PDF</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>MRP</th>
                            <th>Selling Price</th>
                            <th>Discount</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>₹{product.mrp}</td>
                                <td>₹{product.sellingPrice}</td>
                                <td>₹{product.discount}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
