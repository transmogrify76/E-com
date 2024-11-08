// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from React Router
// import  './Item.css'; // Import CSS module


// const Item = (props) => {
//   return (
//    <div className="item">
//     <Link to={`/product/${props.id}`}><img onClick= {window.scrollTo(0,0)}src={props.image} alt="" /></Link>
//     <p>{props.name}</p>
//     <div className="item-prices">
//       <div className="item-price-new">
//       ₹{props.new_price}
//       </div>
//       <div className="item-price-old">
//       ₹{props.old_price}
//       </div>
//     </div>
//    </div>
//   );
// }

// export default Item;
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Item.css'; // Import CSS module

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ₹{props.new_price}
        </div>
        <div className="item-price-old">
          ₹{props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
