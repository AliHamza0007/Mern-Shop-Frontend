import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';

import { Skeleton } from '@/components/Loader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TableHOC from '@/components/admin/TableHOC';
import {
  useAllCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} from '@/redux/api/couponApi';
import { RootState } from '@/redux/store';
import {
  CustomError,
  couponRequest,
  createCouponResponse,
  getCouponResponse,
} from '@/types/api-types';

type DataType = {
  _id: string;
  amount: number;
  coupon: string;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: 'ID',
    accessor: '_id',
  },
  {
    Header: 'Coupon',
    accessor: 'coupon',
  },

  {
    Header: 'Amount',
    accessor: 'amount',
  },

  {
    Header: 'Action',
    accessor: 'action',
  },
];

const CouponsManagement = () => {
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const [open, setOpen] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>('');
  const [couponId, setCouponId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllCouponsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data?.coupons?.map((i) => ({
          _id: i._id,
          amount: i.amount,
          coupon: i.coupon,
          action: (
            <button
              onClick={() => {
                setOpen(true), setCouponId(i._id);
              }}
            >
              Manage
            </button>
          ),
        })),
      );
  }, [data]);
  useEffect(() => {
    try {
      const result: getCouponResponse | undefined = data?.coupons?.find(
        (i) => i._id === couponId,
      );

      result && setCoupon(result?.coupon);
      result && setAmount(result?.amount);
    } catch (error) {
      console.log(error);
    }
  }, [couponId, data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    'dashboard-product-box',
    'Coupons Management',
    rows.length > 6,
  )();

  const objectData: couponRequest & { couponId: string } = {
    coupon,
    amount,
    userId: user?._id,
    couponId,
  };
  const updateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data }: { data?: createCouponResponse } = await updateCoupon(
      objectData,
    );

    if (data) {
      toast.success(data.message);
      setOpen(false);
    }
  };
  const deleteHandler = async () => {
    const { data }: { data?: createCouponResponse } = await deleteCoupon({
      userId: user?._id,
      couponId: couponId,
    });
    if (data) {
      toast.success(data.message);
      setOpen(false);
    }
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="container ">
        <h1>All Coupons </h1>
        <div className="relative">
          <Link to="/admin/app/coupon" className="coupon-add-btn">
            <FaPlus />
          </Link>
        </div>
        <dialog className="dialog-box-add-coupon" open={open}>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <h1> Coupon Store</h1>
          <form onSubmit={updateHandler}>
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
                setAmount(Number(e.target.value))
              }
              type="text"
              placeholder="Enter amount"
              required
            />

            <button type="submit">update</button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </button>
          </form>
        </dialog>
        {isLoading ? <Skeleton length={20} /> : Table}
      </div>
    </div>
  );
};

export default CouponsManagement;
