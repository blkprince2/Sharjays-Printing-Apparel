
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '../constants';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <header className="bg-black border-b-4 border-[#D4AF37] py-4 px-6 flex items-center justify-between sticky top-0 z-40">
      <Link to="/" className="flex flex-col">
        <span className="text-3xl font-bold tracking-tighter gold-text leading-none">SHARJAYS</span>
        <span className="text-[10px] text-white tracking-[0.3em] uppercase opacity-80">Printing Apparel</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-white hover:text-[#D4AF37] transition-colors font-semibold uppercase text-sm">Home</Link>
        <Link to="/studio" className="text-white hover:text-[#D4AF37] transition-colors font-semibold uppercase text-sm">Design Studio</Link>
        <Link to="/cart" className="relative group">
          <div className="gold-bg p-2 rounded-full text-black group-hover:bg-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.1-5.43H5.12"/></svg>
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      <div className="md:hidden flex items-center gap-4">
         <Link to="/cart" className="relative">
            <span className="gold-text">🛒</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] rounded-full px-1">{cartCount}</span>}
         </Link>
      </div>
    </header>
  );
};

export default Header;
