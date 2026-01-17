
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t-2 border-[#D4AF37] pt-12 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold gold-text tracking-tighter">SHARJAYS</h2>
          <p className="text-sm text-white/60">Professional Apparel Printing Studio. Customizing your lifestyle, one print at a time.</p>
          <div className="flex gap-4">
            <span className="gold-text cursor-pointer hover:text-white">FB</span>
            <span className="gold-text cursor-pointer hover:text-white">IG</span>
            <span className="gold-text cursor-pointer hover:text-white">TW</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs uppercase gold-text font-bold tracking-widest">Contact George</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex flex-col">
              <span className="text-white/40 text-[10px] uppercase">Phone</span>
              <span>661-349-9903</span>
            </li>
            <li className="flex flex-col">
              <span className="text-white/40 text-[10px] uppercase">Email</span>
              <span>georgeearlwalker@gmail.com</span>
            </li>
            <li className="flex flex-col">
              <span className="text-white/40 text-[10px] uppercase">Hours</span>
              <span>Mon - Fri, 9am - 6pm</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs uppercase gold-text font-bold tracking-widest">Location</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Lancaster, CA 93534<br />
            United States
          </p>
          <div className="mt-4 p-4 border border-zinc-800 rounded-lg bg-zinc-900/50">
            <p className="text-[10px] text-white/40 uppercase mb-1">Created & Owned By</p>
            <p className="text-sm font-bold text-white uppercase">George Walker Jay Jay</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">© 2024 SHARJAYS PRINTING APPAREL. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 text-[10px] text-white/40 uppercase tracking-widest">
            <span className="hover:text-gold cursor-pointer">Terms</span>
            <span className="hover:text-gold cursor-pointer">Privacy</span>
            <span className="hover:text-gold cursor-pointer">Shipping Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
