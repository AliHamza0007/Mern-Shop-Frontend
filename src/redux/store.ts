import { configureStore } from '@reduxjs/toolkit';
import { dashboardApi } from './api/dashboardAPI';
import { orderApi } from './api/orderAPI';
import { productAPI } from './api/productAPI';
import { userAPI } from './api/userAPI';
import { userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import { CouponApi } from './api/couponApi';

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [CouponApi.reducerPath]: CouponApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderApi.middleware,
    dashboardApi.middleware,
    CouponApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
