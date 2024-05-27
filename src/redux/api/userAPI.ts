// import { server } from '../store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import {
  AllUsersResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from 'src/types/api-types';
import { UserType } from 'src/types/types';
const server = import.meta.env.VITE_SERVER_URL;
const server_v1 = import.meta.env.VITE_SERVER_VERSION;
export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server + server_v1}/user`,
  }),
  tagTypes: ['users'],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, UserType>({
      query: (user) => ({
        url: '/',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['users'],
    }),

    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: ({ userId, adminUserId }) => ({
        url: `/${userId}?id=${adminUserId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),

    allUsers: builder.query<AllUsersResponse, string>({
      query: (id) => `/?id=${id}`,
      providesTags: ['users'],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${server + server_v1}/user/${id}`,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation } =
  userAPI;
