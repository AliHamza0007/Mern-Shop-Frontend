import {
  BarType,
  CartItemType,
  LineType,
  OrderType,
  PieType,
  ProductType,
  ShippingInfoType,
  StatsType,
  UserType,
} from './types';

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUsersResponse = {
  success: boolean;
  data: UserType[];
};

export type UserResponse = {
  success: boolean;
  user: UserType;
};

export type AllProductsResponse = {
  success: boolean;
  products: ProductType[];
};
export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = AllProductsResponse & {
  totalPage: number;
};
export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
export type ProductResponse = {
  success: boolean;
  product: ProductType;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: OrderType[];
};
export type OrderDetailsResponse = {
  success: boolean;
  order: OrderType;
};

export type StatsResponse = {
  success: boolean;
  stats: StatsType;
};

export type PieResponse = {
  success: boolean;
  charts: PieType;
};

export type BarResponse = {
  success: boolean;
  charts: BarType;
};

export type LineResponse = {
  success: boolean;
  charts: LineType;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};
export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfoType;
  orderItems: CartItemType[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};
export type createCouponResponse = {
  success: boolean;
  message: string;
};

export type couponRequest = {
  coupon: string;
  amount: string;
  userId: string | undefined;
};

export type getCouponAllResponse = {
  success: boolean;
  coupons: [];
};
