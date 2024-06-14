

import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../DescriptionBox/DescriptionBox';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Breadcrum from '../Breadcrum/Breadcrum';


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
            <Breadcrum product={product}/>
            <ProductDisplay product={product} />
            <DescriptionBox/>
            <RelatedProducts/>
           
        </div>
    );
};

export default Product;

