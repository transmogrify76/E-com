// import React, { useContext, useState, useEffect } from 'react';
// import './ShopCat.css';
// import dropdown_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/dropdown_icon.png';
// import Item from '../../User/Item/Item.jsx';
// import { ShopContext } from '../Context/ShopContext.jsx';

// export const ShopCat = (props) => {
//     const { all_product } = useContext(ShopContext);
//     const [sortCriteria, setSortCriteria] = useState('');
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [categoryProducts, setCategoryProducts] = useState([]); // State to store category products
//     const [loading, setLoading] = useState(true);
//     const [productImages, setProductImages] = useState({}); // Store Base64 images by product id

//     const category = props.category;

//     // Function to fetch products by category
//     const fetchProductsByCategory = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/category/${category}`);
//             const data = await response.json();
//             if (Array.isArray(data)) {
//                 // Fetch images for the products once products are fetched
//                 await fetchProductImages(data);
//                 setCategoryProducts(data); // Store fetched data in state
//             } else {
//                 console.error("Expected an array of products, but got:", data);
//             }
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching products by category:", error);
//             setLoading(false);
//         }
//     };

//     // Function to fetch images for each product (GET method)
//     const fetchProductImages = async (products) => {
//         let imagePromises = products.map(async (product) => {
//             try {
//                 // Add a timestamp to the URL to avoid cache issues
//                 const imageUrl = `${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}?t=${new Date().getTime()}`;
//                 const response = await fetch(imageUrl);

//                 if (response.ok) {
//                     const imagesData = await response.json();
//                     const imageBase64 = imagesData[0]?.base64; // Assuming the first image in the array

//                     if (imageBase64) {
//                         setProductImages(prevImages => ({
//                             ...prevImages,
//                             [product.id]: imageBase64 // Save Base64 image for this product
//                         }));
//                     } else {
//                         console.error(`No image found for product ${product.id}`);
//                     }
//                 } else {
//                     console.error(`Failed to fetch image for product ${product.id}`);
//                 }
//             } catch (error) {
//                 console.error(`Error fetching image for product ${product.id}:`, error);
//             }
//         });
//         await Promise.all(imagePromises);
//     };

//     // Sorting products
//     const sortProducts = (products, criteria) => {
//         if (!Array.isArray(products)) return [];
//         switch (criteria) {
//             case 'price-asc':
//                 return products.sort((a, b) => a.new_price - b.new_price);
//             case 'price-desc':
//                 return products.sort((a, b) => b.new_price - a.new_price);
//             case 'newest':
//                 return products.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
//             case 'rating':
//                 return products.sort((a, b) => b.rating - a.rating);
//             default:
//                 return products;
//         }
//     };

//     const filteredAndSortedProducts = sortProducts(categoryProducts, sortCriteria);

//     useEffect(() => {
//         fetchProductsByCategory();
//     }, [category]);

//     const handleSortChange = (event) => {
//         setSortCriteria(event.target.value);
//         setIsDropdownOpen(false); 
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <div className='shop-category'>
//             <img className='shopcategory-banner' src={props.banner} alt="" />
//             <div className="shopcategory-indexSort">
//                 <p>
//                     <span>
//                         Showing 1-12
//                     </span> Out of {filteredAndSortedProducts.length} products
//                 </p>
//                 <div className="shopcategory-sort">
//                     <div onClick={toggleDropdown} className="shopcategory-sort-header">
//                         Sort by 
//                         <img src={dropdown_icon} alt="Sort Icon" />
//                     </div>
//                     {isDropdownOpen && (
//                         <div className="shopcategory-sort-dropdown">
//                             <select value={sortCriteria} onChange={handleSortChange}>
//                                 <option value="price-asc">Price: Low to High</option>
//                                 <option value="price-desc">Price: High to Low</option>
//                                 <option value="newest">Newest Arrivals</option>
//                                 <option value="rating">Best Rating</option>
//                             </select>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             {loading ? (
//                 <div>Loading products...</div>
//             ) : (
//                 <div className="shopcategory-products">
//                     {filteredAndSortedProducts.length > 0 ? (
//                         filteredAndSortedProducts.map((item, i) => (
//                             <Item
//                                 key={i}
//                                 id={item.id}
//                                 name={item.name}
//                                 image={productImages[item.id] ? productImages[item.id] : null} // Display Base64 image
//                                 new_price={item.price}
//                                 old_price={item.old_price}
//                             />
//                         ))
//                     ) : (
//                         <div>No products found in this category.</div>
//                     )}
//                 </div>
//             )}
//             <div className="shopcategory-loadmore">
//                 Explore More
//             </div>
//         </div>
//     );
// };

// export default ShopCat;


import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ShopCat.css';
import dropdown_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/dropdown_icon.png';
import Item from '../../User/Item/Item.jsx';
import { ShopContext } from '../Context/ShopContext.jsx';


export const ShopCat = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortCriteria, setSortCriteria] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productImages, setProductImages] = useState({});

    const category = props.category;

    // Function to fetch products by category
    const fetchProductsByCategory = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/category/${category}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                await fetchProductImages(data);
                setCategoryProducts(data);
            } else {
                console.error("Expected an array of products, but got:", data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            setLoading(false);
        }
    };

    // Function to fetch product images (Base64)
    const fetchProductImages = async (products) => {
        let imagePromises = products.map(async (product) => {
            try {
                const imageUrl = `${process.env.REACT_APP_BASE_URL}/products/images/product/${product.id}?t=${new Date().getTime()}`;
                const response = await fetch(imageUrl);
                if (response.ok) {
                    const imagesData = await response.json();
                    const imageBase64 = imagesData[0]?.base64;
                    if (imageBase64) {
                        setProductImages(prevImages => ({
                            ...prevImages,
                            [product.id]: imageBase64
                        }));
                    }
                }
            } catch (error) {
                console.error(`Error fetching image for product ${product.id}:`, error);
            }
        });
        await Promise.all(imagePromises);
    };

    const sortProducts = (products, criteria) => {
        if (!Array.isArray(products)) return [];
        switch (criteria) {
            case 'price-asc':
                return products.sort((a, b) => a.new_price - b.new_price);
            case 'price-desc':
                return products.sort((a, b) => b.new_price - a.new_price);
            case 'newest':
                return products.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
            case 'rating':
                return products.sort((a, b) => b.rating - a.rating);
            default:
                return products;
        }
    };

    const filteredAndSortedProducts = sortProducts(categoryProducts, sortCriteria);

    useEffect(() => {
        fetchProductsByCategory();
    }, [category]);

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="shop-category">
            <img className="shopcategory-banner" src={props.banner} alt="Category Banner" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> Out of {filteredAndSortedProducts.length} products
                </p>
                <div className="shopcategory-sort">
                    <div onClick={toggleDropdown} className="shopcategory-sort-header">
                        Sort by
                        <img src={dropdown_icon} alt="Sort Icon" />
                    </div>
                    {isDropdownOpen && (
                        <div className="shopcategory-sort-dropdown">
                            <select value={sortCriteria} onChange={handleSortChange}>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="rating">Best Rating</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>
            {loading ? (
                <div>Loading products...</div>
            ) : (
                <div className="shopcategory-products">
                    {filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map((item) => (
                            <Link to={`/product/${item.id}`} key={item.id}> {/* Linking to Product Display Page */}
                                <Item
                                    id={item.id}
                                    name={item.name}
                                    image={productImages[item.id] ? productImages[item.id] : null}
                                    new_price={item.price}
                                    old_price={item.old_price}
                                />
                            </Link>
                        ))
                    ) : (
                        <div>No products found in this category.</div>
                    )}
                </div>
            )}
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCat;
