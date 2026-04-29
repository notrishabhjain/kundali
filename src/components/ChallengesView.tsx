import React from 'react';
import { PLANET_DICT, RASHIS } from '../lib/jainData';

export function ChallengesView({ chart, lang }: { chart: any, lang: 'en' | 'hi' }) {
  const challenges: any[] = [];
  
  const getHouseSignification = (h: number) => {
    switch(h) {
      case 1: return lang==='hi' ? 'स्वास्थ्य और व्यक्तित्व' : 'Health & Personality';
      case 2: return lang==='hi' ? 'धन और परिवार' : 'Wealth & Family';
      case 3: return lang==='hi' ? 'साहस और भाई-बहन' : 'Courage & Siblings';
      case 4: return lang==='hi' ? 'सुख, माता और वाहन' : 'Comforts, Mother, & Assets';
      case 5: return lang==='hi' ? 'संतान और बुद्धि' : 'Children & Intellect';
      case 6: return lang==='hi' ? 'रोग, ऋण और शत्रु' : 'Disease, Debts, & Enemies';
      case 7: return lang==='hi' ? 'विवाह और साझेदारी' : 'Marriage & Partnership';
      case 8: return lang==='hi' ? 'आयु, मृत्यु और बाधाएं' : 'Longevity, Death, & Obstacles';
      case 9: return lang==='hi' ? 'धर्म और भाग्य' : 'Dharma & Fortune';
      case 10: return lang==='hi' ? 'करियर और पिता' : 'Career & Father';
      case 11: return lang==='hi' ? 'आय और लाभ' : 'Income & Gains';
      case 12: return lang==='hi' ? 'व्यय, मोक्ष और विदेश' : 'Losses, Moksha, & Foreign';
      default: return '';
    }
  };

  chart.planetsParsed.forEach((p: any) => {
    // Find dasha periods for this planet
    const planetDashas = chart.dashas.filter((d:any) => d.lord === p.pid);
    const activeDasha = planetDashas.find((d:any) => d.start <= new Date() && d.end > new Date());
    const dashaText = activeDasha 
      ? (lang==='hi' ? `सक्रिय दशा: ${activeDasha.start.getFullYear()} से ${activeDasha.end.getFullYear()} तक` : `Active Dasha: ${activeDasha.start.getFullYear()} to ${activeDasha.end.getFullYear()}`)
      : planetDashas[0] 
        ? (lang === 'hi' ? `आगामी दशा: ${planetDashas[0].start.getFullYear()} से` : `Upcoming Dasha: ${planetDashas[0].start.getFullYear()} onwards`) 
        : '';

    if (p.state === 'Debilitated') {
      challenges.push({
        title: `${PLANET_DICT[p.pid][lang].n} Debilitated in ${RASHIS[p.rashiNum - 1][lang]}`,
        desc: lang === 'hi'
          ? `${PLANET_DICT[p.pid]['hi'].n} का नीच होना यह दर्शाता है कि आपने पूर्व जन्मों में इस ग्रह के कारकत्वों का दुरुपयोग किया है।`
          : `Debilitated ${PLANET_DICT[p.pid]['en'].n} indicates a misuse of its significations in past lives.`,
        impact: `${getHouseSignification(p.house)} (House ${p.house})`,
        timeline: dashaText,
        remedy: lang === 'hi' 
          ? `भगवान ${PLANET_DICT[p.pid]['hi'].tirth} की विशेष आराधना करें। ${PLANET_DICT[p.pid]['hi'].ritual}`
          : `Worship Lord ${PLANET_DICT[p.pid]['en'].tirth}. ${PLANET_DICT[p.pid]['en'].ritual}`
      });
    }
    if ([6, 8, 12].includes(p.house)) {
      challenges.push({
        title: `${PLANET_DICT[p.pid][lang].n} in Dusthana (House ${p.house})`,
        desc: lang === 'hi' 
          ? `दुस्थान (6,8,12) में स्थित ग्रह उन भावों से संबंधित जीवन क्षेत्रों में संघर्ष, देरी और अप्रत्याशित बाधाएं लाते हैं।` 
          : `Planets in Dusthana (6,8,12) bring struggles, delays, and unexpected obstacles in their associated areas.`,
        impact: `${getHouseSignification(p.house)}`,
        timeline: dashaText,
        remedy: lang === 'hi' 
          ? `प्रतिदिन भक्तामर स्तोत्र का पाठ करें तथा ${PLANET_DICT[p.pid]['hi'].n} के तीर्थंकर ${PLANET_DICT[p.pid]['hi'].tirth} की पूजा करें।`
          : `Recite Bhaktamar Stotra daily and worship ${PLANET_DICT[p.pid]['en'].tirth}, the deity for ${PLANET_DICT[p.pid]['en'].n}.`
      });
    }
  });

  if (challenges.length === 0) {
    challenges.push({
      title: lang === 'hi' ? 'कोई प्रमुख दोष नहीं' : 'No Major Afflictions',
      desc: lang === 'hi' ? 'आपकी कुण्डली अपेक्षाकृत संतुलित है।' : 'Your chart reflects a balanced karmic state.',
      impact: '-',
      timeline: '-',
      remedy: lang === 'hi' ? 'नित्य देव दर्शन और नवकार मंत्र का स्मरण करते रहें।' : 'Continue daily Dev Darshan and Navkar Mantra recitation.'
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-red-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-3 border-b border-gray-200 pb-1">
          {lang === 'hi' ? 'कर्म चुनौतियां (Karmic Challenges)' : 'Karmic Challenges & Doshas'}
        </h3>
        
        <p className="text-xs text-gray-600 mb-6 italic leading-relaxed bg-red-50/50 p-3 rounded border border-red-100">
          {lang === 'hi' 
            ? 'जैन दर्शन में चुनौतियां पूर्व जन्म के असाता वेदनीय कर्मों का फल हैं। इन्हें समता भाव से सहन करने और उचित तीर्थंकर की आराधना करने से निर्जरा (कर्म क्षय) होती है।' 
            : 'In Jainism, challenges are past negative karmas (Asata Vedaniya) ripening. Enduring them with equanimity and worshipping the appropriate Tirthankara leads to Nirjara (karmic shedding).'}
        </p>

        <div className="space-y-6">
          {challenges.map((c: any, i: number) => (
            <div key={i} className="p-4 bg-white border border-red-100 rounded shadow-sm">
              <h4 className="font-bold text-red-900 mb-3 border-b border-red-50 pb-2">{c.title}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <strong className="block text-gray-500 uppercase tracking-widest mb-1">{lang === 'hi' ? 'कर्म संकेत' : 'Karmic Indication'}</strong>
                  <p className="text-gray-800 leading-relaxed">{c.desc}</p>
                </div>
                <div>
                  <strong className="block text-gray-500 uppercase tracking-widest mb-1">{lang === 'hi' ? 'प्रभावित क्षेत्र' : 'Affected Area'}</strong>
                  <p className="text-gray-800 font-mono bg-gray-50 p-1.5 rounded inline-block">{c.impact}</p>
                </div>
                <div>
                  <strong className="block text-gray-500 uppercase tracking-widest mb-1">{lang === 'hi' ? 'समय अवधि' : 'Timeline'}</strong>
                  <p className="text-red-800 font-bold bg-red-50 p-1.5 rounded inline-block">
                    {c.timeline || (lang === 'hi' ? 'आजीवन (सूक्ष्म प्रभाव)' : 'Lifelong (subtle impact)')}
                  </p>
                </div>
                <div className="md:col-span-2 bg-[#FCF9F1] border border-[#D4AF37]/30 p-3 rounded">
                  <strong className="block text-[#800000] uppercase tracking-widest mb-1">{lang === 'hi' ? 'विशिष्ट उपाय' : 'Specific Remedy'}</strong>
                  <p className="text-gray-800 leading-relaxed">{c.remedy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
