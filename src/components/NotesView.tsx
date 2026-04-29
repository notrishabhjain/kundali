import React from 'react';

export function NotesView({ lang }: { lang: 'en'|'hi' }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-800 mb-4 border-b border-gray-200 pb-1">
          {lang === 'hi' ? 'महत्वपूर्ण जानकारी और सीमाएं' : 'Important Notes & Limitations'}
        </h3>
        
        <div className="space-y-4 text-xs text-gray-700 leading-relaxed font-mono">
          <div className="p-3 bg-yellow-50 border border-yellow-100 rounded">
            <strong>{lang === 'hi' ? 'जैन भूगोल (Jain Geography): ' : 'Jain Geography: '}</strong> 
            {lang === 'hi' 
              ? 'वर्तमान कुण्डली भरत क्षेत्र के लिए बनाई गई है जो कि जम्बूद्वीप का एक हिस्सा है।' 
              : 'The current Kundali is generated for Bharata Kshetra, a part of Jambudvipa.'}
          </div>
          
          <div className="p-3 bg-yellow-50 border border-yellow-100 rounded">
            <strong>{lang === 'hi' ? 'काल निर्धारण (Time Cycles): ' : 'Time Cycles: '}</strong> 
            {lang === 'hi'
              ? 'हम अभी अवसर्पिणी काल (सुषम-दुषमा) के दुखम काल के 5वें चरण में हैं।' 
              : 'We are currently in the 5th phase (Dukham) of the Avasarpini (descending) time cycle.'}
          </div>
          
          <div className="p-3 bg-yellow-50 border border-yellow-100 rounded">
            <strong>{lang === 'hi' ? 'ग्रह गोचर (Planetary Transits): ' : 'Planetary Transits: '}</strong> 
            {lang === 'hi'
              ? 'इस इंजन में वर्तमान ग्रहों की स्थिति केवल एक अनुमानित गणितीय मॉडल पर आधारित है और वास्तविक खगोलीय गणनाओं से थोड़ी भिन्न हो सकती है।' 
              : 'The planetary positions are based on approximate mathematical models and might differ slightly from actual astronomical ephemeris.'}
          </div>
          
          <div className="p-3 bg-yellow-50 border border-yellow-100 rounded">
            <strong>{lang === 'hi' ? 'कर्म सिद्धांत (Law of Karma): ' : 'Law of Karma: '}</strong> 
            {lang === 'hi'
              ? 'ज्योतिष केवल उदय कर्म को दर्शाता है, पुरुषार्थ (स्वतंत्र इच्छा) से भविष्य बदला जा सकता है। यह पूर्ण नियतिवाद नहीं है।' 
              : 'Astrology only reveals ripening karma (Udaya). Purushartha (freewill) can change the future. It is not absolute determinism.'}
          </div>
        </div>
      </div>
    </div>
  );
}
