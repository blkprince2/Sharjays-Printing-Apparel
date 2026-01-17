
import React, { useState, useEffect } from 'react';
import { PRODUCT_IMAGES } from '../constants';

interface SplashProps {
  onEnter: () => void;
}

const Splash: React.FC<SplashProps> = ({ onEnter }) => {
  const [stage, setStage] = useState(0);
  const products = Object.keys(PRODUCT_IMAGES);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev < products.length ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-2xl h-[400px] flex items-center justify-center">
        {products.map((p, idx) => (
          <div
            key={p}
            className={`absolute transition-all duration-1000 transform 
              ${stage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
              ${stage === products.length ? 'opacity-100 scale-75 translate-x-' + (idx * 20 - 40) : ''}
            `}
            style={{
              left: stage === products.length ? `${idx * 20}%` : '50%',
              transform: stage === products.length ? 'translateX(-50%)' : 'translate(-50%, -50%)',
            }}
          >
            <img 
              src={PRODUCT_IMAGES[p as keyof typeof PRODUCT_IMAGES]} 
              alt={p} 
              className="w-48 h-48 object-contain gold-trim rounded-lg bg-white/10"
            />
            <p className="text-center mt-2 gold-text font-bold text-sm uppercase">{p}</p>
          </div>
        ))}
      </div>

      <div className={`mt-12 text-center transition-opacity duration-1000 ${stage >= products.length ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-bold gold-text tracking-widest mb-4">SHARJAYS</h1>
        <h2 className="text-xl md:text-2xl text-white/80 mb-8 italic">Premium Printing & Apparel</h2>
        <button
          onClick={onEnter}
          className="gold-button px-12 py-4 rounded-full text-xl font-bold uppercase tracking-tighter"
        >
          Click to Enter
        </button>
      </div>

      <div className="absolute bottom-8 text-white/40 text-sm">
        Created and owned by: George Walker Jay Jay
      </div>
    </div>
  );
};

export default Splash;
