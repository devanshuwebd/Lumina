
import { Category } from './types';

export const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Lumina SoundWave Pro',
    description: 'High-fidelity noise-canceling headphones with 40-hour battery life.',
    price: 299.99,
    category: Category.ELECTRONICS,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    stock: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Minimalist Desk Lamp',
    description: 'Adjustable LED lamp with wireless charging and touch controls.',
    price: 89.00,
    category: Category.HOME,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
    stock: 24,
    rating: 4.5
  },
  {
    id: '3',
    name: 'Canvas Weekender Bag',
    description: 'Durable water-resistant canvas bag perfect for short trips.',
    price: 120.00,
    category: Category.FASHION,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
    stock: 10,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Smart Home Hub X1',
    description: 'Voice-activated central hub for all your smart devices.',
    price: 149.50,
    category: Category.ELECTRONICS,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800',
    stock: 8,
    rating: 4.3
  }
];
