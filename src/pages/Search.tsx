import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Skeleton } from 'src/components/Loader';
import ProductCard from 'src/components/ProductCard';
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from 'src/redux/api/productAPI';
import { addToCart } from 'src/redux/reducer/cartReducer';
import { CustomError } from '../types/api-types';
import { CartItemType } from '../types/types';
const server = import.meta.env.VITE_SERVER_URL;

const Search = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery('');

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItemType) => {
    if (cartItem.stock < 1) return toast.error('Out of Stock');
    dispatch(addToCart(cartItem));
    toast.success('Added to cart');
  };

  const isPrevPage = page > 1;
  const isNextPage = page < searchedData?.totalPage!;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="search-page ">
      <button
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        className="sidebar-togler"
      >
        {isSideBarOpen ? <FaXmark /> : <FaBars />}
      </button>
      <aside className={`${isSideBarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <h1>FILTERS</h1>
        <div>
          <p>Sort</p>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <p>Max Price: {maxPrice || ''}</p>

          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            type="range"
            min={100}
            max={60000}
          />
        </div>
        <div>
          <p>category</p>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id=""
          >
            <option value="">All</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}{' '}
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-products-list">
          {productLoading ? (
            <Skeleton width="80vw" length={10} />
          ) : (
            searchedData?.products?.map((product, i) => {
              return (
                <ProductCard
                  key={i}
                  id={product?._id}
                  name={product?.name}
                  photo={`${server}/${product?.photo}`}
                  stock={product?.stock}
                  price={product?.price}
                  handler={addToCartHandler}
                />
              );
            })
          )}
        </div>
        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
