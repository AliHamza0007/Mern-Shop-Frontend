import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  couponRequest,
  createCouponResponse,
  getCouponAllResponse,
} from '../../types/api-types';

const server = import.meta.env.VITE_SERVER_URL;
const server_v1 = import.meta.env.VITE_SERVER_VERSION;
type couponDelete = { couponId: string; userId: string };
export const CouponApi = createApi({
  reducerPath: 'CouponApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server + server_v1}/payment`,
  }),
  tagTypes: ['Coupon'],
  endpoints: (builder) => ({
    newCoupon: builder.mutation<createCouponResponse, couponRequest>({
      query: ({ coupon, amount, userId }) => ({
        url: `/coupon/?id=${userId}`,
        method: 'POST',
        body: { coupon, amount },
      }),
      invalidatesTags: ['Coupon'],
    }),
    updateCoupon: builder.mutation<createCouponResponse, couponRequest>({
      query: ({ coupon, amount, userId, couponId }) => ({
        url: `/coupon/${couponId}?id=${userId}`,
        method: 'PUT',
        body: { coupon, amount },
      }),
      invalidatesTags: ['Coupon'],
    }),
    deleteCoupon: builder.mutation<createCouponResponse, couponDelete>({
      query: ({ couponId, userId }) => ({
        url: `/coupon/${couponId}?id=${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),
    AllCoupons: builder.query<getCouponAllResponse, string>({
      query: (id) => ({
        url: `/coupon/?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['Coupon'],
    }),
  }),
});

export const {
  useUpdateCouponMutation,
  useNewCouponMutation,
  useAllCouponsQuery,
  useDeleteCouponMutation,
} = CouponApi;
