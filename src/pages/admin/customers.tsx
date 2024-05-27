import React, { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Column } from 'react-table';
import { Skeleton } from 'src/components/Loader';
import AdminSidebar from 'src/components/admin/AdminSidebar';
import TableHOC from 'src/components/admin/TableHOC';

import { useAllUsersQuery, useDeleteUserMutation } from 'src/redux/api/userAPI';
import { RootState } from 'src/redux/store';
import { CustomError } from 'src/types/api-types';
import { responseToast } from 'src/utils/Feature';

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: 'Avatar',
    accessor: 'avatar',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllUsersQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, '');
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.data?.map((i) => ({
          avatar: (
            <img
              style={{
                borderRadius: '50%',
              }}
              src={i.photo}
              alt={i.name}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        })),
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    'dashboard-product-box',
    'Customers',
    rows.length > 6,
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;