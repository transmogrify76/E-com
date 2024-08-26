import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";

const data_product = [
  // Women's Products
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: p1_img,
    new_price: 50.0,
    old_price: 80.5,
    size: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Floral Print Wrap Dress",
    category: "women",
    image: p2_img,
    new_price: 70.0,
    old_price: 100.0,
    size: ["S", "M", "L", "XL", "XXL"]
  },

  // Men's Products
  {
    id: 3,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: p13_img,
    new_price: 85.0,
    old_price: 120.5,
    size: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 4,
    name: "Men's Casual Chinos",
    category: "men",
    image: p14_img,
    new_price: 65.0,
    old_price: 90.0,
    size: ["S", "M", "L", "XL", "XXL"]
  },

  // Kids' Products
  {
    id: 5,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: p25_img,
    new_price: 85.0,
    old_price: 120.5,
    size: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 6,
    name: "Boys' Denim Shorts",
    category: "kid",
    image: p26_img,
    new_price: 30.0,
    old_price: 45.0,
    size: ["S", "M", "L", "XL", "XXL"]
  }
];

export default data_product;
