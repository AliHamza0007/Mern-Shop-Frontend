import { Skeleton } from '@/components/Loader';
import ProductCard from '@/components/ProductCard';
import { useLatestProductsQuery } from '@/redux/api/productAPI';
import { addToCart } from '@/redux/reducer/cartReducer';
import { CartItemType } from '@/types/types';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItemType) => {
    if (cartItem.stock < 1) return toast.error('Out of Stock');

    dispatch(addToCart(cartItem));
    toast.success('Added to cart');
  };

  const { data, isError, isLoading } = useLatestProductsQuery('');
  if (isError) {
    toast.error('Cant not fetch the products');
  }

  const server = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  return (
    <>
      <section className="home container">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fallback Image"
          // srcSet="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 600w, https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1024w,https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 100vw"
        />

        <div>
          <h1>latest Products</h1>
          <button onClick={() => navigate('/search')}>More</button>
        </div>
        <section>
          <div className="product-lists">
            {isLoading ? (
              <Skeleton width="100%" length={10} />
            ) : (
              <>
                {data && data.products && data.products.length > 0 ? (
                  data.products.map((product, i) => (
                    <ProductCard
                      key={i}
                      id={product._id}
                      name={product.name}
                      photo={`${server}/${product.photo}`}
                      stock={product.stock}
                      price={product.price}
                      handler={addToCartHandler}
                    />
                  ))
                ) : (
                  <div className="not-found-home">
                    <b>Products Not Found</b>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
