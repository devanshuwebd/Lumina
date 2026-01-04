
import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './constants';
import Layout from './components/Layout';
import StoreFront from './components/StoreFront';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import OrderDashboard from './components/OrderDashboard';
import Auth from './components/Auth';

export default function App() {
  const [view, setView] = useState('store');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('lumina_user') || 'null'));
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('lumina_products') || JSON.stringify(INITIAL_PRODUCTS)));
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('lumina_orders') || '[]'));

  useEffect(() => {
    localStorage.setItem('lumina_user', JSON.stringify(user));
    localStorage.setItem('lumina_products', JSON.stringify(products));
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [user, products, orders]);

  const addToCart = (p) => {
    if (!user) return setView('auth');
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      return exists ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }];
    });
  };

  const checkout = () => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date: new Date().toISOString(),
      items: [...cart],
      total: subtotal * 1.08 + (subtotal > 100 ? 0 : 15),
      status: 'Processing'
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setView('orders');
  };

  return (
    <Layout 
      currentView={view} 
      setView={setView} 
      user={user} 
      onLogout={() => { setUser(null); setView('store'); }}
      cartItemsCount={cart.reduce((s, i) => s + i.quantity, 0)}
    >
      {view === 'store' && <StoreFront products={products} onAddToCart={addToCart} />}
      {view === 'cart' && <Cart items={cart} onUpdateQuantity={(id, d) => setCart(p => p.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i))} onRemoveItem={id => setCart(p => p.filter(i => i.id !== id))} onCheckout={checkout} />}
      {view === 'orders' && <OrderDashboard orders={orders.filter(o => o.userId === user?.id)} />}
      {view === 'admin' && user?.role === 'admin' && (
        <AdminDashboard 
          products={products}
          onAddProduct={p => setProducts(prev => [p, ...prev])}
          onUpdateProduct={p => setProducts(prev => prev.map(old => old.id === p.id ? p : old))}
          onDeleteProduct={id => setProducts(prev => prev.filter(p => p.id !== id))}
        />
      )}
      {view === 'auth' && <Auth onAuth={u => { setUser(u); setView('store'); }} />}
    </Layout>
  );
}
