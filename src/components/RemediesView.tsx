import React from 'react';
import { PLANET_DICT, LIFE_AREA_REMEDIES } from '../lib/jainData';
import { Yantra } from './Yantras';

export function RemediesView({ chart, lang }: { chart: any, lang: 'en'|'hi' }) {
  const today = new Date();
  const currentDasha = chart.dashas.find((d:any) => d.start <= today && d.end > today) || chart.dashas[0];
  const dashaPlanet = PLANET_DICT[currentDasha.lord];

  return (
    <div className="space-y-8">
      
      <div className="bg-[#FFFDF8] p-5 md:p-6 rounded-lg shadow-sm border border-[#D4AF37]/40 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-5 text-8xl">ॐ</div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#800000] mb-4 border-b border-[#D4AF37] pb-2">
          {lang === 'hi' ? 'दशा आधारित तीर्थंकर उपाय' : 'Dasha-Based Tirthankara Remedy'}
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-serif font-bold text-[#800000] text-xl mb-1">
              {dashaPlanet?.[lang].tirth} {lang === 'hi' ? 'आराधना' : 'Worship'}
            </h3>
            <p className="text-sm text-gray-500 mb-4 bg-white inline-block px-2 py-1 rounded shadow-sm">
              {lang === 'hi' ? 'दशा स्वामी: ' : 'Dasha Lord: '} <strong>{dashaPlanet?.[lang].n}</strong>
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <span className="font-bold text-gray-700 block mb-1 uppercase tracking-widest">{lang==='hi'?'जाप मंत्र':'Jaap Mantra'}</span>
                <span className="text-red-800 font-bold text-sm bg-red-50 p-2 block rounded text-center border border-red-100">{dashaPlanet?.[lang].mantra}</span>
              </div>
              <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <span className="font-bold text-gray-700 block mb-1 uppercase tracking-widest">{lang==='hi'?'जाप संख्या एवं विधि':'Jaap Count & Ritual'}</span>
                <span className="text-gray-900 block mb-1">{dashaPlanet?.[lang].count}</span>
                <span className="text-gray-600 block">{dashaPlanet?.[lang].ritual}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-4 border-b border-gray-200 pb-2">
          {lang === 'hi' ? 'विशिष्ट जीवन क्षेत्रों के गहन उपाय' : 'Deep Remedies by Life Area'}
        </h3>
        <div className="space-y-6">
          {Object.entries(LIFE_AREA_REMEDIES).map(([k, r]: any) => (
            <div key={k} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-bold text-lg text-[#800000] mb-4 border-l-4 border-[#D4AF37] pl-3">{r[lang].title}</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Conventional Remedy */}
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">#1</span>
                    <div className="inline-block px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-gray-600 border border-gray-300 rounded bg-white">
                      {lang === 'hi' ? 'प्राथमिक सात्विक उपाय' : 'Primary Satvik Approach'}
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-900 mb-2">{r[lang].conventional?.method}</h5>
                  <div className="space-y-3 text-xs">
                    <div>
                      <strong className="text-gray-500 block mb-1">{lang === 'hi' ? 'विधि:' : 'Ritual:'}</strong>
                      <p className="text-gray-800 leading-relaxed bg-white p-2 rounded shadow-sm">{r[lang].conventional?.process}</p>
                    </div>
                    <div>
                      <strong className="text-gray-500 block mb-1">{lang === 'hi' ? 'अवधि:' : 'Duration:'}</strong>
                      <span className="font-mono text-gray-700 bg-white px-2 py-1 rounded shadow-sm">{r[lang].conventional?.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Non Conventional Remedy */}
                <div className="bg-[#FCF9F1] p-4 rounded border border-[#D4AF37]/50 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded">#2</span>
                    <div className="inline-block px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-[#800000] border border-[#D4AF37] rounded bg-white">
                      {lang === 'hi' ? 'तीव्र तांत्रिक साधना' : 'Accelerated Tantric Protocol'}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-3 text-xs">
                      <h5 className="font-bold text-[#800000] mb-2">{r[lang].nonConventional?.method}</h5>
                      <div>
                        <strong className="text-gray-500 block mb-1">{lang === 'hi' ? 'मंत्र:' : 'Mantra:'}</strong>
                        <p className="text-red-800 font-bold bg-white p-2 rounded border border-[#D4AF37]/30 text-center text-[11px] leading-tight break-words shadow-sm">
                          {r[lang].mantra}
                        </p>
                      </div>
                      <div>
                        <strong className="text-gray-500 block mb-1">{lang === 'hi' ? 'यंत्र एवं देव:' : 'Yantra & Deity:'}</strong>
                        <p className="text-gray-900 font-bold">{r[lang].yantra}</p>
                        <p className="text-gray-600">{r[lang].deity}</p>
                      </div>
                      <div>
                        <strong className="text-gray-500 block mb-1">{lang === 'hi' ? 'प्रक्रिया:' : 'Procedure:'}</strong>
                        <p className="text-gray-800 leading-relaxed bg-white p-2 rounded shadow-sm">
                          {r[lang].nonConventional?.process || r[lang].procedure}
                        </p>
                      </div>
                    </div>
                    
                    {/* Yantra Graphic */}
                    <div className="hidden sm:block w-32 shrink-0">
                      <div className="aspect-square bg-white border border-[#D4AF37] rounded flex items-center justify-center p-1 shadow-sm overflow-hidden relative">
                        <Yantra name={r['en'].yantra} />
                      </div>
                      <div className="mt-2 text-center font-bold text-[#800000] text-[10px] leading-tight">
                        {r[lang].yantra}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
