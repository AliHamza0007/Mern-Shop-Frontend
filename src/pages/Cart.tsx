import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import CartEmpty from 'src/components/CartEmpty';
import { Link } from 'react-router-dom';
import CartItemCard from 'src/components/CartItemCard';
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from 'src/redux/reducer/cartReducer';
import { RootState } from 'src/redux/store';
import { CartItemType } from 'src/types/types';
const Cart = () => {
  const server = import.meta.env.VITE_SERVER_URL;
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>('');
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error('Stock Is Limited');

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <>
      <div className="cart">
        {cartItems.length > 0 ? (
          <>
            {' '}
            <main className="cart-items">
              {cartItems.map((i, idx) => (
                <CartItemCard
                  incrementHandler={incrementHandler}
                  decrementHandler={decrementHandler}
                  removeHandler={removeHandler}
                  key={idx}
                  cartItem={i}
                />
              ))}
            </main>
            <aside className="summary">
              <div>
                <p>Subtotal Rs  {subtotal}</p>
                <p>Shipping Charges Rs  {shippingCharges}</p>
                <p>Tax Rs  {tax}</p>
                <p>Discount Rs  {discount}</p>
                <p>Total Rs  {total}</p>

                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponCode &&
                  (isValidCouponCode ? (
                    <div className="green">
                      Rs  {discount} off using the <code>{couponCode}</code>
                    </div>
                  ) : (
                    <div className="red">
                      Invalid Coupon <VscError />
                    </div>
                  ))}
                {cartItems.length > 0 && (
                  <Link to="/shipping" className="checkout-btn">
                    Checkout
                  </Link>
                )}
              </div>
            </aside>
          </>
        ) : (
          <CartEmpty />
        )}
      </div>
    </>
  );
};

export default Cart;
