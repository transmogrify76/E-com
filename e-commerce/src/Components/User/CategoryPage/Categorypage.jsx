// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const CategoryPage = () => {
//   const { categoryName } = useParams(); // Get the category name from the URL
//   const [categoryDetails, setCategoryDetails] = useState(null);

//   useEffect(() => {
//     // Fetch category details based on categoryName
//     const fetchCategoryDetails = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/category/${categoryName}`);
//         setCategoryDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching category details:', error);
//       }
//     };

//     fetchCategoryDetails();
//   }, [categoryName]);

//   return (
//     <div>
//       <h1>{categoryName}</h1>
//       {/* Render category details */}
//       {categoryDetails ? (
//         <div>{/* Render category content */}</div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;
