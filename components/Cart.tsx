
import React, { useState } from 'react';
import { CartItem } from '../types';
import { PRODUCT_IMAGES } from '../constants';

interface CartProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove }) => {
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.0725;
  
  const calculateShipping = () => {
    if (!shippingZip) return;
    // Simulate USPS API call
    const cost = Math.floor(Math.random() * 15) + 10.50;
    setShippingCost(cost);
  };

  const total = subtotal + tax + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <h2 className="text-4xl font-bold gold-text mb-6">YOUR CART IS EMPTY</h2>
        <p className="text-white/60 mb-12">Looks like you haven't designed any masterpieces yet.</p>
        <button onClick={() => window.location.href = '#/studio'} className="gold-button px-8 py-3 rounded font-bold">START DESIGNING</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col lg:flex-row gap-12">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold gold-text mb-8 uppercase tracking-widest">Shopping Cart</h1>
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex flex-col md:flex-row gap-6 relative">
              <div className="w-32 h-32 bg-white/5 rounded-lg gold-trim flex items-center justify-center p-2">
                <img src={PRODUCT_IMAGES[item.config.type]} alt={item.config.type} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white uppercase">{item.config.type}</h3>
                  <p className="text-xl font-bold gold-text">${item.totalPrice.toFixed(2)}</p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-white/60">
                  <p>Color: <span className="text-white">{item.config.color}</span></p>
                  <p>Size: <span className="text-white">{item.config.size}</span></p>
                  <p>Material: <span className="text-white">{item.config.material}</span></p>
                  <p>Sides: <span className="text-white">{item.config.sides.join(', ')}</span></p>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="mt-4 text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-96">
        <div className="bg-zinc-900 border-2 border-[#D4AF37] p-8 rounded-2xl sticky top-24">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-white/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Tax (7.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="ZIP Code" 
                        className="bg-black border border-zinc-700 p-2 rounded text-sm w-full text-white"
                        value={shippingZip}
                        onChange={e => setShippingZip(e.target.value)}
                    />
                    <button onClick={calculateShipping} className="gold-button px-4 py-2 rounded text-[10px] font-bold">CALC</button>
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                    <span>USPS Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                </div>
            </div>
            <div className="h-px bg-zinc-800 mt-4"></div>
            <div className="flex justify-between text-2xl font-bold gold-text">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <h3 className="text-xs gold-text uppercase font-bold mb-4">Payment Methods Accepted</h3>
          <div className="grid grid-cols-2 gap-2 mb-8">
            <div className="bg-black/50 p-2 rounded text-[8px] text-white/70 border border-zinc-800">CashApp: $Sharjays</div>
            <div className="bg-black/50 p-2 rounded text-[8px] text-white/70 border border-zinc-800">PayPal: sharjays10</div>
            <div className="bg-black/50 p-2 rounded text-[8px] text-white/70 border border-zinc-800 col-span-2">GooglePay: georgeearlwalker@gmail.com</div>
          </div>

          <button 
            className="w-full gold-button py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#D4AF37]/20"
            onClick={() => alert("Redirecting to secure payment portal...")}
          >
            SECURE CHECKOUT
          </button>
          
          <p className="mt-4 text-[10px] text-white/40 text-center uppercase tracking-widest">
            Fast Shipping from Lancaster, CA 93534
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
