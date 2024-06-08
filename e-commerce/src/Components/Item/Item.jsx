import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import styles from './Item.css'; // Import CSS module

// Define CategoryItem component
const CategoryItem = ({ name, emoji, link }) => {
  return (
    <li className={styles.categoryItem}>
      <Link to={link || "/"}>
        <a>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

const Item = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore</h2>
      <ul className={styles.categories}>
        {/* Render CategoryItem components */}
        <CategoryItem name="New In" emoji="⚡" link="/" />
        <CategoryItem name="Clothing" emoji="👚" link="/category/clothing" />
        <CategoryItem name="Shoes" emoji="👠" link="/category/shoes" />
        <CategoryItem
          name="Accessories"
          emoji="👜"
          link="/category/accessories"
        />
        <CategoryItem
          name="Activewear"
          emoji="🤸"
          link="/category/activewear"
        />
        <CategoryItem
          name="Gifts & Living"
          emoji="🎁"
          link="/category/gifts_and_living"
        />
        <CategoryItem
          name="Inspiration"
          emoji="💎"
          link="/category/inspiration"
        />
      </ul>
      <div className={styles.helpContainer}>
        <div className={styles.helpIcon}>
          {/* Assuming HelpIcon is another component */}
          {/* You need to import HelpIcon and provide it here */}
          {/* <HelpIcon width={18} height={18} /> */}
        </div>
        <span>Help Center</span>
      </div>
    </div>
  );
}

export default Item;
