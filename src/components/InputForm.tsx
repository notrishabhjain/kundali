import React, { useState } from 'react';
import { CITIES } from '../lib/jainData';

export function InputForm({ onCalculate, lang }: { onCalculate: (data: any) => void, lang: 'en'|'hi' }) {
  const [form, setForm] = useState({
    name: 'Sadhak',
    date: '1990-01-01',
    time: '12:00',
    city: 'mumbai'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock geocoding based on common cities, otherwise fallback to a default
    const normalizedCity = form.city.toLowerCase().trim();
    let lat = 28.6139; // Default Delhi
    let lon = 77.2090;
    
    const cityMatch = Object.values(CITIES).find(c => 
      c.en.toLowerCase() === normalizedCity || c.hi === normalizedCity
    ) || CITIES[normalizedCity];

    if (cityMatch) {
      lat = cityMatch.lat;
      lon = cityMatch.lon;
    } else {
      // Basic hash to generate varying but consistent coordinates for unknown cities to simulate a distinct chart
      let hash = 0;
      for (let i = 0; i < normalizedCity.length; i++) {
        hash = normalizedCity.charCodeAt(i) + ((hash << 5) - hash);
      }
      lat = 20 + Math.abs(hash % 15); // Random lat between 20 and 35
      lon = 70 + Math.abs((hash >> 3) % 20); // Random lon between 70 and 90
    }

    onCalculate({ ...form, lat, lon });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border-t-4 border-[#800000] p-6 md:p-10 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-serif font-bold text-[#800000] mb-2">
          {lang === 'hi' ? 'अपना विवरण दर्ज करें' : 'Enter Your Details'}
        </h2>
        <p className="text-gray-500 text-sm">
          {lang === 'hi' ? ' सटीक दिगंबर कर्म विश्लेषण के लिए जन्म-समय अत्यावश्यक है।' : 'Accurate time is essential for Digambar Karmic mapping.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-700 mb-2">
            {lang === 'hi' ? 'नाम' : 'Name'}
          </label>
          <input 
            type="text" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className="w-full px-4 py-3 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] text-sm"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-700 mb-2">
              {lang === 'hi' ? 'जन्म तिथि' : 'Date of Birth'}
            </label>
            <input 
              type="date" 
              value={form.date}
              onChange={e => setForm({...form, date: e.target.value})}
              className="w-full px-4 py-3 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-700 mb-2">
              {lang === 'hi' ? 'जन्म समय' : 'Time of Birth'}
            </label>
            <input 
              type="time" 
              value={form.time}
              onChange={e => setForm({...form, time: e.target.value})}
              className="w-full px-4 py-3 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-700 mb-2">
            {lang === 'hi' ? 'जन्म शहर' : 'City Setup'}
          </label>
          <input 
            type="text"
            list="cities-list"
            value={form.city}
            onChange={e => setForm({...form, city: e.target.value})}
            className="w-full px-4 py-3 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] text-sm font-mono"
            required
            placeholder={lang === 'hi' ? 'शहर का नाम दर्ज करें' : 'Enter city name'}
          />
          <datalist id="cities-list">
            {Object.entries(CITIES).map(([k, c]) => (
              <option key={k} value={c.en}>{c.hi}</option>
            ))}
          </datalist>
          <p className="text-[10px] text-gray-500 mt-1 italic">
            {lang === 'hi' ? 'शहर के नाम से अक्षांश/देशांतर (coordinates) स्वतः लिए जाएंगे।' : 'Coordinates will be fetched automatically based on the city.'}
          </p>
        </div>

        <button type="submit" className="w-full py-4 mt-4 bg-[#800000] hover:bg-[#A00000] text-white rounded font-bold shadow-md transition-all uppercase tracking-wider text-sm">
          {lang === 'hi' ? 'कुण्डली बनाएं' : 'Generate Kundali'}
        </button>
      </form>
    </div>
  );
}
