import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    set => ({
      items: [],
      addItem: (data: Product) => {
        set(state => {
          const existingItem = state.items.find(item => item.id === data.id);
          if (existingItem) {
            return state;
          }
          return { items: [...state.items, data] };
        });
        toast.success('Item added to cart.');
      },
      removeItem: (id: string) => {
        set(state => ({ items: [...state.items.filter(item => item.id !== id)] }));
        toast.success('Item removed from cart.');
      },
      removeAll: () => {
        set({ items: [] });
        toast.success('Cart cleared.');
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
