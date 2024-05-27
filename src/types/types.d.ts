export type UserType = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type ProductType = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItemType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
export type OrderItemType = Omit<CartItemType, 'stock'> & { _id: string };

export type OrderType = {
  orderItems: OrderItemType[];
  shippingInfo: ShippingInfoType;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChangeType = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransactionType = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type StatsType = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChangeType;
  count: CountAndChangeType;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransactionType[];
};

type OrderFullfillmentType = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistributionType = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroupType = {
  teen: number;
  adult: number;
  old: number;
};

export type PieType = {
  orderFullfillment: OrderFullfillmentType;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistributionType;
  usersAgeGroup: UsersAgeGroupType;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type BarType = {
  users: number[];
  products: number[];
  orders: number[];
};
export type LineType = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
