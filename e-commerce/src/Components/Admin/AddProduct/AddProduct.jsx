// import React, { useState } from 'react';
// import './AddProduct.css';
// import upload_area from '../../Assests/Admin_Assets/upload_area.svg';

// const AddProduct = () => {
//     const [image, setImage] = useState(false);
//     const [productDetails, setProductDetails] = useState({
//         name: "",
//         image: "",
//         category: "women",
//         new_price: "",
//         old_price: "",
//         description: "", // New field for product description
//         size: "" // New field for product size
//     });

//     const imageHandler = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const changeHandler = (e) => {
//         setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//     };

//     const Add_Product = async () => {
//         console.log(productDetails);
//         let responseData;
//         let product = productDetails;

//         let formData = new FormData();
//         formData.append('product', image);

//         await fetch('http://localhost:4000/upload', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//             },
//             body: formData,
//         }).then((resp) => resp.json()).then((data) => { responseData = data });

//         if (responseData.success) {
//             product.image = responseData.image_url;
//             console.log(product);
//             await fetch('http://localhost:4000/addproduct', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(product),
//             }).then((resp) => resp.json()).then((data) => {
//                 data.success ? alert("Product Added") : alert("Failed");
//             });
//         }
//     };

//     return (
//         <div className='background-container'> {/* New container for background */}
//             <div className='add-product'>
//                 <div className="addproduct-itemfield">
//                     <p>Product Title</p>
//                     <input
//                         value={productDetails.name}
//                         onChange={changeHandler}
//                         type="text"
//                         name='name'
//                         placeholder='Type here'
//                     />
//                 </div>
//                 <div className="addproduct-itemfield">
//                     <p>Product Description</p>
//                     <textarea
//                         value={productDetails.description}
//                         onChange={changeHandler}
//                         name='description'
//                         placeholder='Enter product description here'
//                         rows="4"
//                     />
//                 </div>
//                 <div className="addproduct-price">
//                     <div className="addproduct-itemfield">
//                         <p>Price</p>
//                         <input
//                             value={productDetails.old_price}
//                             onChange={changeHandler}
//                             type="text"
//                             name="old_price"
//                             placeholder='Type here'
//                         />
//                     </div>
//                     <div className="addproduct-itemfield">
//                         <p>Offer Price</p>
//                         <input
//                             value={productDetails.new_price}
//                             onChange={changeHandler}
//                             type="text"
//                             name="new_price"
//                             placeholder='Type here'
//                         />
//                     </div>
//                 </div>
//                 <div className="addproduct-itemfield">
//                     <p>Product Size</p>
//                     <input
//                         value={productDetails.size}
//                         onChange={changeHandler}
//                         type="text"
//                         name="size"
//                         placeholder='Enter product size'
//                     />
//                 </div>
//                 <div className="addproduct-itemfield">
//                     <p>Product Category</p>
//                     <select
//                         value={productDetails.category}
//                         onChange={changeHandler}
//                         name="category"
//                         className='add-product-selector'
//                     >
//                         <option value="women">Women</option>
//                         <option value="men">Men</option>
//                         <option value="kid">Kid</option>
//                     </select>
//                 </div>
//                 <div className="addproduct-itemfield">
//                     <label htmlFor="file-input">
//                         <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="Upload area" />
//                     </label>
//                     <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
//                 </div>
//                 <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
//             </div>
//         </div>
//     );
// }

// export default AddProduct;
import React, { useState } from 'react';
import './AddProduct.css'; // Make sure to create or adjust your CSS file as needed
import upload_area from '../../Assests/Admin_Assets/upload_area.svg'; // Path to your upload area image

const AddProduct = () => {
    const [imageFiles, setImageFiles] = useState([]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        price: "",
        description: "",
    });

    // Handler for image upload
    const imageHandler = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
    };

    // Handler for input changes
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // Function to add the product
    const addProduct = async () => {
        const userId = localStorage.getItem('userId'); // Get userId from local storage
        const { name, price, description } = productDetails;

        if (!name || !price || !description || imageFiles.length === 0) {
            alert("Please fill in all fields and upload at least one image.");
            return;
        }

        // Prepare the form data
        const formData = new FormData();
        imageFiles.forEach(image => {
            formData.append('imageFiles', image); // Append each image file
        });

        // Add the product details to the form data
        formData.append('product', JSON.stringify({
            name,
            price: parseFloat(price), // Ensure price is a number
            description,
            userId: parseInt(userId, 10), // Ensure userId is a number
        }));

        try {
            const response = await fetch('http://localhost:5000/products/upload', {
                method: 'POST',
                body: formData, // Send the form data including images and product details
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown error');
            }

            const data = await response.json();
            if (data.success) {
                alert("Product Added Successfully");
                resetForm();
            } else {
                alert("Failed to add product: " + data.message);
            }
        } catch (error) {
            console.error('Error uploading product:', error);
            alert("Error uploading product: " + error.message);
        }
    };

    // Reset the form after submission
    const resetForm = () => {
        setProductDetails({
            name: "",
            price: "",
            description: "",
        });
        setImageFiles([]);
    };

    return (
        <div className='background-container'> {/* Background container */}
            <div className='add-product'>
                <div className="addproduct-itemfield">
                    <p>Product Name</p>
                    <input
                        value={productDetails.name}
                        onChange={changeHandler}
                        type="text"
                        name='name'
                        placeholder='Type here'
                        required
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Product Description</p>
                    <textarea
                        value={productDetails.description}
                        onChange={changeHandler}
                        name='description'
                        placeholder='Enter product description here'
                        rows="4"
                        required
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.price}
                        onChange={changeHandler}
                        type="number"
                        name="price"
                        placeholder='Enter product price'
                        required
                    />
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="file-input">
                        <img src={imageFiles.length > 0 ? URL.createObjectURL(imageFiles[0]) : upload_area} className='addproduct-thumbnail-img' alt="Upload area" />
                    </label>
                    <input onChange={imageHandler} type="file" name='image' id='file-input' hidden multiple required />
                </div>
                <button onClick={addProduct} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    );
};

export default AddProduct;
