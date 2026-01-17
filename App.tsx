
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Splash from './components/Splash';
import Header from './components/Header';
import Home from './components/Home';
import DesignStudio from './components/DesignStudio';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { ProductConfig, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-black text-white relative">
        {showSplash ? (
          <Splash onEnter={() => setShowSplash(false)} />
        ) : (
          <>
            <Header cartCount={cart.length} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/studio" 
                  element={<DesignStudio onAddToCart={(item) => setCart([...cart, item])} />} 
                />
                <Route 
                  path="/cart" 
                  element={<Cart cart={cart} onRemove={(id) => setCart(cart.filter(c => c.id !== id))} />} 
                />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
