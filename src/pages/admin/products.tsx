import React, { ReactElement, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import AdminSidebar from '../../components/admin/AdminSidebar';
import TableHOC from '../../components/admin/TableHOC';

import { useAllProductsQuery } from '../../redux/api/productAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { CustomError } from '../../types/api-types';
import toast from 'react-hot-toast';
import { Skeleton } from '../../components/Loader';
const server = import.meta.env.VITE_SERVER_URL;
interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: 'Photo',
    accessor: 'photo',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Stock',
    accessor: 'stock',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];

const Products = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isError, isLoading, error } = useAllProductsQuery(user?._id!);
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data?.products)
      setRows(
        data?.products?.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        })),
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    'dashboard-product-box',
    'Products',
    rows.length > 6,
  )();

  return (
    <div className="admin-container ">
      <AdminSidebar />

      <main className="products-relative">
        {data ? Table : <Skeleton />}
        {data?.products ? (
          ''
        ) : (
          <div className="not-found">
            <b>Products Not Found</b>
          </div>
        )}
      </main>

      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
