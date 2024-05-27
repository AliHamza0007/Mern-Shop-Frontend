import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { useNewCouponMutation } from '../../../redux/api/couponApi';
import { RootState } from '../../../redux/store';
import { couponRequest, createCouponResponse } from '../../../types/api-types';
const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const allNumbers = '1234567890';
const allSymbols = '!@#$%^&*()_+';

const Coupon = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>('');
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [newCoupon] = useNewCouponMutation();

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return toast.error('Please Select At Least One Combination');

    let result: string = prefix || '';
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = '';
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  const { user } = useSelector((state: RootState) => state.userReducer);
  const objectData: couponRequest = {
    coupon,
    amount,
    userId: user?._id,
  };
  const ResetInputs = () => {
    setCoupon('');
    setAmount('');
  };
  const CouponHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data }: { data: createCouponResponse } = await newCoupon(
      objectData,
    );

    if (data) {
      toast.success(data.message);
      navigate('/admin/coupon');
      setOpen(false);
      ResetInputs();
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section className="relative">
          {coupon ? (
            <button className="coupon-add-btn" onClick={() => setOpen(true)}>
              <FaPlus />
            </button>
          ) : (
            ''
          )}
          <dialog className="dialog-box-add-coupon" open={open}>
            <h1> Coupon Store</h1>
            <form onSubmit={CouponHandler}>
              <label>Enter Coupon:</label>
              <input
                type="text"
                value={coupon}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCoupon(e.target.value)
                }
                placeholder="Enter coupon"
                required
              />

              <label>Enter Discount Amount:</label>
              <input
                value={amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
                type="text"
                placeholder="Enter amount"
                required
              />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setOpen(false)}>
                Close
              </button>
            </form>
          </dialog>

          <form className="coupon-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset>
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span>Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>
            </fieldset>
            <button type="submit">Generate</button>
          </form>

          {coupon && (
            <code>
              {coupon}{' '}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? 'Copied' : 'Copy'}
              </span>{' '}
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
