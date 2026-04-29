import React from 'react';

const TABS = [
  { id: 'input', en: 'Birth Details', hi: 'जन्म विवरण' },
  { id: 'kundali', en: 'Kundali', hi: 'कुण्डली' },
  { id: 'planets', en: 'Navagraha', hi: 'नवग्रह' },
  { id: 'vedic', en: 'Vedic View', hi: 'वैदिक दृष्टि' },
  { id: 'dasha', en: 'Dasha', hi: 'दशा काल' },
  { id: 'predictions', en: 'Life Areas', hi: 'जीवन क्षेत्र' },
  { id: 'challenges', en: 'Challenges', hi: 'चुनौतियां' },
  { id: 'remedies', en: 'Remedies', hi: 'गहन उपाय' },
  { id: 'puja', en: 'Puja & Path', hi: 'पूजा पाठ' },
  { id: 'cosmology', en: 'Cosmology', hi: 'ब्रह्मांड' },
  { id: 'notes', en: 'Notes', hi: 'टिप्पणियां' }
];

export function Tabs({ activeTab, onChange, lang }: { activeTab: string, onChange: (id: string) => void, lang: 'en'|'hi' }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar border-b border-gray-300">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-t text-xs uppercase tracking-wider font-bold transition-all
            ${activeTab === tab.id 
              ? 'bg-white text-[#800000] border-t-4 border-[#800000] shadow-sm' 
              : 'text-gray-500 hover:bg-white/60 border-t-4 border-transparent'
            }`
          }
        >
          {tab[lang]}
        </button>
      ))}
    </div>
  );
}
