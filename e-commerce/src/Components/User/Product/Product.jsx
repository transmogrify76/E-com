
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import DescriptionBox from '../DescriptionBox/DescriptionBox';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Breadcrum from '../Breadcrum/Breadcrum';

const Product = () => {
  const { productId } = useParams();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState([]); // Default state is an empty array
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('description'); // State for toggling between description and reviews

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const productResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${productId}`);
      const productData = await productResponse.json();

      if (productData) {
        setProduct(productData);
        fetchProductImage(productData.id);
        fetchRelatedProducts(productData.category);
        fetchReviews(productData.id); // Fetch reviews based on productId
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the product image (Base64)
  const fetchProductImage = async (productId) => {
    try {
      const imageResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/images/product/${productId}`);
      const imageData = await imageResponse.json();
      
      if (imageData && imageData[0]) {
        setImage(imageData[0].base64);
      }
    } catch (error) {
      console.error('Error fetching product image:', error);
    }
  };

  // Fetch related products based on the category
  const fetchRelatedProducts = async (category) => {
    try {
      const relatedResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/products/category/${category}`);
      const relatedData = await relatedResponse.json();

      const sellerUploadedRelatedProducts = relatedData.filter(
        (product) => product.sellerUploaded
      );

      setRelatedProducts(sellerUploadedRelatedProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  // Fetch reviews based on productId
  const fetchReviews = async (productId) => {
    try {
      const reviewsResponse = await fetch(`http://localhost:5000/reviews/product/${productId}`);
      const reviewsData = await reviewsResponse.json();
      
      if (reviewsResponse.ok) {
        setReviews(reviewsData || []); // Ensure reviews is always an array
      } else {
        setReviews([]); // Ensure reviews is always an array even if no reviews found
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]); // Ensure reviews is always an array on error
    }
  };

  // Handle section change (description/reviews)
  const handleSectionChange = (section) => {
    setActiveSection(section); // Update the active section when tab is clicked
  };

  useEffect(() => {
    setLoading(true);
    fetchProduct(); // Fetch product details when the component mounts
  }, [productId]);

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

      {/* Pass handleSectionChange to DescriptionBox to toggle between Description and Reviews */}
      <DescriptionBox 
        description={product.description}
        reviews={reviews}
        activeSection={activeSection}
        onSectionChange={handleSectionChange} // Pass the section change handler
      />

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
