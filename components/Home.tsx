
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_IMAGES } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const products = Object.entries(PRODUCT_IMAGES);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold gold-text mb-4 uppercase">Choose Your Canvas</h1>
        <p className="text-white/70 max-w-2xl mx-auto">Select a product below to start designing your custom masterpiece in our professional Design Studio.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(([name, img]) => (
          <div 
            key={name}
            className="group relative bg-zinc-900 border-2 border-transparent hover:border-[#D4AF37] rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
            onClick={() => navigate('/studio', { state: { productType: name } })}
          >
            <div className="aspect-square p-8 flex items-center justify-center bg-white/5">
              <img src={img} alt={name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 bg-black border-t border-zinc-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">{name}</h3>
                <p className="text-xs gold-text opacity-70">Starting from $19.99</p>
              </div>
              <button className="gold-button w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 gold-trim p-12 rounded-2xl bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold gold-text mb-6">WHY SHARJAYS?</h2>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="gold-text mt-1 text-xl">✓</span>
                <p><span className="font-bold text-white">Premium Quality:</span> We use only the finest cotton and high-grade polyester for sublimation.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="gold-text mt-1 text-xl">✓</span>
                <p><span className="font-bold text-white">Expert Design Tools:</span> Our studio gives you total control with 3D effects, arcs, and layering.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="gold-text mt-1 text-xl">✓</span>
                <p><span className="font-bold text-white">Local Pride:</span> Family owned and operated by George Walker Jay Jay in Lancaster, CA.</p>
              </li>
            </ul>
          </div>
          <div className="text-center bg-black/50 p-8 rounded-xl gold-trim backdrop-blur-sm">
            <p className="text-white mb-2">Have a special order?</p>
            <p className="text-2xl font-bold gold-text mb-4">661-349-9903</p>
            <p className="text-xs text-white/50">Ask for George</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
