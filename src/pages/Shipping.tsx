import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../redux/reducer/cartReducer';
import { RootState } from '../redux/store';
const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const server = import.meta.env.VITE_SERVER_URL;
  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer,
  );
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      navigate('/payment', {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate('/cart');
  }, [cartItems]);

  return (
    <div className="shipping-page">
      <BiArrowBack
        onClick={() => navigate(-1)}
        className="back-arrow"
        size={'2rem'}
      />
      <main>
        <p>Shipping Address</p>
        <form onSubmit={submitHandler}>
          <input
            required
            type="text"
            placeholder="Address"
            name="address"
            value={shippingInfo.address}
            onChange={changeHandler}
          />
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={shippingInfo.city}
            onChange={changeHandler}
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            value={shippingInfo.state}
            onChange={changeHandler}
          />
          <select
            required
            name="country"
            value={shippingInfo.country}
            onChange={changeHandler}
          >
            <option value="">Select a country</option>
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
            <option value="Germany">Germany</option>
            <option value="America">America</option>
          </select>{' '}
          <input
            required
            type="number"
            placeholder="Pin Code"
            name="pinCode"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
          />
          <button type="submit">Pay Now</button>
        </form>
      </main>
    </div>
  );
};

export default Shipping;
