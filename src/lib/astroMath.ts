// src/lib/astroMath.ts
export function toRad(d: number) { return d * Math.PI / 180; }
export function norm360(d: number) { return ((d % 360) + 360) % 360; }

export function julianDay(Y: number, M: number, D: number, h: number) {
  if (M <= 2) { Y--; M += 12; }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + h / 24 + B - 1524.5;
}

export function lahiriAyanamsha(j: number) {
  const T = (j - 2451545) / 36525;
  return 23.85 + T * 0.013611 - T * T * 0.000096;
}

export function sunLongitude(j: number) {
  const T = (j - 2451545) / 36525;
  const L = norm360(280.46646 + 36000.76983 * T);
  const M = norm360(357.52911 + 35999.05029 * T);
  const r = toRad(M);
  return norm360(L + (1.914602 - 0.004817 * T) * Math.sin(r) + 0.019993 * Math.sin(2 * r));
}

export function moonLongitude(j: number) {
  const T = (j - 2451545) / 36525, T2 = T * T, T3 = T2 * T, T4 = T3 * T;
  const Lp = norm360(218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000);
  const Mp = norm360(134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699);
  const M = norm360(357.5291092 + 35999.0502909 * T - 0.0001536 * T2);
  const F = norm360(93.272095 + 483202.0175233 * T - 0.0036539 * T2);
  const D = norm360(297.8501921 + 445267.1114034 * T - 0.0018819 * T2);
  const Mr = toRad(Mp), Dr = toRad(D), Fr = toRad(F), Sr = toRad(M);
  return norm360(
    Lp + 6.28875 * Math.sin(Mr) + 1.274018 * Math.sin(2 * Dr - Mr) + 0.658309 * Math.sin(2 * Dr) +
    0.213616 * Math.sin(2 * Mr) - 0.185596 * Math.sin(Sr) - 0.114336 * Math.sin(2 * Fr) +
    0.058793 * Math.sin(2 * Dr - 2 * Mr) + 0.053320 * Math.sin(2 * Dr + Mr) +
    0.045874 * Math.sin(2 * Dr - Sr) + 0.041024 * Math.sin(Mr - Sr) -
    0.034718 * Math.sin(Dr) + 0.030463 * Math.sin(2 * Dr + Mp) - 0.024197 * Math.sin(2 * Fr)
  );
}

export function rahuLongitude(j: number) {
  const T = (j - 2451545) / 36525;
  return norm360(125.0445479 - 1934.1362608 * T + 0.002 * T * T);
}

export function ascendant(j: number, lat: number, lng: number, ayanamsha: number = 0) {
  const T = (j - 2451545) / 36525;
  const GMST = norm360(280.46061837 + 360.98564736629 * (j - 2451545) + 0.000387933 * T * T);
  const LST = norm360(GMST + lng);
  const LSTr = toRad(LST), latr = toRad(lat), er = toRad(23.4397 - 0.013 * T);
  let asc = norm360((180 / Math.PI) * Math.atan2(Math.cos(LSTr), -(Math.sin(LSTr) * Math.cos(er) + Math.tan(latr) * Math.sin(er))));
  return norm360(asc - ayanamsha);
}

export function outerPlanets(j: number) {
  const T = (j - 2451545) / 36525;
  const p = (L0: number, dL: number, M0: number, dM: number, eC: number, e2: number) => {
    const L = norm360(L0 + dL * T), M = norm360(M0 + dM * T);
    return norm360(L + eC * Math.sin(toRad(M)) + e2 * Math.sin(toRad(2 * M)));
  };
  return {
    mars: p(355.453, 19140.303, 19.373, 19140.299, 10.691, 0.623),
    mercury: p(252.251, 149472.674, 168.656, 149472.515, 23.44, 2.982),
    jupiter: p(34.352, 3034.906, 20.9, 3034.906, 5.555, 0.168),
    venus: p(181.98, 58517.804, 212.45, 58517.804, 0.716, 0.049),
    saturn: p(50.077, 1222.114, 317.02, 1222.114, 6.359, 0.22)
  };
}

export function degToDms(degrees: number) {
  const normalized = norm360(degrees);
  const d = Math.floor(normalized);
  const minutesFloat = (normalized - d) * 60;
  const m = Math.floor(minutesFloat);
  const s = Math.round((minutesFloat - m) * 60);
  return `${d}° ${String(m).padStart(2, "0")}' ${String(s).padStart(2, "0")}"`;
}
