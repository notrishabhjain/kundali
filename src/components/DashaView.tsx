import React from 'react';
import { PLANET_DICT, LIFE_AREA_REMEDIES } from '../lib/jainData';

export function DashaView({ chart, lang }: { chart: any, lang: 'en'|'hi' }) {
  const today = new Date();
  const currentMaha = chart.dashas.find((d:any) => d.start <= today && d.end > today) || chart.dashas[0];
  const currentIndex = chart.dashas.findIndex((d:any) => d.lord === currentMaha.lord);
  const futureDashas = chart.dashas.slice(currentIndex + 1, currentIndex + 4); // Next 3 dashas
  
  const getHouseSign = (h: number) => {
    const signs = lang === 'hi' 
      ? ['व्यक्तित्व और स्वास्थ्य', 'धन और परिवार', 'साहस और भाई-बहन', 'सुख और माता', 'संतान और बुद्धि', 'रोग, ऋण और शत्रु', 'विवाह और साझेदारी', 'आयु और बाधाएं', 'धर्म और भाग्य', 'करियर और पिता', 'आय और लाभ', 'व्यय और मोक्ष']
      : ['Personality & Health', 'Wealth & Family', 'Courage & Siblings', 'Comforts & Mother', 'Children & Intellect', 'Disease, Debts & Enemies', 'Marriage & Partnerships', 'Longevity & Obstacles', 'Dharma & Fortune', 'Career & Father', 'Income & Gains', 'Losses & Moksha'];
    return signs[h-1] || '';
  };

  const getRemedyForArea = (h: number) => {
    if (h === 10 || h === 11) return LIFE_AREA_REMEDIES['career'];
    if (h === 2 || h === 4) return LIFE_AREA_REMEDIES['wealth'];
    if (h === 7) return LIFE_AREA_REMEDIES['relationships'];
    if (h === 1 || h === 6 || h === 8) return LIFE_AREA_REMEDIES['health'];
    return LIFE_AREA_REMEDIES['protection'];
  };

  const getDashaImpact = (lord: string) => {
    const planet = chart.planetsParsed.find((p:any) => p.pid === lord);
    if(!planet) return null;
    return {
      house: planet.house,
      houseName: getHouseSign(planet.house),
      state: planet.state,
      remedy: getRemedyForArea(planet.house)?.[lang]
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-[#800000]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#800000] mb-3 border-b border-gray-200 pb-1">
          {lang === 'hi' ? 'विंशोत्तरी महादशा प्रभाव (Vimshottari Dasha Impact)' : 'Vimshottari Dasha Impact'}
        </h3>
        
        <p className="text-xs text-gray-600 mb-6 bg-[#FCF9F1] p-3 border border-[#D4AF37]/50 rounded leading-relaxed">
          {lang === 'hi' 
            ? 'दशा काल यह निर्धारित करता है कि आपके जीवन का कौन सा क्षेत्र (भाव) वर्तमान में सबसे अधिक सक्रिय है। वर्तमान महादशा स्वामी की स्थिति और उसका भाव आपके मुख्य जीवन अनुभवों और चुनौतियों को आकार देते हैं।' 
            : 'The Dasha period determines which life area (House) is currently most active. The position of the Mahadasha Lord and its house heavily shape your primary life experiences and challenges.'}
        </p>

        <div className="mb-10">
          <h4 className="font-serif font-bold text-lg text-green-800 mb-3">{lang === 'hi' ? 'वर्तमान महादशा (Current Dasha)' : 'Current Mahadasha'}</h4>
          <div className="border-2 border-green-200 bg-green-50/30 p-4 md:p-6 rounded shadow-sm">
            <div className="flex items-center gap-4 mb-4 border-b border-green-100 pb-4">
              <span className="text-4xl bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-sm">{PLANET_DICT[currentMaha.lord]?.sym}</span>
              <div>
                <strong className="text-xl text-green-900">{PLANET_DICT[currentMaha.lord]?.[lang].n}</strong>
                <div className="text-sm font-bold text-green-700 bg-green-100/50 inline-block px-2 py-0.5 rounded mt-1">
                  {currentMaha.start.getFullYear()} - {currentMaha.end.getFullYear()} ({currentMaha.years} {lang==='hi'?'वर्ष':'Years'})
                </div>
              </div>
            </div>
            
            {(() => {
              const impact = getDashaImpact(currentMaha.lord);
              return impact && (
                <div className="space-y-4 text-xs">
                  <div className="bg-white p-4 rounded shadow-sm border border-green-100">
                    <strong className="block uppercase tracking-widest text-[#800000] mb-2">{lang === 'hi' ? 'सक्रिय जीवन क्षेत्र (Active Life Area)' : 'Active Life Area Theme'}</strong>
                    <p className="text-gray-800 leading-relaxed text-sm">
                      {PLANET_DICT[currentMaha.lord]?.[lang].n} {lang==='hi' 
                        ? `वर्तमान में आपके भाव ${impact.house} (${impact.houseName}) को सक्रिय कर रहा है। यह ग्रह ${impact.state} अवस्था में है, जो दशा के दौरान इसके परिणामों को प्रभावित करेगा।` 
                        : `is currently activating your House ${impact.house} (${impact.houseName}). The planet is in ${impact.state} state, dictating the intensity of its results during this period.`}
                    </p>
                    {impact.remedy && (
                      <div className="mt-3 bg-red-50 p-3 rounded border border-red-100">
                         <strong className="text-red-800 block mb-1">{lang === 'hi' ? 'संभावित प्रभाव (Potential Impact):' : 'Potential Impact:'}</strong>
                         <p className="text-gray-700">{impact.remedy.impact}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm border border-[#D4AF37]/50">
                      <strong className="block uppercase tracking-widest text-[#D4AF37] mb-2">{lang === 'hi' ? 'पारम्परिक उपाय' : 'Conventional Remedy'}</strong>
                      {impact.remedy ? (
                        <>
                          <div className="font-bold text-gray-900 mb-1">{impact.remedy.conventional.method}</div>
                          <p className="text-gray-700 mb-2 leading-relaxed">{impact.remedy.conventional.process}</p>
                          <div className="font-mono text-gray-500 bg-gray-50 p-1 rounded inline-block">{impact.remedy.conventional.duration}</div>
                        </>
                      ) : (
                        <span className="font-mono text-gray-800">
                          {lang==='hi'?'शांति के लिए':'For peace, worship'} <strong>{PLANET_DICT[currentMaha.lord]?.[lang].tirth}</strong>. <br/>
                          {PLANET_DICT[currentMaha.lord]?.[lang].ritual} ({PLANET_DICT[currentMaha.lord]?.[lang].count})
                        </span>
                      )}
                    </div>
                    
                    <div className="bg-[#FFFDF8] p-4 rounded shadow-sm border border-[#800000]/30 relative overflow-hidden">
                      <div className="absolute -right-2 -top-2 text-4xl opacity-10">ॐ</div>
                      <strong className="block uppercase tracking-widest text-[#800000] mb-2">{lang === 'hi' ? 'तांत्रिक उपाय' : 'Non-Conventional Remedy'}</strong>
                      {impact.remedy ? (
                        <>
                           <div className="font-bold text-[#800000] mb-1">{impact.remedy.nonConventional.method}</div>
                           <p className="font-bold text-red-700 text-[10px] mb-2 bg-red-50 p-1.5 rounded">{impact.remedy.mantra}</p>
                           <p className="text-gray-700 mb-2 leading-relaxed">{impact.remedy.nonConventional.process}</p>
                           <div className="font-mono text-gray-500 bg-white border border-gray-100 p-1 rounded inline-block">{impact.remedy.nonConventional.duration}</div>
                        </>
                      ) : (
                        <p className="text-gray-600">{lang==='hi'?'इस भाव के लिए कोई विशेष तांत्रिक उपाय नहीं है।':'No specific non-conventional remedy required for this house.'}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg text-gray-800 mb-4">{lang === 'hi' ? 'आगामी महादशाएं (Future Dashas)' : 'Future Mahadashas'}</h4>
          <div className="space-y-6">
            {futureDashas.map((d: any, i: number) => {
              const impact = getDashaImpact(d.lord);
              return (
                <div key={i} className="border border-gray-200 bg-white p-4 md:p-5 rounded-lg shadow-sm flex flex-col md:flex-row gap-5 hover:border-[#D4AF37]/50 transition-colors">
                  <div className="md:w-1/4 border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-4 flex md:flex-col justify-between md:justify-center items-center md:items-start">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full border border-gray-100">{PLANET_DICT[d.lord]?.sym}</span>
                      <strong className="text-gray-900 text-lg">{PLANET_DICT[d.lord]?.[lang].n}</strong>
                    </div>
                    <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{d.start.getFullYear()} - {d.end.getFullYear()}</div>
                  </div>
                  
                  <div className="md:w-3/4 flex flex-col justify-center">
                    {impact && (
                      <div className="space-y-3">
                        <div>
                           <strong className="text-xs uppercase tracking-widest text-[#800000] block mb-1">
                             {lang === 'hi' ? 'सक्रिय होने वाला क्षेत्र:' : 'Will Activate:'}
                           </strong>
                           <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">
                             {lang==='hi' ? `भाव ${impact.house} (${impact.houseName})` : `House ${impact.house} (${impact.houseName})`}
                           </p>
                        </div>
                        
                        {impact.remedy && (
                          <div className="bg-[#FCF9F1]/50 p-3 rounded border border-[#D4AF37]/30 text-xs text-gray-700 leading-relaxed">
                            <strong className="text-[#800000] block mb-1">{lang === 'hi' ? 'पूर्व तैयारी एवं उपाय:' : 'Preparatory Remedy:'}</strong>
                            {impact.remedy.conventional.process}
                          </div>
                        )}
                        {!impact.remedy && (
                          <div className="bg-[#FCF9F1]/50 p-3 rounded border border-[#D4AF37]/30 text-xs text-gray-700 leading-relaxed">
                            <strong className="text-[#800000] block mb-1">{lang === 'hi' ? 'पूर्व तैयारी:' : 'Preparatory Action:'}</strong>
                            {lang==='hi' ? `${PLANET_DICT[d.lord]?.[lang].tirth} की आराधना प्रारंभ करें।` : `Begin worship of ${PLANET_DICT[d.lord]?.[lang].tirth}.`}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
