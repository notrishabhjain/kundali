import React from 'react';
import { PLANET_DICT, LIFE_AREA_REMEDIES } from '../lib/jainData';
import { Yantra } from './Yantras';

export function RemediesReport({ chart, lang, userData, onReady }: any) {
  React.useEffect(() => {
    // Wait for fonts and svgs
    const t = setTimeout(() => {
      onReady();
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const today = new Date();
  const currentDasha = chart.dashas.find((d:any) => d.start <= today && d.end > today) || chart.dashas[0];
  const dashaLord = currentDasha.lord;
  const dashaPlanetInfo = PLANET_DICT[dashaLord];

  // Logic to find debilitated and dusthana planets
  const debilitatedPlanets = chart.planetsParsed.filter((p: any) => p.state === 'Debilitated');
  const dusthanaPlanets = chart.planetsParsed.filter((p: any) => [6, 8, 12].includes(p.house));

  // De-duplicate if a planet is both
  const mandatoryPlanetsMap = new Map();
  debilitatedPlanets.forEach((p: any) => {
    mandatoryPlanetsMap.set(p.pid, {
      ...PLANET_DICT[p.pid],
      reason: lang === 'hi' ? `नीच अवस्था (जन्म कुण्डली)` : `Debilitated State (Birth Chart)`
    });
  });
  dusthanaPlanets.forEach((p: any) => {
    if (!mandatoryPlanetsMap.has(p.pid)) {
      mandatoryPlanetsMap.set(p.pid, {
        ...PLANET_DICT[p.pid],
        reason: lang === 'hi' ? `दुस्थान - ${p.house} भाव (रोग/बाधा)` : `Dusthana - House ${p.house} (Obstacles)`
      });
    } else {
      const existing = mandatoryPlanetsMap.get(p.pid);
      existing.reason += lang === 'hi' ? ` एवं दुस्थान (${p.house} भाव)` : ` & Dusthana (House ${p.house})`;
      mandatoryPlanetsMap.set(p.pid, existing);
    }
  });

  // Take care not to duplicate dasha lord in mandatory if it's already there
  const isDashaLordMandatory = mandatoryPlanetsMap.has(dashaLord);
  if (isDashaLordMandatory) {
      mandatoryPlanetsMap.delete(dashaLord);
  }
  
  const mandatoryList = Array.from(mandatoryPlanetsMap.values());

  const getPriorityBadge = (type: string) => {
    if (type === 'critical') return <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest">{lang === 'hi' ? 'अति महत्वपूर्ण / तत्काल' : 'Critical / Urgent'}</span>;
    if (type === 'mandatory') return <span className="bg-orange-500 text-white px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest">{lang === 'hi' ? 'अनिवार्य (दोष निवारण)' : 'Mandatory (Dosha Nivarana)'}</span>;
    if (type === 'optional') return <span className="bg-green-600 text-white px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest">{lang === 'hi' ? 'ऐच्छिक (इच्छा पूर्ति)' : 'Optional (Need-Based)'}</span>;
  }

  return (
    <div id="remedies-report-content" className="bg-[#FCF9F1] w-[800px] p-8 flex flex-col gap-8 font-sans mx-auto">
      {/* HEADER */}
      <div className="text-center border-b-2 border-[#800000] pb-4">
         <h1 className="text-3xl font-serif text-[#800000] font-bold">{lang === 'hi' ? 'सम्पूर्ण उपाय एवं अनुष्ठान रिपोर्ट' : 'Comprehensive Remedial & Anushthan Report'}</h1>
         <h2 className="text-xl font-bold mt-2">{userData.name}</h2>
         <p className="text-gray-600 font-mono text-sm mt-1">{userData.date} | {userData.time} | {lang === 'hi' ? 'वर्तमान दशा: ' : 'Running Dasha: '}{dashaPlanetInfo[lang].n}</p>
      </div>

      <div className="text-sm text-gray-700 bg-white p-4 rounded border border-[#D4AF37] shadow-sm italic text-center">
        {lang === 'hi' 
          ? 'इस रिपोर्ट में आपकी कुण्डली के ग्रहों की स्थिति के आधार पर सटीक और प्रामाणिक जैन तांत्रिक/मांत्रिक उपाय दिए गए हैं। इनका निष्ठापूर्वक पालन करने से कर्मों का क्षय और जीवन में शांति प्राप्त होती है।' 
          : 'This report contains precise and authentic Jain Mantric/Tantric remedies based on your planetary placements. Following them with devotion leads to the shedding of karmas and peace in life.'}
      </div>

      {/* 1. CRITICAL (DASHA LORD) */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-600 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4 border-b pb-2 border-gray-100">
           <h3 className="font-serif font-bold text-[#800000] text-xl">1. {lang === 'hi' ? 'वर्तमान महादशा आराधना' : 'Current Mahadasha Worship'}</h3>
           {getPriorityBadge('critical')}
        </div>
        <p className="text-xs text-gray-500 mb-4 bg-red-50 p-2 rounded">
           <strong>{lang === 'hi' ? 'कारण: ' : 'Reason: '}</strong> 
           {lang === 'hi' ? `वर्तमान में आप पर ${dashaPlanetInfo['hi'].n} की महादशा चल रही है, अतः इसके दुष्परिणामों से बचने और शुभ फल पाने के लिए यह सबसे महत्वपूर्ण है।` : `You are currently undergoing the Mahadasha of ${dashaPlanetInfo['en'].n}. It is highly active, making this the most urgent remedy.`}
        </p>

        <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <strong className="text-gray-500 block mb-1 uppercase text-xs tracking-widest">{lang==='hi'?'देव/तीर्थंकर':'Deity/Tirthankara'}</strong>
              <div className="text-gray-900 font-bold text-lg mb-4">{dashaPlanetInfo?.[lang].tirth}</div>
              
              <strong className="text-gray-500 block mb-1 uppercase text-xs tracking-widest">{lang==='hi'?'जाप मंत्र':'Jaap Mantra'}</strong>
              <div className="text-red-800 font-bold bg-[#FCF9F1] p-3 block rounded border border-[#D4AF37]/50 mb-4">{dashaPlanetInfo?.[lang].mantra}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-100">
              <strong className="text-gray-500 block mb-1 uppercase text-xs tracking-widest">{lang==='hi'?'विधि एवं नियम':'Procedure & Rules'}</strong>
              <p className="text-gray-900 mb-3 text-xs leading-relaxed">{dashaPlanetInfo?.[lang].ritual}</p>
              
              <strong className="text-gray-500 block mb-1 uppercase text-xs tracking-widest">{lang==='hi'?'अवधि एवं संख्या':'Duration & Count'}</strong>
              <p className="text-gray-900 text-xs bg-white p-2 border rounded font-mono">{dashaPlanetInfo?.[lang].count}</p>
            </div>
        </div>
      </div>

      {/* 2. MANDATORY (DEBILITATED / DUSTHANA) */}
      {mandatoryList.length > 0 && (
        <div className="space-y-6 page-break-before">
          <div className="font-serif font-bold text-[#800000] text-xl border-b-2 border-orange-200 pb-2 flex justify-between items-center">
             <span>2. {lang === 'hi' ? 'ग्रह शांति अनुष्ठान' : 'Planetary Pacification Rituals'}</span>
             {getPriorityBadge('mandatory')}
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {lang === 'hi' ? 'नीच अथवा दुस्थान में बैठे ग्रहों के नकारात्मक प्रभाव व कर्म बंध को रोकने हेतु इन उपायों को करना अनिवार्य है।' : 'These remedies are mandatory to resolve the negative karmic blocks caused by debilitated or poorly placed planets.'}
          </p>

          <div className="grid grid-cols-1 gap-6">
            {mandatoryList.map((planet: any, i: number) => (
               <div key={i} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <div className="flex justify-between items-center mb-3">
                     <h4 className="font-bold text-lg text-gray-900">{planet[lang].n} {lang==='hi'?'शांति':'Shanti'}</h4>
                     <span className="text-[10px] bg-orange-50 text-orange-800 px-2 py-0.5 rounded border border-orange-200">{planet.reason}</span>
                  </div>
                  <div className="grid grid-cols-[1fr,2fr] gap-4 text-xs">
                     <div className="bg-[#FCF9F1] p-3 rounded border border-gray-100 text-center flex flex-col justify-center">
                        <span className="text-gray-500 block mb-1 uppercase text-[10px] tracking-widest">{lang==='hi'?'मंत्र':'Mantra'}</span>
                        <div className="text-red-800 font-bold">{planet[lang].mantra}</div>
                     </div>
                     <div className="bg-gray-50 p-3 rounded border border-gray-100">
                        <span className="text-gray-500 block mb-1 uppercase text-[10px] tracking-widest">{lang==='hi'?'साधना विधि':'Sadhana Method'}</span>
                        <p className="text-gray-900 mb-2">{planet[lang].ritual}</p>
                        <span className="text-gray-500 block mb-1 uppercase text-[10px] tracking-widest text-right">{lang==='hi'?'संकल्प संख्या':'Sankalp Count'}</span>
                        <p className="text-gray-900 font-mono text-right">{planet[lang].count}</p>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. OPTIONAL / LIFE AREA */}
      <div className="space-y-6 page-break-before">
          <div className="font-serif font-bold text-[#800000] text-xl border-b-2 border-green-200 pb-2 flex justify-between items-center">
             <span>3. {lang === 'hi' ? 'विशेष मनोकामना हेतु यंत्र साधना' : 'Yantra Sadhana for Specific Desires'}</span>
             {getPriorityBadge('optional')}
          </div>
          <p className="text-xs text-gray-500 mb-4">
            {lang === 'hi' ? 'विशिष्ट जीवन क्षेत्रों (स्वास्थ्य, धन, विवाह) में सफलता हेतु इन सिद्ध यंत्रों व मंत्रों का प्रयोग अपनी आवश्यकतानुसार करें।' : 'Use these Siddha Yantras and Mantras based on your specific life needs (health, wealth, marriage).'}
          </p>

          <div className="grid grid-cols-2 gap-4">
             {Object.entries(LIFE_AREA_REMEDIES).map(([k, r]: any) => (
                <div key={k} className="bg-white p-4 rounded border border-gray-200 shadow-sm flex flex-col justify-between">
                   <div>
                     <h4 className="font-bold text-[#800000] mb-2">{r[lang].title}</h4>
                     
                     <div className="flex gap-3 mb-3">
                       <div className="w-16 h-16 shrink-0 aspect-square bg-white border border-[#D4AF37] rounded flex items-center justify-center p-1 shadow-sm overflow-hidden relative">
                           <Yantra name={r['en'].yantra} />
                       </div>
                       <div className="text-[10px] text-gray-600">
                          <strong className="text-gray-800">{r[lang].yantra}</strong><br/>
                          {lang==='hi'?'देव: ':'Deity: '}{r[lang].deity}
                       </div>
                     </div>

                     <div className="text-xs bg-red-50 text-red-800 font-bold p-2 text-center rounded border border-red-100 mb-3">
                        {r[lang].mantra}
                     </div>
                     <div className="text-[10px] text-gray-700 leading-relaxed bg-gray-50 p-2 rounded">
                        <strong>{lang==='hi'?'विधि: ':'Vidhi: '}</strong>{(r[lang].nonConventional?.process || r[lang].procedure).substring(0, 100)}...
                     </div>
                   </div>
                </div>
             ))}
          </div>
      </div>

      {/* 4. WEEKLY TRACKER FEATURE */}
      <div className="page-break-before">
        <h3 className="font-serif font-bold text-[#800000] text-xl mb-4 text-center border-b pb-2">{lang === 'hi' ? 'साप्ताहिक उपाय अनुवर्ती पत्रिका (Mantra Tracker)' : 'Weekly Remedy Tracking Log'}</h3>
        <p className="text-xs text-center text-gray-600 mb-4">{lang === 'hi' ? 'नियमित साधना बनाए रखने के लिए इस तालिका का उपयोग करें। (प्रत्येक दिन के नीचे टिक लगाएं)' : 'Use this checklist to maintain consistency in your Sadhana. (Tick off each day)'}</p>
        
        <table className="w-full text-xs text-left border-collapse bg-white shadow-sm rounded overflow-hidden">
          <thead>
            <tr className="bg-[#800000] text-white">
              <th className="p-3 border-r border-[#990000] w-1/4">{lang==='hi'?'उपाय / मंत्र':'Remedy / Mantra'}</th>
              <th className="p-2 border-r border-[#990000] text-center">Sun</th>
              <th className="p-2 border-r border-[#990000] text-center">Mon</th>
              <th className="p-2 border-r border-[#990000] text-center">Tue</th>
              <th className="p-2 border-r border-[#990000] text-center">Wed</th>
              <th className="p-2 border-r border-[#990000] text-center">Thu</th>
              <th className="p-2 border-r border-[#990000] text-center">Fri</th>
              <th className="p-2 text-center">Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-200 font-bold text-gray-800 bg-gray-50">{dashaPlanetInfo[lang].n} {lang==='hi'?'दशा शमन':'Dasha Ritual'}</td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
            </tr>
            {mandatoryList.map((p: any, i: number) => (
              <tr key={i}>
                <td className="p-3 border border-gray-200 font-bold text-gray-800 bg-gray-50">{p[lang].n} {lang==='hi'?'शांति':'Shanti'}</td>
                <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
                <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
                <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
                <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
                <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
                <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
                <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              </tr>
            ))}
             <tr>
              <td className="p-3 border border-gray-200 font-bold text-gray-800 bg-gray-50">{lang==='hi'?'अन्य/यंत्र साधना':'Other/Yantra'}</td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
              <td className="p-2 border border-gray-200 text-center"><div className="w-4 h-4 rounded-full border border-gray-300 mx-auto"></div></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
