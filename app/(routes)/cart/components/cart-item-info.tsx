import { Product } from '@/types';

interface CartItemInfoProps {
  product: Product;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ product }) => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-black">{product.name}</p>
      </div>
      <div className="mt-1 flex text-sm">
        <p className="text-gray-500">{product.category?.name}</p>
      </div>
    </div>
  );
};

export default CartItemInfo;
