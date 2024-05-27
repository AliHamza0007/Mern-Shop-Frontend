import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartItemType } from 'src/types/types';
interface Component {
  cartItem: any;
}

type CartItemProps = {
  cartItem: CartItemType;
  incrementHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to="#" className="cart-item-title">
          {name}
        </Link>
        <Link to="#" className="cart-item-price">
          Rs  {price}
        </Link>
      </article>
      <div className="quantity-div">
        <button onClick={() => decrementHandler(cartItem)}>
          <FaMinus />
        </button>
        <span>{quantity}</span>
        <button onClick={() => incrementHandler(cartItem)}>
          <FaPlus />
        </button>
      </div>
      <button onClick={() => removeHandler(productId)} className="trash-btn">
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItemCard;
