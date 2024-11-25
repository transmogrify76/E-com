import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import DescriptionBox from '../DescriptionBox/DescriptionBox';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Breadcrum from '../Breadcrum/Breadcrum';

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null); // For storing the current product
  const [relatedProducts, setRelatedProducts] = useState([]); // For storing related products
  const [image, setImage] = useState(null); // For storing the base64 image
  const [loading, setLoading] = useState(true);

  // Fetch product by ID and image
  const fetchProduct = async () => {
    try {
      // Fetch product data
      const productResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${productId}`);
      const productData = await productResponse.json();
      
      if (productData) {
        setProduct(productData);
        fetchProductImage(productData.id); // Fetch the product image after getting the product details
        fetchRelatedProducts(productData.category); // Fetch related products based on category
      } else {
        console.error('Product not found.');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the product image by ID (Base64)
  const fetchProductImage = async (productId) => {
    try {
      const imageResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${productId}`);
      const imageData = await imageResponse.json();
      
      if (imageData && imageData[0]) {
        setImage(imageData[0].base64); // Assuming the API returns base64 encoded image data
      }
    } catch (error) {
      console.error('Error fetching product image:', error);
    }
  };

  // Fetch related products based on category
  const fetchRelatedProducts = async (category) => {
    try {
      const relatedResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/category/${category}`);
      const relatedData = await relatedResponse.json();
      
      const sellerUploadedRelatedProducts = relatedData.filter(
        (product) => product.sellerUploaded // Only filter seller-uploaded products
      );

      setRelatedProducts(sellerUploadedRelatedProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  // Fetch product details when the component mounts or productId changes
  useEffect(() => {
    setLoading(true);
    fetchProduct();
  }, [productId]);

  // Handle case where product is not found
  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} image={image} />
      <DescriptionBox product={product} />
      
      {/* Display Related Products */}
      {relatedProducts.length > 0 ? (
        <RelatedProducts products={relatedProducts} />
      ) : (
        <div>No related seller-uploaded products in this category.</div>
      )}
    </div>
  );
};

export default Product;


