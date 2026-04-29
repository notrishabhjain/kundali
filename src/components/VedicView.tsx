import React from 'react';
import { PLANET_DICT, RASHIS } from '../lib/jainData';

export function VedicView({ chart, lang }: { chart: any, lang: 'en'|'hi' }) {
  const getHouseSign = (h: number) => {
    const signs = lang === 'hi' 
      ? ['व्यक्तित्व (Ascendant)', 'धन (Wealth)', 'साहस (Courage)', 'माता/सुख (Home/Mother)', 'संतान/शिक्षा (Children/Intellect)', 'रोग/शत्रु (Enemies/Debts)', 'विवाह/साझेदारी (Marriage)', 'आयु/बाधा (Transformation)', 'धर्म (Dharma)', 'कर्म/करियर (Career)', 'लाभ (Gains)', 'व्यय (Losses)']
      : ['Personality', 'Wealth', 'Courage', 'Home/Mother', 'Children/Intellect', 'Enemies/Debts', 'Marriage', 'Transformation', 'Dharma', 'Career', 'Gains', 'Losses'];
    return signs[h-1] || '';
  };

  const VEDIC_DEITIES: Record<string, { hi: string, en: string, mantra: string }> = {
    Su: { hi: "भगवान शिव / सूर्य देव", en: "Lord Shiva / Surya", mantra: "ॐ सूर्याय नमः (Om Suryaya Namah)" },
    Mo: { hi: "माता गौरी / शिव", en: "Goddess Gauri / Shiva", mantra: "ॐ सोमाय नमः (Om Somaya Namah)" },
    Ma: { hi: "भगवान हनुमान / कार्तिकेय", en: "Lord Hanuman / Kartikeya", mantra: "ॐ भौमाय नमः (Om Bhaumaya Namah)" },
    Me: { hi: "भगवान विष्णु", en: "Lord Vishnu", mantra: "ॐ बुधाय नमः (Om Budhaya Namah)" },
    Ju: { hi: "भगवान शिव / दत्तात्रेय", en: "Lord Shiva / Dattatreya", mantra: "ॐ बृहस्पतये नमः (Om Brihaspataye Namah)" },
    Ve: { hi: "माता लक्ष्मी / दुर्गा", en: "Goddess Lakshmi / Durga", mantra: "ॐ शुक्राय नमः (Om Shukraya Namah)" },
    Sa: { hi: "भगवान हनुमान / शनि देव", en: "Lord Hanuman / Shani Dev", mantra: "ॐ शनैश्चराय नमः (Om Shanaishcharaya Namah)" },
    Ra: { hi: "माता दुर्गा / सरस्वती", en: "Goddess Durga / Saraswati", mantra: "ॐ राहवे नमः (Om Rahave Namah)" },
    Ke: { hi: "भगवान गणेश", en: "Lord Ganesha", mantra: "ॐ केतवे नमः (Om Ketave Namah)" }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
        <h3 className="text-xl font-serif font-bold text-orange-800 mb-3 border-b border-gray-200 pb-2">
          {lang === 'hi' ? 'वैदिक ज्योतिष सत्यापन (Vedic Validation)' : 'Vedic Validation'}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6 bg-orange-50 p-3 rounded leading-relaxed border border-orange-100">
          {lang === 'hi' 
            ? 'विशुद्ध वैदिक ज्योतिष (पाराशर पद्धति) के अनुसार आपके ग्रहों की स्थिति और वर्तमान विंशोत्तरी दशा का विश्लेषण। यद्यपि गणितीय गणनाएं समान हैं, किंतु यहां वैदिक देवी-देवताओं व वैदिक बीज मंत्रों से निवारण प्रस्तुत किया गया है।' 
            : 'Analysis of your planetary placements and Vimshottari dasha according to pure Vedic Astrology (Parashari system). While mathematical calculations remain the same, remedies are mapped to Vedic deities and mantras.'}
        </p>

        <h4 className="font-bold text-lg mb-4 text-gray-800 border-b pb-1">
          {lang === 'hi' ? 'नवग्रह वैदिक अवस्थाएं (Nine Planets Condition)' : 'Navagraha Condition (Vedic)'}
        </h4>

        <div className="space-y-4 mb-8">
          {chart.planetsParsed.map((p: any) => {
            const isPos = p.state === 'Exalted' || p.state === 'Own Sign';
            const isNeg = p.state === 'Debilitated' || p.house === 6 || p.house === 8 || p.house === 12;
            const statusLabel = isNeg ? (lang==='hi'?'अशुभ/पाप प्रभाव':'Malefic / Challenging') : isPos ? (lang==='hi'?'शुभ/बली':'Benefic / Strong') : (lang==='hi'?'सम':'Neutral');
            const statusColor = isNeg ? 'bg-red-50 border-red-200 text-red-800' : isPos ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-700';
            const deity = VEDIC_DEITIES[p.pid]?.[lang];
            const pInfo = PLANET_DICT[p.pid]?.[lang];

            return (
              <div key={p.pid} className={`p-4 border rounded shadow-sm ${statusColor}`}>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-sm">
                      {PLANET_DICT[p.pid]?.sym}
                    </span>
                    <div>
                      <h5 className="font-bold text-lg">
                        {pInfo.n} 
                        <span className="text-xs ml-2 uppercase tracking-widest font-mono font-normal opacity-80 border-l border-current pl-2">
                          {p.state}
                        </span>
                      </h5>
                      <p className="text-xs mt-1">
                        {lang === 'hi' ? `भाव: ${p.house} (${getHouseSign(p.house)})` : `House: ${p.house} (${getHouseSign(p.house)})`}
                      </p>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="font-bold text-sm bg-white/60 px-3 py-1 rounded inline-block uppercase tracking-wider border border-white">
                      {statusLabel}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2 border-t border-black/10 pt-3">
                  <div>
                    <strong className="block uppercase tracking-widest opacity-80 mb-1">{lang === 'hi' ? 'वैदिक इष्ट/आराध्य' : 'Vedic Deity'}</strong>
                    <p className="font-bold text-gray-900 mb-2">{deity}</p>
                    
                    <strong className="block uppercase tracking-widest opacity-80 mb-1">{lang === 'hi' ? 'मंत्र (Mantra)' : 'Mantra'}</strong>
                    <p className="font-mono bg-white/50 p-2 rounded text-red-900 font-bold mb-1">{VEDIC_DEITIES[p.pid]?.mantra}</p>
                    <p className="font-mono bg-white/50 p-2 rounded text-orange-900 font-bold">{pInfo.vMantra}</p>
                  </div>
                  <div>
                    <strong className="block uppercase tracking-widest opacity-80 mb-1">{lang === 'hi' ? 'वैदिक फलादेश (Vedic Interpretation)' : 'Vedic Interpretation'}</strong>
                    <p className="font-mono bg-white/50 p-2 rounded leading-relaxed text-gray-800">
                      {isNeg ? (lang==='hi'?'यह ग्रह कुंडली में पीड़ित अवस्था में है। इससे संबंधित भाव व कारकों में विलंब, रोग अथवा संघर्ष आ सकते हैं।':'This planet is afflicted. Expect delays, health issues, or struggles in matters core to this planet and house.') 
                        : isPos ? (lang==='hi'?'यह ग्रह बली अवस्था में है। यह जीवन में सुख, सफलता और समृद्धि प्रदान करेगा।':'This planet is strongly placed and will provide happiness, success, and prosperity in its areas.') 
                        : (lang==='hi'?'यह ग्रह सम अवस्था में है। गोचर और दशा के अनुसार इसके फल मध्यम रहेंगे।':'This planet is neutrally placed. Results will be moderate, depending on transit and Dasha.')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h4 className="font-bold text-lg mb-4 text-gray-800 border-b pb-1 mt-8">
          {lang === 'hi' ? 'वैदिक विंशोत्तरी दशा (Vedic Vimshottari)' : 'Vedic Vimshottari Dasha'}
        </h4>

        <div className="bg-white p-5 border border-gray-200 rounded shadow-sm">
           {(() => {
              const today = new Date();
              const currentDasha = chart.dashas.find((d:any) => d.start <= today && d.end > today) || chart.dashas[0];
              const dInfo = PLANET_DICT[currentDasha.lord]?.[lang];
              const vDeity = VEDIC_DEITIES[currentDasha.lord]?.[lang];
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl bg-orange-50 w-16 h-16 flex items-center justify-center rounded-full shadow-sm">{PLANET_DICT[currentDasha.lord]?.sym}</span>
                    <div>
                      <strong className="text-xl text-orange-900">{dInfo.n} {lang==='hi'?'महादशा':'Mahadasha'}</strong>
                      <p className="text-sm font-mono text-gray-500 mt-1">
                        {currentDasha.start.getFullYear()} - {currentDasha.end.getFullYear()} ({currentDasha.years} {lang==='hi'?'वर्ष':'Years'})
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded leading-relaxed border border-gray-200">
                    {lang === 'hi' 
                      ? `वर्तमान समय में आप पर ${dInfo.n} की विंशोत्तरी महादशा है। वैदिक ज्योतिष के अनुरूप इस समय आपको ${vDeity} की नित्य आराधना करनी चाहिए। महादशा नाथ ही सम्पूर्ण घटनाक्रम का मुख्य नियंता होता है।` 
                      : `You are currently in the Vimshottari Mahadasha of ${dInfo.n}. According to Vedic astrology, you should worship ${vDeity} daily. The Mahadasha Lord is the prime controller of major life events during this period.`}
                  </p>
                </div>
              );
           })()}
        </div>

      </div>
    </div>
  );
}
