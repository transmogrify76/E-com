
import React from 'react'
const Product = () => {
    return(
        <div>

        </div>
    )
}
export default Product

import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));

    // Handle case where product is not found
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <ProductDisplay product={product} />
        </div>
    );
};

export default Product;

