import { ascendant, moonLongitude, sunLongitude, outerPlanets, rahuLongitude, julianDay, norm360, lahiriAyanamsha } from './astroMath';
import { RASHIS, DASHA_ORDER, DASHA_YEARS, PLANET_DICT, NAKSHATRAS } from './jainData';

export function calculateBirthChart(date: string, time: string, lat: number, lon: number) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, min] = time.split(':').map(Number);
  const hourDecimal = hour + min / 60;
  
  const utcHour = hourDecimal - (lon / 15);
  const jd = julianDay(year, month, day, utcHour);
  const ayanamsha = lahiriAyanamsha(jd);

  const tropical = {
    Su: sunLongitude(jd),
    Mo: moonLongitude(jd),
    ...outerPlanets(jd),
    Ra: rahuLongitude(jd),
  };
  const tropicalDetailed = {
    Su: tropical.Su, Mo: tropical.Mo, Ma: tropical.mars, Me: tropical.mercury,
    Ju: tropical.jupiter, Ve: tropical.venus, Sa: tropical.saturn,
    Ra: tropical.Ra, Ke: norm360(tropical.Ra + 180)
  };

  const sidereal: Record<string, number> = {};
  for (const [k, v] of Object.entries(tropicalDetailed)) {
    sidereal[k] = norm360(v - ayanamsha);
  }

  const lagnaLon = ascendant(jd, lat, lon, ayanamsha);
  const lagnaRashi = Math.floor(lagnaLon / 30) + 1; // 1-12

  const moonLon = sidereal['Mo'];
  const nakIdx = Math.floor(moonLon / (360 / 27));
  const nakshatra = NAKSHATRAS[nakIdx];
  const nakStart = nakIdx * (360 / 27);
  const nakSpan = 360 / 27;
  const elapsedFrac = (moonLon - nakStart) / nakSpan;

  const dashas = calculateVimshottari(date, time, nakshatra, elapsedFrac);
  
  const panchang = calculatePanchang(sidereal['Su'], sidereal['Mo'], date);

  const planetsParsed = Object.entries(sidereal).map(([pid, lon]) => {
    const rashiNum = Math.floor(lon / 30) + 1;
    const house = ((rashiNum - lagnaRashi + 12) % 12) + 1;
    const degInRashi = lon % 30;
    
    let state = 'Neutral';
    const plt = PLANET_DICT[pid];
    if (plt) {
      if (plt.ex === rashiNum) state = 'Exalted';
      else if (plt.de === rashiNum) state = 'Debilitated';
      else if (plt.own.includes(rashiNum)) state = 'Own Sign';
    }

    return {
      pid,
      lon,
      rashiNum,
      house,
      degInRashi,
      state
    };
  });

  return {
    lagnaLon,
    lagnaRashi,
    sidereal,
    planetsParsed,
    dashas,
    moonNakshatra: nakshatra,
    panchang
  };
}

function calculateVimshottari(date: string, time: string, nakshatra: any, elapsedFrac: number) {
  const startLord = nakshatra.l;
  const startIdx = DASHA_ORDER.indexOf(startLord);
  const totalYrs = DASHA_YEARS[startLord];
  const remYrs = totalYrs * (1 - elapsedFrac);

  const dob = new Date(`${date}T${time}`);
  const dashas = [];
  let dStart = new Date(dob);
  
  // Create first short dasha
  let dEnd = new Date(dStart.getTime() + remYrs * 365.25 * 86400000);
  dashas.push({ lord: startLord, years: remYrs, start: new Date(dStart), end: dEnd });

  // Do the rest
  let currIdx = (startIdx + 1) % 9;
  for (let i = 1; i < 9; i++) {
    dStart = new Date(dEnd);
    const l = DASHA_ORDER[currIdx];
    const yr = DASHA_YEARS[l];
    dEnd = new Date(dStart.getTime() + yr * 365.25 * 86400000);
    dashas.push({ lord: l, years: yr, start: new Date(dStart), end: dEnd });
    currIdx = (currIdx + 1) % 9;
  }
  
  return dashas;
}

function calculatePanchang(sunLon: number, moonLon: number, dateStr: string) {
  const phaseDiff = norm360(moonLon - sunLon);
  const tithiIndex = Math.floor(phaseDiff / 12) + 1;
  const karanaIndex = Math.floor(phaseDiff / 6) + 1;
  
  const yogaIndex = Math.floor(norm360(sunLon + moonLon) / (360/27)) + 1;
  
  // day of week
  const dateObj = new Date(dateStr);
  const dayIdx = dateObj.getDay();

  return {
    tithiIndex,
    karanaIndex,
    yogaIndex,
    dayIdx
  };
}
