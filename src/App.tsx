import Loader from '@/components/Loader';
import Home from '@/pages/Home';
import { RootState } from '@/redux/store';
import '@/styles/app.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { auth } from './firebase';
import { getUser } from './redux/api/userAPI';
import { userExist, userNotExist } from './redux/reducer/userReducer';
const Login = lazy(() => import('@/pages/Login'));
const Cart = lazy(() => import('@/pages/Cart'));
const Search = lazy(() => import('@/pages/Search'));

// Admin Imports Start
const Dashboard = lazy(() => import('@/pages/admin/dashboard'));
const Products = lazy(() => import('@/pages/admin/products'));
const Customers = lazy(() => import('@/pages/admin/customers'));
const Transaction = lazy(() => import('@/pages/admin/transaction'));
const Barcharts = lazy(() => import('@/pages/admin/charts/barcharts'));
const Piecharts = lazy(() => import('@/pages/admin/charts/piecharts'));
const Linecharts = lazy(() => import('@/pages/admin/charts/linecharts'));
const Coupon = lazy(() => import('@/pages/admin/apps/coupon'));
const Stopwatch = lazy(() => import('@/pages/admin/apps/stopwatch'));
const Toss = lazy(() => import('@/pages/admin/apps/toss'));
const Shipping = lazy(() => import('@/pages/Shipping'));
const NewProduct = lazy(() => import('@/pages/admin/management/newproduct'));
const Orders = lazy(() => import('@/pages/Orders'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProductManagement = lazy(
  () => import('@/pages/admin/management/productmanagement'),
);
const TransactionManagement = lazy(
  () => import('@/pages/admin/management/transactionmanagement'),
);
//Admin imports end here
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import ProtectedRoute from './components/Protected-Route';
import NotFound from './pages/404';
const CouponsManagement = lazy(
  () => import('./pages/admin/management/couponManagement'),
);

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await getUser(user.uid);
        const { result } = response;
        // Access data safely
        dispatch(userExist(result));
      } else {
        dispatch(userNotExist());
        // console.log('LogOut User');
      }
    });
  }, []);
  return (
    <Router>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not Loged In Route */}

          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* User Login Routes */}

          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/Orders" element={<Orders />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === 'admin' ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/coupon" element={<CouponsManagement />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
