import React from 'react';
import { RASHIS, PLANET_DICT } from '../lib/jainData';

function NorthIndianChart({ lagnaRashi, planetsParsed, lang }: any) {
  const S = 100;
  const H = S * 4;
  const W = S * 4;
  const cx = W / 2;
  const cy = H / 2;

  const houses = [
    { num: 1, x: cx, y: cy - S },
    { num: 2, x: cx - S / 2, y: cy - S * 1.5 },
    { num: 3, x: cx - S, y: cy - S },
    { num: 4, x: cx - S, y: cy },
    { num: 5, x: cx - S, y: cy + S },
    { num: 6, x: cx - S / 2, y: cy + S * 1.5 },
    { num: 7, x: cx, y: cy + S },
    { num: 8, x: cx + S / 2, y: cy + S * 1.5 },
    { num: 9, x: cx + S, y: cy + S },
    { num: 10, x: cx + S, y: cy },
    { num: 11, x: cx + S, y: cy - S },
    { num: 12, x: cx + S / 2, y: cy - S * 1.5 },
  ];

  const rashiNames = lang === 'hi' ? 
    ['मेष','वृष','मिथु','कर्क','सिंह','कन्या','तुला','वृश्चि','धनु','मकर','कुंभ','मीन'] : 
    ['Ari','Tau','Gem','Can','Leo','Vir','Lib','Sco','Sag','Cap','Aqu','Pis'];

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-md mx-auto aspect-square bg-gray-50 rounded border-2 border-[#800000] shadow-inner mb-4">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#800000] stroke-current">
          <line x1="0" y1="0" x2="400" y2="400" strokeWidth="2" />
          <line x1="400" y1="0" x2="0" y2="400" strokeWidth="2" />
          <line x1="200" y1="0" x2="400" y2="200" strokeWidth="2" />
          <line x1="400" y1="200" x2="200" y2="400" strokeWidth="2" />
          <line x1="200" y1="400" x2="0" y2="200" strokeWidth="2" />
          <line x1="0" y1="200" x2="200" y2="0" strokeWidth="2" />

          {houses.map(h => {
            const rashi = (lagnaRashi + h.num - 2) % 12;
            const pts = planetsParsed.filter((p: any) => p.house === h.num);
            return (
              <g key={h.num}>
                <text x={h.x} y={h.num === 1 ? h.y - 45 : (h.num===4||h.num===10||h.num===7) ? h.y-35 : h.y - 20} textAnchor="middle" className="text-[10px] font-bold opacity-50">
                  {rashi + 1}
                </text>
                <text x={h.x} y={h.y} textAnchor="middle" className="text-[12px] font-bold">
                  {pts.map((p: any, i: number) => (
                    <tspan key={p.pid} fill={p.pid === 'Ra' || p.pid === 'Ke' || p.pid === 'Ma' ? '#b91c1c' : '#800000'} dx={i > 0 ? 5 : 0}>
                      {PLANET_DICT[p.pid]?.sym}
                    </tspan>
                  ))}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="bg-[#FCF9F1] p-3 rounded border border-gray-200 text-xs text-gray-700 text-center">
        <p>{lang === 'hi' ? 'यह आपकी लग्न कुण्डली है। पहले भाव (शीर्ष केंद्र) में उदय होने वाली राशि और अन्य भावों में ग्रहों की स्थिति कर्म ढ़ांचे को दर्शाती है।' : 'This is your Lagna Kundali. The sign rising in the 1st House (top center) and planet placements outline your karmic blueprint.'}</p>
      </div>
    </div>
  );
}

export function KundaliView({ chart, lang, userData }: { chart: any, lang: 'en'|'hi', userData: any }) {
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-4 rounded border border-gray-200 shadow-sm">
        <div>
          <h2 className="font-bold text-xl text-[#800000] font-serif">{userData.name}</h2>
          <p className="text-gray-500 text-xs font-mono">{userData.date} | {userData.time}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        
        <div>
          <h3 className="font-serif italic text-lg text-[#800000] mb-4 text-center border-b pb-2 border-gray-200">
            {lang === 'hi' ? 'जैन जन्म कुण्डली' : 'Jain Janma Kundali'}
          </h3>
          <NorthIndianChart lagnaRashi={chart.lagnaRashi} planetsParsed={chart.planetsParsed} lang={lang} />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm border-l-4 border-[#800000]">
            <h4 className="font-bold text-[#800000] text-xs uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
              {lang==='hi'?'पंचांग एवं नक्षत्र (Panchang)':'Panchang & Nakshatra'}
            </h4>
            <div className="grid grid-cols-2 gap-y-3 text-xs font-mono">
              <span className="text-gray-600">{lang==='hi'?'नक्षत्र / दशा':'Nakshatra / Dasha'}:</span> 
              <span className="font-bold text-gray-900">{chart.moonNakshatra.n} ({PLANET_DICT[chart.moonNakshatra.l]?.[lang].n} Dasha)</span>
              
              <span className="text-gray-600">{lang==='hi'?'तीर्थंकर स्वामी':'Tirthankara Lord'}:</span> 
              <span className="font-bold text-gray-900">{PLANET_DICT[chart.moonNakshatra.l]?.[lang].tirth}</span>
              
              <span className="text-gray-600">{lang==='hi'?'लग्न राशि':'Lagna (Ascendant)'}:</span> 
              <span className="font-bold text-gray-900">{RASHIS[chart.lagnaRashi - 1][lang]}</span>

              <span className="text-gray-600">{lang==='hi'?'चंद्र राशि':'Moon Sign'}:</span> 
              <span className="font-bold text-gray-900">{RASHIS[Math.floor(chart.sidereal['Mo']/30)][lang]}</span>
            </div>
            <p className="text-[10px] mt-3 text-gray-500 italic bg-gray-50 p-2 border border-gray-100 rounded">
              {lang === 'hi' ? 'दिगंबर मान्यतानुसार जन्म नक्षत्र से आपकी जन्मकालिक दशा निर्धारित होती है और संबंधित तीर्थंकर की उपासना से कर्म निर्जरा संभव है।' : 'In Digambar tradition, your birth Nakshatra determines your starting Dasha, and worshipping the associated Tirthankara brings karmic liberation (Nirjara).'}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm border-l-4 border-[#D4AF37]">
            <h4 className="font-bold text-[#800000] text-xs uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
              {lang==='hi'?'ग्रहावस्था (Planetary Status)':'Graha Avastha (Planetary Status)'}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="text-gray-500 uppercase tracking-widest border-b border-gray-200">
                    <th className="pb-2">{lang==='hi'?'ग्रह':'Planet'}</th>
                    <th className="pb-2">{lang==='hi'?'भाव':'Hse'}</th>
                    <th className="pb-2">{lang==='hi'?'स्थिति':'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {chart.planetsParsed.map((p:any) => (
                    <tr key={p.pid}>
                      <td className="py-2 font-bold text-gray-900 flex items-center gap-1">
                        {PLANET_DICT[p.pid]?.sym} {PLANET_DICT[p.pid]?.[lang].n || p.pid}
                      </td>
                      <td className="py-2">{p.house}</td>
                      <td className="py-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          p.state === 'Exalted' ? 'bg-green-100 text-green-800' :
                          p.state === 'Debilitated' ? 'bg-red-100 text-red-800' :
                          p.state === 'Own Sign' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {p.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
