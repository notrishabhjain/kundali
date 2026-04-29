import React from 'react';
import { PLANET_DICT, LIFE_AREA_REMEDIES } from '../lib/jainData';

export function PredictionsView({ chart, lang }: { chart: any, lang: 'en'|'hi' }) {
  const getHouseSignification = (h: number) => {
    switch(h) {
      case 1: return lang==='hi' ? 'व्यक्तित्व और स्वास्थ्य' : 'Personality & Health';
      case 2: return lang==='hi' ? 'धन और परिवार' : 'Wealth & Family';
      case 4: return lang==='hi' ? 'सुख और माता' : 'Comforts & Mother';
      case 7: return lang==='hi' ? 'विवाह और साझेदारी' : 'Marriage & Partnerships';
      case 10: return lang==='hi' ? 'करियर और सफलता' : 'Career & Success';
      case 11: return lang==='hi' ? 'आय और लाभ' : 'Income & Gains';
      case 6: case 8: return lang==='hi' ? 'शारीरिक कष्ट (रोग)' : 'Disease & Struggles';
      default: return lang==='hi' ? 'कर्म और जीवन मार्ग' : 'Karma & Life Path';
    }
  };

  const getRemedyForArea = (h: number) => {
    if (h === 10 || h === 11) return LIFE_AREA_REMEDIES['career'];
    if (h === 2 || h === 4) return LIFE_AREA_REMEDIES['wealth'];
    if (h === 7) return LIFE_AREA_REMEDIES['relationships'];
    if (h === 1 || h === 6 || h === 8) return LIFE_AREA_REMEDIES['health'];
    return LIFE_AREA_REMEDIES['protection'];
  };

  const keyHouses = [1, 2, 4, 7, 10, 11, 6, 8];
  const predictions = keyHouses.map(h => {
    const planetsInHouse = chart.planetsParsed.filter((p:any) => p.house === h);
    return { house: h, planets: planetsInHouse };
  }).filter(group => group.planets.length > 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-[#800000]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#800000] mb-3 border-b border-[#D4AF37] pb-1">
          {lang==='hi'?'जीवन क्षेत्रों का विस्तृत विश्लेषण (Consolidated Life Areas Analysis)':'Consolidated Life Areas Analysis'}
        </h3>
        
        <p className="text-xs text-gray-600 max-w-4xl leading-relaxed mb-6 bg-[#FCF9F1] p-3 border border-gray-200 rounded">
          {lang==='hi' ? 'विभिन्न भावों में स्थित ग्रह आपके जीवन के विभिन्न क्षेत्रों को प्रभावित करते हैं। यह खंड आपके वर्तमान जीवन की स्थिति, भविष्य की चुनौतियों, मूल कर्मों (कारणों) और उनके विस्तृत पारंपरिक (Conventional) एवं तांत्रिक/अपरंपरागत (Non-Conventional) उपायों का समेकित विश्लेषण प्रस्तुत करता है।' : 'Planets situated in different houses deeply impact specific areas of your life. This section consolidates your current state, future challenges, root karmic causes, and provides detailed conventional and non-conventional (Tantric) remedies to resolve them.'}
        </p>

        <div className="space-y-8">
          {predictions.map((group, i) => {
            const remedy = getRemedyForArea(group.house);
            const rData = remedy?.[lang];
            
            return (
              <div key={i} className="border-2 border-gray-100 rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <h4 className="font-bold text-lg text-[#800000] border-l-4 border-[#D4AF37] pl-3">
                    {rData?.title || getHouseSignification(group.house)} <span className="text-sm font-normal text-gray-500 font-mono ml-2">(House {group.house})</span>
                  </h4>
                  <div className="flex gap-2 text-xl bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                    {group.planets.map((p:any) => PLANET_DICT[p.pid]?.sym)}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col gap-6">
                  {/* Current State & Astrological Factors */}
                  <div>
                    <h5 className="text-[11px] uppercase tracking-widest font-bold text-gray-500 mb-3 border-b border-gray-100 pb-1">
                      {lang==='hi'?'वर्तमान ग्रह स्थिति (Current Astrological State)':'Current Astrological State'}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {group.planets.map((p:any) => (
                        <div key={p.pid} className="flex gap-3 items-start bg-gray-50 p-3 rounded border border-gray-100">
                          <span className="text-3xl">{PLANET_DICT[p.pid]?.sym}</span>
                          <div>
                            <div className="font-bold text-sm text-[#800000] mb-1">
                              {PLANET_DICT[p.pid]?.[lang].n} <span className="text-[10px] text-gray-500 px-1 border bg-white border-gray-200 rounded ml-1">{p.state}</span>
                            </div>
                            <p className="text-[11px] text-gray-700 leading-relaxed font-mono">
                              {p.state === 'Exalted' || p.state === 'Own Sign' 
                                ? (lang==='hi'?`${PLANET_DICT[p.pid]['hi'].n} अपनी मजबूत अवस्था में है, जो इस क्षेत्र में प्राकृतिक सफलता और सुरक्षा प्रदान करता है।`:`Strong ${PLANET_DICT[p.pid]['en'].n} provides natural success and protection here.`)
                                : p.state === 'Debilitated' 
                                ? (lang==='hi'?`${PLANET_DICT[p.pid]['hi'].n} नीच का होने के कारण इस क्षेत्र में भारी कर्म बाधाएं और अचानक चुनौतियां लाता है।`:`Debilitated ${PLANET_DICT[p.pid]['en'].n} brings heavy karmic blocks and sudden challenges here.`)
                                : (lang==='hi'?`${PLANET_DICT[p.pid]['hi'].n} सामान्य स्थिति में है, परिणाम पूरी तरह से आपके वर्तमान पुरुषार्थ (प्रयासों) पर निर्भर करेंगे।`:`Average state. Results will depend entirely on your current Purushartha (efforts).`)
                              }
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Cause (Karmic Blueprint) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FCF9F1]/50 p-4 rounded border border-[#D4AF37]/20">
                     <div>
                        <h5 className="text-[11px] uppercase tracking-widest font-bold text-red-800 mb-2">
                          <span className="mr-1">⚠️</span> {lang==='hi'?'भविष्य की चुनौतियाँ एवं प्रभाव':'Future Challenges & Impact'}
                        </h5>
                        <p className="text-xs text-gray-800 leading-relaxed bg-white p-3 rounded shadow-sm border border-red-50">
                          {rData?.impact}
                        </p>
                     </div>
                     <div>
                        <h5 className="text-[11px] uppercase tracking-widest font-bold text-[#800000] mb-2">
                          <span className="mr-1">🌀</span> {lang==='hi'?'कर्म कारण (Root Cause)':'Karmic Root Cause'}
                        </h5>
                        <p className="text-xs text-gray-800 leading-relaxed bg-white p-3 rounded shadow-sm border border-[#D4AF37]/20">
                          {rData?.cause}
                        </p>
                     </div>
                  </div>

                  {/* Remedies Section */}
                  <div>
                    <h5 className="text-[11px] uppercase tracking-widest font-bold text-[#800000] mb-4 border-b border-gray-100 pb-1">
                      {lang==='hi'?'विस्तृत अनुष्ठान एवं उपाय (Comprehensive Remedies)':'Comprehensive Remedies'}
                    </h5>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Conventional */}
                      <div className="md:w-1/2 p-4 bg-white border border-gray-200 rounded shadow-sm">
                        <div className="inline-block px-2 text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] border border-[#D4AF37] rounded mb-3">
                           {lang==='hi'?'पारम्परिक (Conventional)':'Conventional Method'}
                        </div>
                        <h6 className="font-bold text-gray-900 mb-2">{rData?.conventional?.method}</h6>
                        <div className="space-y-3 text-xs">
                          <div>
                            <strong className="text-gray-500 block mb-1">{lang==='hi'?'प्रक्रिया (Process):':'Process:'}</strong>
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-2 rounded">{rData?.conventional?.process}</p>
                          </div>
                          <div>
                            <strong className="text-gray-500 block mb-1">{lang==='hi'?'अवधि (Duration):':'Duration:'}</strong>
                            <p className="text-gray-800 font-mono">{rData?.conventional?.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Non-Conventional */}
                      <div className="md:w-1/2 p-4 bg-[#FFFDF8] border border-[#D4AF37]/50 rounded shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">ॐ</div>
                        <div className="inline-block px-2 text-[10px] uppercase font-bold tracking-widest text-white bg-[#800000] rounded mb-3">
                           {lang==='hi'?'तांत्रिक साधना (Non-Conventional)':'Non-Conventional / Tantric'}
                        </div>
                        <h6 className="font-bold text-[#800000] mb-2">{rData?.nonConventional?.method}</h6>
                        <div className="space-y-3 text-xs">
                          <div>
                            <strong className="text-gray-500 block mb-1">{lang==='hi'?'यंत्र एवं देव (Yantra & Deity):':'Yantra & Deity:'}</strong>
                            <div className="flex flex-wrap gap-2">
                               <span className="bg-white border text-[#800000] border-gray-200 px-2 py-1 rounded">{rData?.deity}</span>
                               <span className="bg-white border text-[#800000] border-gray-200 px-2 py-1 rounded">{rData?.yantra}</span>
                            </div>
                          </div>
                          <div>
                            <strong className="text-gray-500 block mb-1">{lang==='hi'?'मंत्र (Mantra):':'Mantra:'}</strong>
                            <div className="bg-white p-2 rounded border border-gray-200 font-bold text-red-800 text-center text-sm">
                              {rData?.mantra}
                            </div>
                          </div>
                          <div>
                            <strong className="text-gray-500 block mb-1">{lang==='hi'?'विस्तृत प्रक्रिया (Detailed Process):':'Detailed Process:'}</strong>
                            <p className="text-gray-700 leading-relaxed bg-white/50 p-2 rounded border border-[#D4AF37]/20">{rData?.nonConventional?.process}</p>
                          </div>
                          <div>
                            <strong className="text-gray-500 block mb-1">{lang==='hi'?'अवधि (Duration):':'Duration:'}</strong>
                            <p className="text-gray-800 font-mono">{rData?.nonConventional?.duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {predictions.length === 0 && (
            <p className="text-sm text-gray-600 p-4">{lang==='hi'?'कोई ग्रह स्थित नहीं। दशा अनुसार उपाय करें।':'No planets in key houses. Follow Dasha remedies.'}</p>
          )}
        </div>
      </div>
    </div>
  );
}

