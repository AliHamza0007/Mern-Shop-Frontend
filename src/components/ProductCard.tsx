import { CartItemType } from '@/types/types';
import { FaPlus } from 'react-icons/fa';

interface ProductsProps {
  name: string;
  id: string;
  photo: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItemType) => string | undefined;
}
const ProductCard = ({
  name,
  photo,
  id,
  stock,
  price,
  handler,
}: ProductsProps) => {
  return (
    <>
      <div className="product-card">
        <img src={photo} alt={name} />

        <p>{name}</p>
        <span>PKR {price}</span>
        <div>
          <button
            onClick={() =>
              handler({ productId: id, price, name, photo, stock, quantity: 1 })
            }
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
