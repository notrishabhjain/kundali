import React from 'react';

export function ChartHeader({ lang, toggleLang }: { lang: 'en'|'hi', toggleLang: () => void }) {
  return (
    <header className="h-20 bg-[#800000] text-white flex items-center justify-between px-4 md:px-8 shadow-md">
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-[#D4AF37] rounded-full flex items-center justify-center font-bold text-lg md:text-xl italic text-[#D4AF37]">ॐ</div>
        <div>
          <h1 className="text-xl md:text-2xl font-serif leading-tight">
            {lang === 'hi' ? 'जैन ज्योतिष' : 'Jain Jyotish'} <span className="text-xs md:text-sm block font-sans opacity-80">{lang === 'hi' ? 'दिगंबर कर्म विश्लेषण' : 'Cosmology & Karmic Analysis'}</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block bg-white/10 px-4 py-2 rounded border border-white/20 mr-2">
          <span className="text-[10px] uppercase tracking-widest block opacity-70">System Status</span>
          <span className="text-xs font-mono font-bold">SURYA PRAGNAPATI ENGINE</span>
        </div>
        <button 
          onClick={toggleLang}
          className="bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded text-[10px] md:text-xs uppercase tracking-widest font-mono border border-white/20 hover:bg-white/20 transition-colors"
        >
          {lang === 'hi' ? 'EN / English' : 'HI / हिंदी'}
        </button>
      </div>
    </header>
  );
}
