import React from 'react';
import { Link } from 'react-router-dom';
const gif =
  'https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif';
const EmptyCart = () => {
  return (
    <div className="center">
      <div className="cart-empty">
        <img src={gif} alt="" />
        <h2>CART IS EMPTY..</h2>
        <Link to="/search">Go to Products</Link>
      </div>
    </div>
  );
};
export default EmptyCart;
