/**
 * MenuItem interface representing a coffee shop product.
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Espresso' | 'Filter' | 'Signature' | 'Bakery';
  image?: string;
}

/**
 * Premium menu data for the coffee-to-go shop.
 */
export const MENU_ITEMS: MenuItem[] = [
  // Espresso
  {
    id: 'e1',
    name: 'Single Origin Espresso',
    description: 'Anaerobic fermentation beans with notes of wild berries and cacao.',
    price: 4.5,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1510707547241-0fcf8a50616b?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'e2',
    name: 'Luxury Flat White',
    description: 'Silky microfoam over a double shot of our premium house roast.',
    price: 5.5,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
  },
  // Filter
  {
    id: 'f1',
    name: 'V60 Pour Over',
    description: 'Clean and complex profile from rotating seasonal microlots.',
    price: 6.5,
    category: 'Filter',
    image: 'https://images.unsplash.com/photo-1544787210-2211d7c309c7?auto=format&fit=crop&q=80&w=600',
  },
  // Signature
  {
    id: 's1',
    name: 'Golden Oat Latte',
    description: 'Turmeric-infused oat milk with a hint of black pepper and honey.',
    price: 7.0,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1551041777-ed07f99b6705?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 's2',
    name: 'Smoked Vanilla Cold Brew',
    description: '12-hour steep with bourbon vanilla and a touch of hickory smoke.',
    price: 6.8,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600',
  },
  // Bakery
  {
    id: 'b1',
    name: 'Gold Leaf Croissant',
    description: 'Triple-laminated, butter-rich pastry with a light honey glaze.',
    price: 6.0,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'b2',
    name: 'Salted Caramel Cruffin',
    description: 'A hybrid masterpiece filled with artisanal salted caramel cream.',
    price: 6.5,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
  },
];
