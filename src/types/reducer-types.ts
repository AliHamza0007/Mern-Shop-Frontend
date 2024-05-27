import { CartItemType, ShippingInfoType, UserType } from './types';

export interface UserReducerInitialState {
  user: UserType | null;
  loading: boolean;
}

export interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItemType[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfoType;
}
