import React, { useContext, useState, useEffect } from 'react';
import './ShopCat.css';
import dropdown_icon from '../../Assests/Ecommerce_Frontend_Assets/Assets/dropdown_icon.png';
import Item from '../../User/Item/Item.jsx';
import { ShopContext } from '../Context/ShopContext.jsx';

export const ShopCat = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortCriteria, setSortCriteria] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    console.log("Category Prop: ", props.category);
    console.log("All Products: ", all_product);

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
        setIsDropdownOpen(false); 
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const sortProducts = (products, criteria) => {
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

    
    const filteredProducts = all_product.filter(item => {
        console.log("Item Category:", item.category);
        console.log("Props Category:", props.category);
        return item.category.toLowerCase() === props.category.toLowerCase();
    });

    console.log("Filtered Products:", filteredProducts);

    const filteredAndSortedProducts = sortProducts(filteredProducts, sortCriteria);

    useEffect(() => {
        console.log("Filtered and Sorted Products: ", filteredAndSortedProducts);
    }, [filteredAndSortedProducts]);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>
                        Showing 1-12
                    </span> Out of {filteredAndSortedProducts.length} products
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
            <div className="shopcategory-products">
                {filteredAndSortedProducts.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCat;
