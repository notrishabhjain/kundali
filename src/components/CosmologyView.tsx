import React from 'react';

export function CosmologyView({ chart, lang }: { chart: any, lang: 'en'|'hi' }) {
  const S = 100;
  const H = S * 4;
  const W = S * 4;
  const cx = W / 2;
  const cy = H / 2;

  const sunAngle = chart.sidereal['Su'] || 0;
  const moonAngle = chart.sidereal['Mo'] || 0;
  const antipodalSunAngle = (sunAngle + 180) % 360;
  const antipodalMoonAngle = (moonAngle + 180) % 360;

  const getPolar = (radius: number, angleDeg: number) => {
    const angle = (angleDeg - 90) * Math.PI / 180;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    };
  };

  const vSun = getPolar(120, sunAngle);
  const vMoon = getPolar(100, moonAngle);
  const aSun = getPolar(120, antipodalSunAngle);
  const aMoon = getPolar(100, antipodalMoonAngle);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#800000]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#800000] mb-3 border-b border-gray-200 pb-1">
          {lang === 'hi' ? 'जैन ब्रह्मांड विज्ञान: दो सूर्य, दो चंद्रमा' : 'Jain Cosmology: Two Suns & Two Moons'}
        </h3>
        
        <p className="text-xs text-gray-600 mb-6 italic leading-relaxed">
          {lang === 'hi' 
            ? 'तिलोयपण्णत्ती और त्रिलोकसार के अनुसार जम्बूद्वीप में दो सूर्य और दो चंद्रमा सुमेरु पर्वत की परिक्रमा करते हैं। ये एक-दूसरे से 180 डिग्री के अंतर पर होते हैं। भरत क्षेत्र में गणना के लिए हम केवल दृश्यमान सूर्य और चंद्रमा का उपयोग करते हैं।' 
            : 'According to Tiloyapannatti and Triloksaar, Jambudvipa has two suns and two moons orbiting Mount Sumeru, positioned 180 degrees apart. For calculations in Bharata Kshetra, we only use the visible luminaries.'}
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-full max-w-[300px] aspect-square bg-[#FCF9F1] rounded border border-gray-200 p-2 shadow-inner">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Orbits */}
              <circle cx={cx} cy={cy} r="120" fill="none" stroke="rgba(128, 0, 0, 0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx={cx} cy={cy} r="100" fill="none" stroke="rgba(0, 0, 128, 0.1)" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Mount Meru */}
              <circle cx={cx} cy={cy} r="20" fill="#D4AF37" stroke="#800000" strokeWidth="2" />
              <text x={cx} y={cy + 4} textAnchor="middle" fill="#800000" fontSize="10" fontWeight="bold">मेरु</text>

              {/* Luminaries */}
              <circle cx={vSun.x} cy={vSun.y} r="12" fill="#e65100" />
              <text x={vSun.x + 15} y={vSun.y + 4} fill="#800000" fontSize="10" fontWeight="bold">Vis. Su</text>
              
              <circle cx={aSun.x} cy={aSun.y} r="12" fill="#e65100" opacity="0.4" />
              <text x={aSun.x + 15} y={aSun.y + 4} fill="#800000" fontSize="10" fontWeight="bold" opacity="0.6">Ant. Su</text>

              <circle cx={vMoon.x} cy={vMoon.y} r="10" fill="#1565c0" />
              <text x={vMoon.x + 15} y={vMoon.y + 4} fill="#1565c0" fontSize="10" fontWeight="bold">Vis. Mo</text>

              <circle cx={aMoon.x} cy={aMoon.y} r="10" fill="#1565c0" opacity="0.4" />
              <text x={aMoon.x + 15} y={aMoon.y + 4} fill="#1565c0" fontSize="10" fontWeight="bold" opacity="0.6">Ant. Mo</text>
            </svg>
          </div>
          
          <div className="flex-1 w-full text-xs font-mono text-gray-700 bg-white border border-gray-200 rounded p-4 shadow-sm">
            <h4 className="font-bold text-[#800000] mb-2 uppercase border-b pb-1">Positions</h4>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span>Visible Sun</span> <strong>{sunAngle.toFixed(2)}°</strong>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span>Antipodal Sun</span> <strong>{antipodalSunAngle.toFixed(2)}°</strong>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span>Visible Moon</span> <strong>{moonAngle.toFixed(2)}°</strong>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span>Antipodal Moon</span> <strong>{antipodalMoonAngle.toFixed(2)}°</strong>
              </div>
              <div className="pt-2 italic text-[10px] text-gray-500">
                Angles represent the longitude of luminaries around Mt. Sumeru.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
