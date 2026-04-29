import React from 'react';
import { PLANET_DICT, RASHIS } from '../lib/jainData';

export function PujaView({ chart, lang }: { chart: any, lang: 'en' | 'hi' }) {
  // Use current dasha lord for Puja recommendations
  const today = new Date();
  const currentDasha = chart.dashas.find((d:any) => d.start <= today && d.end > today) || chart.dashas[0];
  const dLrd = currentDasha.lord;

  const NITYA_NIYAM = [
    {
      title: lang === 'hi' ? 'नवकार महामंत्र' : 'Navkar Mahamantra',
      desc: lang === 'hi' 
        ? 'प्रतिदिन 108 बार जाप (1 माला)। यह सभी कर्म बंधनों को काटता है।' 
        : 'Recite 108 times daily. The supreme mantra that destroys all karmic bonds.'
    },
    {
      title: lang === 'hi' ? 'भक्तामर स्तोत्र' : 'Bhaktamar Stotra',
      desc: lang === 'hi' 
        ? '48 श्लोकों का पाठ सभी प्रकार के भयों और रोगों से रक्षा करता है।' 
        : '48 verses of Acharya Manatunga protect from dangers, enemies, and diseases.'
    },
    {
      title: lang === 'hi' ? 'सामायिक' : 'Samayika',
      desc: lang === 'hi' 
        ? 'प्रतिदिन 48 मिनट समता भाव में ध्यान। यह नए कर्मों को रोकता है (संवर)।' 
        : '48-minute equanimity meditation daily. It stops new karma (Samvar).'
    },
  ];

  // Specific dosha anushthan
  const specificPujas = [];
  
  chart.planetsParsed.forEach((p: any) => {
    if (p.state === 'Debilitated') {
      specificPujas.push({
        condition: lang==='hi' ? `नीच ${PLANET_DICT[p.pid]['hi'].n} दोष निवारण` : `Debilitated ${PLANET_DICT[p.pid]['en'].n} Dosha Nivarana`,
        tirth: PLANET_DICT[p.pid]?.[lang].tirth,
        ritual: PLANET_DICT[p.pid]?.[lang].ritual,
        jaap: PLANET_DICT[p.pid]?.[lang].count,
        mantra: PLANET_DICT[p.pid]?.[lang].mantra
      });
    }
    if ([6, 8, 12].includes(p.house)) {
      specificPujas.push({
        condition: lang==='hi' ? `दुस्थान (${p.house}) में ${PLANET_DICT[p.pid]['hi'].n} शांति` : `${PLANET_DICT[p.pid]['en'].n} in ${p.house}H Shanti`,
        tirth: PLANET_DICT[p.pid]?.[lang].tirth,
        ritual: PLANET_DICT[p.pid]?.[lang].ritual,
        jaap: PLANET_DICT[p.pid]?.[lang].count,
        mantra: PLANET_DICT[p.pid]?.[lang].mantra
      });
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-[#D4AF37]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#800000] mb-3 border-b border-gray-200 pb-1">
          {lang === 'hi' ? 'अनुशंसित पूजा पाठ (Personalized Puja & Path)' : 'Personalized Puja & Path'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 bg-[#FCF9F1] border border-[#D4AF37]/50 rounded shadow-inner relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5 text-8xl">ॐ</div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-[#D4AF37]/30 pb-1 inline-block">
              {lang === 'hi' ? 'मुख्य दशा अनुष्ठान' : 'Primary Dasha Anushthan'}
            </p>
            <h4 className="font-serif font-bold text-xl text-[#800000] mb-1">
              {PLANET_DICT[dLrd]?.[lang].tirth} {lang === 'hi' ? 'आराधना' : 'Worship'}
            </h4>
            <p className="text-xs text-gray-700 font-mono mb-3 bg-white/50 inline-block px-2 py-1 rounded">
              {lang === 'hi' ? `वर्तमान दशा: ${PLANET_DICT[dLrd]['hi'].n}` : `Current Dasha: ${PLANET_DICT[dLrd]['en'].n}`}
            </p>
            
            <div className="mt-3 mb-4">
              <span className="font-bold text-gray-700 text-xs block mb-1 uppercase tracking-widest">{lang==='hi'?'मंत्र':'Mantra'}</span>
              <p className="text-red-800 font-bold text-sm bg-white p-2 rounded shadow-sm border border-[#D4AF37]/30">{PLANET_DICT[dLrd]?.[lang].mantra}</p>
            </div>

            <div className="space-y-2 mt-2">
              <div className="text-sm bg-white p-2 rounded shadow-sm border border-gray-100">
                <span className="font-bold text-gray-700 text-xs block mb-1 uppercase tracking-widest">{lang==='hi'?'विधि':'Ritual'}</span>
                <span className="text-gray-900">{PLANET_DICT[dLrd]?.[lang].ritual}</span>
              </div>
              <div className="text-sm bg-white p-2 rounded shadow-sm border border-gray-100">
                <span className="font-bold text-gray-700 text-xs block mb-1 uppercase tracking-widest">{lang==='hi'?'जाप':'Jaap Count'}</span>
                <span className="text-gray-900">{PLANET_DICT[dLrd]?.[lang].count}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-red-100 rounded bg-red-50/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-3 border-b border-red-100 pb-1">
              {lang === 'hi' ? 'विशिष्ट दोष निवारण पूजा' : 'Specific Dosha Nivarana Puja'}
            </h4>
            {specificPujas.length > 0 ? (
              <div className="space-y-4">
                {specificPujas.map((sp, idx) => (
                  <div key={idx} className="bg-white p-4 rounded border border-red-50 shadow-sm relative">
                    <strong className="text-red-800 block mb-2 text-sm">{sp.condition}</strong>
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <span className="px-1.5 py-0.5 bg-[#FCF9F1] rounded text-[#800000] font-bold">दीक्षा:</span>
                      <span className="text-gray-800">{sp.tirth}</span>
                    </div>
                    <div className="bg-red-50 p-2 rounded text-red-800 text-xs font-bold mb-2 text-center border border-red-100">
                      {sp.mantra}
                    </div>
                    <div className="text-gray-600 font-mono text-xs mt-2 pt-2 border-t border-gray-50">
                      {sp.ritual} ({sp.jaap})
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 p-2 bg-white rounded border border-green-100">
                {lang === 'hi' ? 'कुंडली में कोई प्रमुख दोष नहीं पाया गया। केवल मुख्य दशा अनुष्ठान करें।' : 'No major doshas found in the chart. Follow primary Dasha Anushthan only.'}
              </p>
            )}
          </div>
        </div>

        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3 border-b border-gray-100 pb-1">
          {lang === 'hi' ? 'नित्य नियम (Daily Routine)' : 'Nitya Niyam (Daily Routine)'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NITYA_NIYAM.map((n, i) => (
            <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded text-sm hover:shadow-sm transition-shadow">
              <h5 className="font-bold text-gray-900 mb-2 border-l-2 border-[#D4AF37] pl-2">{n.title}</h5>
              <p className="text-xs text-gray-600 leading-relaxed font-mono">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
