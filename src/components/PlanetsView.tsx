import React from 'react';
import { PLANET_DICT, RASHIS } from '../lib/jainData';

export function PlanetsView({ chart, lang }: { chart: any, lang: 'en'|'hi' }) {
  const getHouseSign = (h: number) => {
    const signs = lang === 'hi' 
      ? ['व्यक्तित्व (Personality)', 'धन (Wealth)', 'साहस (Courage)', 'माता/सुख (Home/Mother)', 'संतान/शिक्षा (Children/Intellect)', 'रोग/शत्रु (Enemies/Debts)', 'विवाह/साझेदारी (Marriage)', 'आयु/बाधा (Transformation)', 'धर्म (Dharma)', 'कर्म/करियर (Career)', 'लाभ (Gains)', 'व्यय (Losses)']
      : ['Personality', 'Wealth', 'Courage', 'Home/Mother', 'Children/Intellect', 'Enemies/Debts', 'Marriage', 'Transformation', 'Dharma', 'Career', 'Gains', 'Losses'];
    return signs[h-1] || '';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-[#800000]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#800000] mb-3 border-b border-gray-200 pb-1">
          {lang === 'hi' ? 'नवग्रह और तीर्थंकर संबंध (Navagraha & Tirthankaras)' : 'Navagraha & Tirthankaras'}
        </h3>
        
        <p className="text-xs text-gray-600 mb-4 bg-[#FCF9F1] p-3 border border-[#D4AF37]/50 rounded leading-relaxed">
          {lang === 'hi' 
            ? 'जैन ज्योतिष में ग्रह इष्ट या अनिष्ट फल देते हैं। सकारात्मक ग्रह (उच्च, स्वराशि) सफलता देते हैं, जबकि नकारात्मक ग्रह (नीच) चुनौतियां लाते हैं। संबंधित तीर्थंकर की पूजा से प्रतिकूल प्रभावों को दूर किया जा सकता है।' 
            : 'In Jain Jyotish, positive planets (Exalted, Own Sign) bring success, while negative ones (Debilitated) bring karmic challenges. Worshipping the associated Tirthankara mitigates adverse effects.'}
        </p>

        <div className="space-y-4">
          {chart.planetsParsed.map((p: any) => {
            const isPos = p.state === 'Exalted' || p.state === 'Own Sign';
            const isNeg = p.state === 'Debilitated' || p.house === 6 || p.house === 8 || p.house === 12;
            const statusLabel = isNeg ? (lang==='hi'?'चुनौतीपूर्ण (Negative)':'Challenging') : isPos ? (lang==='hi'?'सकारात्मक (Positive)':'Positive') : (lang==='hi'?'सामान्य (Neutral)':'Neutral');
            const statusColor = isNeg ? 'bg-red-50 border-red-200 text-red-800' : isPos ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-700';

            return (
              <div key={p.pid} className={`p-4 border rounded shadow-sm ${statusColor}`}>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/50 pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-sm">
                      {PLANET_DICT[p.pid]?.sym}
                    </span>
                    <div>
                      <h4 className="font-bold text-lg font-serif">
                        {PLANET_DICT[p.pid]?.[lang].n} 
                        <span className="text-xs ml-2 uppercase tracking-widest font-mono font-normal opacity-70">
                          {p.state}
                        </span>
                      </h4>
                      <p className="text-xs font-bold mt-1 opacity-80 uppercase tracking-widest">
                        {lang === 'hi' ? 'तीर्थंकर:' : 'Tirthankara:'} {PLANET_DICT[p.pid]?.[lang].tirth}
                      </p>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="font-bold text-sm bg-white/50 px-3 py-1 rounded inline-block uppercase tracking-wider border border-white">
                      {statusLabel}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <strong className="block uppercase tracking-widest opacity-70 mb-1">{lang === 'hi' ? 'जीवन क्षेत्र पर प्रभाव (Life Area Impact)' : 'Life Area Impact'}</strong>
                    <p className="font-mono bg-white/40 p-2 rounded leading-relaxed">
                      {PLANET_DICT[p.pid]?.[lang].n} {lang === 'hi' ? `भाव ${p.house} में है (${getHouseSign(p.house)})।` : `is in House ${p.house} (${getHouseSign(p.house)}).`} 
                      {isNeg ? (lang==='hi'?' इस क्षेत्र में संघर्ष और रुकावटों का सामना करना पड़ सकता है।':' Expect struggles and karmic blocks in this area.') : isPos ? (lang==='hi'?' इस क्षेत्र में सहज सफलता और लाभ मिलेगा।':' Expect natural success and favor in this area.') : (lang==='hi'?' इस क्षेत्र में परिणाम आपके पुरुषार्थ पर निर्भर करेंगे।':' Results here depend heavily on your own efforts (Purushartha).')}
                    </p>
                  </div>
                  <div>
                    <strong className="block uppercase tracking-widest opacity-70 mb-1">{lang === 'hi' ? 'उपाय एवं साधना (Remedy)' : 'Remedy & Sadhana'}</strong>
                    <p className="font-mono bg-white/40 p-2 rounded leading-relaxed mb-1">
                      {PLANET_DICT[p.pid]?.[lang].ritual} <br/> 
                      <strong>Jaap:</strong> {PLANET_DICT[p.pid]?.[lang].count}
                    </p>
                    <div className="bg-[#800000]/5 p-2 rounded border border-[#800000]/10 mt-2">
                      <p className="text-[10px] uppercase font-bold text-[#800000] mb-0.5">{lang === 'hi' ? 'जैन मंत्र (Jain Mantra)' : 'Jain Mantra'}</p>
                      <p className="text-red-900 font-bold text-[11px] leading-tight break-words">{PLANET_DICT[p.pid]?.[lang].mantra}</p>
                    </div>
                    <div className="bg-[#D4AF37]/10 p-2 rounded border border-[#D4AF37]/30 mt-1">
                      <p className="text-[10px] uppercase font-bold text-[#800000] mb-0.5">{lang === 'hi' ? 'वैदिक बीज मंत्र (Vedic Beej Mantra)' : 'Vedic Beej Mantra'}</p>
                      <p className="text-orange-900 font-bold text-[11px] leading-tight break-words">{PLANET_DICT[p.pid]?.[lang].vMantra}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
