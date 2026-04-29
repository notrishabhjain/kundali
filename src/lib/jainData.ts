// src/lib/jainData.ts

export const CITIES: Record<string, { lat: number; lon: number; tz: number; en: string; hi: string }> = {
  mumbai: { lat: 19.076, lon: 72.877, tz: 5.5, en: "Mumbai", hi: "मुम्बई" },
  delhi: { lat: 28.613, lon: 77.209, tz: 5.5, en: "Delhi", hi: "दिल्ली" },
  bangalore: { lat: 12.972, lon: 77.594, tz: 5.5, en: "Bangalore", hi: "बैंगलोर" },
  hyderabad: { lat: 17.385, lon: 78.487, tz: 5.5, en: "Hyderabad", hi: "हैदराबाद" },
  chennai: { lat: 13.083, lon: 80.27, tz: 5.5, en: "Chennai", hi: "चेन्नई" },
  kolkata: { lat: 22.572, lon: 88.363, tz: 5.5, en: "Kolkata", hi: "कोलकाता" },
  pune: { lat: 18.52, lon: 73.857, tz: 5.5, en: "Pune", hi: "पुणे" },
  ahmedabad: { lat: 23.023, lon: 72.572, tz: 5.5, en: "Ahmedabad", hi: "अहमदाबाद" },
  jaipur: { lat: 26.912, lon: 75.787, tz: 5.5, en: "Jaipur", hi: "जयपुर" },
  lucknow: { lat: 26.847, lon: 80.947, tz: 5.5, en: "Lucknow", hi: "लखनऊ" },
};

export const RASHIS = [
  { id: 1, en: "Aries", hi: "मेष", shortEn: "Ari", shortHi: "मेष", lord: "Ma" },
  { id: 2, en: "Taurus", hi: "वृषभ", shortEn: "Tau", shortHi: "वृष", lord: "Ve" },
  { id: 3, en: "Gemini", hi: "मिथुन", shortEn: "Gem", shortHi: "मिथु", lord: "Me" },
  { id: 4, en: "Cancer", hi: "कर्क", shortEn: "Can", shortHi: "कर्क", lord: "Mo" },
  { id: 5, en: "Leo", hi: "सिंह", shortEn: "Leo", shortHi: "सिंह", lord: "Su" },
  { id: 6, en: "Virgo", hi: "कन्या", shortEn: "Vir", shortHi: "कन्य", lord: "Me" },
  { id: 7, en: "Libra", hi: "तुला", shortEn: "Lib", shortHi: "तुला", lord: "Ve" },
  { id: 8, en: "Scorpio", hi: "वृश्चिक", shortEn: "Sco", shortHi: "वृश्च", lord: "Ma" },
  { id: 9, en: "Sagittarius", hi: "धनु", shortEn: "Sag", shortHi: "धनु", lord: "Ju" },
  { id: 10, en: "Capricorn", hi: "मकर", shortEn: "Cap", shortHi: "मकर", lord: "Sa" },
  { id: 11, en: "Aquarius", hi: "कुंभ", shortEn: "Aqu", shortHi: "कुंभ", lord: "Sa" },
  { id: 12, en: "Pisces", hi: "मीन", shortEn: "Pis", shortHi: "मीन", lord: "Ju" },
];

export const NAKSHATRAS = [
  { n: "Ashwini", l: "Ke" }, { n: "Bharani", l: "Ve" }, { n: "Krittika", l: "Su" },
  { n: "Rohini", l: "Mo" }, { n: "Mrigashira", l: "Ma" }, { n: "Ardra", l: "Ra" },
  { n: "Punarvasu", l: "Ju" }, { n: "Pushya", l: "Sa" }, { n: "Ashlesha", l: "Me" },
  { n: "Magha", l: "Ke" }, { n: "Purva Phalguni", l: "Ve" }, { n: "Uttara Phalguni", l: "Su" },
  { n: "Hasta", l: "Mo" }, { n: "Chitra", l: "Ma" }, { n: "Swati", l: "Ra" },
  { n: "Vishakha", l: "Ju" }, { n: "Anuradha", l: "Sa" }, { n: "Jyeshtha", l: "Me" },
  { n: "Mula", l: "Ke" }, { n: "Purva Ashadha", l: "Ve" }, { n: "Uttara Ashadha", l: "Su" },
  { n: "Shravana", l: "Mo" }, { n: "Dhanishtha", l: "Ma" }, { n: "Shatabhisha", l: "Ra" },
  { n: "Purva Bhadrapada", l: "Ju" }, { n: "Uttara Bhadrapada", l: "Sa" }, { n: "Revati", l: "Me" }
];

export const DASHA_ORDER = ["Ke", "Ve", "Su", "Mo", "Ma", "Ra", "Ju", "Sa", "Me"];
export const DASHA_YEARS: Record<string, number> = { Ke: 7, Ve: 20, Su: 6, Mo: 10, Ma: 7, Ra: 18, Ju: 16, Sa: 19, Me: 17 };

export const PLANET_DICT: Record<string, any> = {
  Su: {
    sym: "☀️", col: "#f59e0b", ex: 1, de: 7, own: [5],
    en: { n: "Sun", kType: "Gyanavaraniya Karma", tirth: "Lord Padmaprabhu", tForm: "Radiant Red Padmaprabhu", mala: "Ruby or Red Sandalwood", count: "1,008 times on Sundays for 7 weeks", ritual: "Meditative gazing on the rising sun. Recite Bhaktamar Shloka 14.", kDesc: "Obscures natural omniscience. When heavy, causes loss of clarity and severe ego issues (Mana Kashaya).", mantra: "Om Hrim Shri Padmaprabha Jinendraya Namah", vMantra: "Om Hram Hreem Hroum Sah Suryaya Namah" },
    hi: { n: "सूर्य", kType: "ज्ञानावरण कर्म", tirth: "भगवान पद्मप्रभु", tForm: "रक्त-वर्ण पद्मप्रभु", mala: "माणिक्य या लाल चंदन", count: "7 सप्ताह तक रविवार को 1,008 बार", ritual: "उगते सूर्य पर त्राटक। भक्तामर श्लोक 14 का पाठ।", kDesc: "प्राकृतिक ज्ञान को ढकता है। भारी होने पर अहंकार (मान कषाय) की समस्या आती है।", mantra: "ॐ ह्रीं श्री पद्मप्रभ जिनेन्द्राय नमः", vMantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः" }
  },
  Mo: {
    sym: "🌙", col: "#3b82f6", ex: 2, de: 8, own: [4],
    en: { n: "Moon", kType: "Charitra Mohaniya Karma", tirth: "Lord Chandraprabhu", tForm: "Pure White Chandraprabhu", mala: "Pearl or Sphatik", count: "324 times daily at night", ritual: "Chandra-Darshan Tratak. Recite Ekibhav Stotra.", kDesc: "Governs the 4 passions (Anger, Pride, Deceit, Greed). When heavy, causes emotional turbulence.", mantra: "Om Hrim Shri Chandraprabha Jinendraya Namah", vMantra: "Om Shram Shreem Shroum Sah Chandramase Namah" },
    hi: { n: "चंद्र", kType: "चारित्र मोहनीय कर्म", tirth: "भगवान चंद्रप्रभु", tForm: "श्वेत-वर्ण चंद्रप्रभु", mala: "मोती या स्फटिक", count: "प्रतिदिन रात में 324 बार", ritual: "चंद्र-दर्शन त्राटक। शांति के लिए एकीभाव स्तोत्र।", kDesc: "कषायों को नियंत्रित करता है। भारी होने पर अत्यधिक भावनात्मक उथल-पुथल।", mantra: "ॐ ह्रीं श्री चंद्रप्रभ जिनेन्द्राय नमः", vMantra: "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः" }
  },
  Ma: {
    sym: "♂️", col: "#ef4444", ex: 10, de: 4, own: [1, 8],
    en: { n: "Mars", kType: "Virya Antaraya Karma", tirth: "Lord Vasupujya", tForm: "Fierce Red Vasupujya", mala: "Red Coral", count: "10,000 times over 21 days", ritual: "Bhoomi-Shayan on Tuesdays. Recite Vishapahar Stotra.", kDesc: "Blocks natural soul energy. Triggers severe Anger (Krodha Kashaya) and obstacles.", mantra: "Om Hrim Shri Vasupujya Jinendraya Namah", vMantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah" },
    hi: { n: "मंगल", kType: "वीर्य अंतराय कर्म", tirth: "भगवान वासुपूज्य", tForm: "तेजस्वी लाल वासुपूज्य", mala: "मूंगा", count: "21 दिनों में 10,000 बार", ritual: "मंगलवार को भूमि-शयन। विषापहार स्तोत्र का पाठ।", kDesc: "प्राकृतिक ऊर्जा को रोकता है। भारी क्रोध और बाधाएं पैदा करता है।", mantra: "ॐ ह्रीं श्री वासुपूज्य जिनेन्द्राय नमः", vMantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः" }
  },
  Me: {
    sym: "☿️", col: "#10b981", ex: 6, de: 12, own: [3, 6],
    en: { n: "Mercury", kType: "Shruta Gyanavaraniya Karma", tirth: "Lord Mallinath", tForm: "Emerald Green Mallinath", mala: "Emerald", count: "108 times daily", ritual: "Write 'Om Hrim Arham' 108 times in green ink. 30 mins Svadhyaya.", kDesc: "Obscures deep intelligence. Causes overthinking and Deceit (Maya).", mantra: "Om Hrim Shri Mallinath Jinendraya Namah", vMantra: "Om Bram Breem Broum Sah Budhaya Namah" },
    hi: { n: "बुध", kType: "श्रुत ज्ञानावरण कर्म", tirth: "भगवान मल्लिनाथ", tForm: "पन्ना हरा मल्लिनाथ", mala: "पन्ना", count: "प्रतिदिन 108 बार", ritual: "हरी स्याही से 108 बार 'ॐ ह्रीं अर्हं' लिखें।", kDesc: "शास्त्रीय ज्ञान को ढकता है। अति-सोच और छल पैदा करता है।", mantra: "ॐ ह्रीं श्री मल्लिनाथ जिनेन्द्राय नमः", vMantra: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः" }
  },
  Ju: {
    sym: "♃", col: "#eab308", ex: 4, de: 10, own: [9, 12],
    en: { n: "Jupiter", kType: "Darshanavaraniya Karma", tirth: "Lord Mahavira", tForm: "Golden Aura Mahavira", mala: "Yellow Sapphire or Haldi", count: "1 Mala daily on Thursdays", ritual: "Guru-Upasana on Thursdays. Apply pure Kesar tilak. Read Tattvartha Sutra.", kDesc: "Obscures right faith (Samyak Darshan). Blocks spiritual evolution.", mantra: "Om Hrim Shri Mahavira Jinendraya Namah", vMantra: "Om Gram Greem Groum Sah Gurave Namah" },
    hi: { n: "गुरु", kType: "दर्शनावरण कर्म", tirth: "भगवान महावीर", tForm: "सुनहरा महावीर", mala: "पुखराज या हल्दी", count: "गुरुवार को प्रतिदिन 1 माला", ritual: "गुरुवार को गुरु-उपासना। माथे पर केसर तिलक।", kDesc: "सम्यक दर्शन को ढकता है। आध्यात्मिक विकास रोकता है।", mantra: "ॐ ह्रीं श्री महावीर जिनेन्द्राय नमः", vMantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः" }
  },
  Ve: {
    sym: "♀️", col: "#8b5cf6", ex: 12, de: 6, own: [2, 7],
    en: { n: "Venus", kType: "Lobha Mohaniya Karma", tirth: "Lord Suvidhinath (Pushpadanta)", tForm: "Pure White Suvidhinath", mala: "Diamond or Sphatik", count: "108 times on Fridays", ritual: "Friday fast consuming only one white-colored meal. Recite Jin Sahasranama.", kDesc: "Binds heavy karma through worldly attachments and material greed.", mantra: "Om Hrim Shri Suvidhinath Jinendraya Namah", vMantra: "Om Dram Dreem Droum Sah Shukraya Namah" },
    hi: { n: "शुक्र", kType: "लोभ मोहनीय कर्म", tirth: "भगवान सुविधिनाथ", tForm: "शुद्ध सफेद सुविधिनाथ", mala: "हीरा या स्फटिक", count: "शुक्रवार को 108 बार", ritual: "एक सफेद रंग के भोजन के साथ शुक्रवार का उपवास।", kDesc: "सांसारिक आसक्ति, वासना और भौतिक लोभ के माध्यम से भारी कर्म बांधता है।", mantra: "ॐ ह्रीं श्री सुविधिनाथ जिनेन्द्राय नमः", vMantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः" }
  },
  Sa: {
    sym: "♄", col: "#64748b", ex: 7, de: 1, own: [10, 11],
    en: { n: "Saturn", kType: "Ayu & Nama Karma", tirth: "Lord Munisuvratnath", tForm: "Dark/Black Hue Munisuvratnath", mala: "Blue Sapphire or Black Hakik", count: "48 Shlokas daily for 19 months", ritual: "Kalashtami night worship with a mustard oil lamp. Perform selfless physical service.", kDesc: "Dictates physical conditions and deep karmic delays. Causes chronic diseases and struggles.", mantra: "Om Hrim Shri Munisuvratnatha Jinendraya Namah", vMantra: "Om Pram Preem Proum Sah Shanaishcharaya Namah" },
    hi: { n: "शनि", kType: "आयु एवं नाम कर्म", tirth: "भगवान मुनिसुव्रतनाथ", tForm: "श्याम-वर्ण मुनिसुव्रतनाथ", mala: "नीलम या काला हकीक", count: "19 महीनों तक प्रतिदिन श्लोक", ritual: "सरसों के तेल के दीपक के साथ कालाष्टमी रात्रि पूजा।", kDesc: "शारीरिक स्थिति और गहरी देरी को निर्धारित करता है।", mantra: "ॐ ह्रीं श्री मुनिसुव्रतनाथ जिनेन्द्राय नमः", vMantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः" }
  },
  Ra: {
    sym: "☊", col: "#7c3aed", ex: 3, de: 9, own: [11],
    en: { n: "Rahu", kType: "Mithyatva Mohaniya Karma", tirth: "Lord Neminath", tForm: "Dark Blue Neminath", mala: "Hessonite (Gomed)", count: "21 Malas on Saturdays", ritual: "Blow a conch shell daily at sunset. Jal-Abhimantran with Bhaktamar Shloka 39.", kDesc: "Causes profound psychological illusions. Triggers hidden enemies and sudden downfalls.", mantra: "Om Hrim Shri Neminath Jinendraya Namah", vMantra: "Om Bhram Bhreem Bhroum Sah Rahave Namah" },
    hi: { n: "राहु", kType: "मिथ्यात्व मोहनीय कर्म", tirth: "भगवान नेमिनाथ", tForm: "गहरा नीला नेमिनाथ", mala: "गोमेद", count: "शनिवार को 21 माला", ritual: "सूर्यास्त के समय शंख बजाएं। भक्तामर श्लोक 39 पाठ।", kDesc: "गहरे मनोवैज्ञानिक भ्रम पैदा करता है। गुप्त शत्रु पैदा करता है।", mantra: "ॐ ह्रीं श्री नेमिनाथ जिनेन्द्राय नमः", vMantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः" }
  },
  Ke: {
    sym: "☋", col: "#d97706", ex: 9, de: 3, own: [8],
    en: { n: "Ketu", kType: "Samyaktva Mohaniya Karma", tirth: "Lord Parshvanath", tForm: "Green Parshvanath protected by Dharanendra", mala: "Cat's Eye (Lehsunia)", count: "Ajapa Jaap (internal count)", ritual: "Midnight Samayika in total darkness. Recite Nirvana Kanda.", kDesc: "Reflects past-life spiritual austerities. Causes sudden detachment from the material world.", mantra: "Om Hrim Shri Parshvanatha Jinendraya Namah", vMantra: "Om Sram Sreem Sroum Sah Ketave Namah" },
    hi: { n: "केतु", kType: "सम्यक्त्व मोहनीय कर्म", tirth: "भगवान पार्श्वनाथ", tForm: "हरित-वर्ण पार्श्वनाथ", mala: "लहसुनिया", count: "अजपा जाप", ritual: "पूर्ण अंधकार में मध्यरात्रि सामायिक।", kDesc: "पूर्व जन्म के आध्यात्मिक तप को दर्शाता है। मोक्ष को गति देता है।", mantra: "ॐ ह्रीं श्री पार्श्वनाथ जिनेन्द्राय नमः", vMantra: "ॐ स्रां स्रीं स्रौं सः केतवे नमः" }
  }
};

export const LIFE_AREA_REMEDIES: Record<string, any> = {
  career: {
    en: { 
      title: "Career & Success", deity: "Mata Chakreshwari", yantra: "Vyapar Vriddhi Siddhachakra Yantra", source: "Jwalamalini Kalpa", mantra: "Om Hrim Shrim Klim Aim Arham Bhagavati Chakreshwari Devyai Hrim Swaha", bhaktamar: "Shloka 33 (Removes insurmountable obstacles)", procedure: "Establish the Yantra in the North. Light an incense stick daily before starting work. Recite the mantra 108 times using a Kamalgatta (lotus seed) rosary for 21 consecutive days.",
      cause: "Caused by affliction to the 10th house or weak Sun/Saturn, signifying past-life ego (Mana Kashaya) in professional duties.",
      impact: "Delays in promotion, repeated job losses, or lack of recognition despite hard work.",
      conventional: {
        method: "Jain Tirthankara Worship",
        process: "Daily recitation of Bhaktamar Shloka 33. Offer pure water (Jal) to Lord Padmaprabhu. Donate knowledge (Shastra Daan) to deserving students.",
        duration: "48 continuous days (One Mandala)."
      },
      nonConventional: {
        method: "Tantric Chakreshwari Sadhana",
        process: "On a Wednesday during Shukla Paksha, draw the Vyapar Vriddhi Yantra on a Bhojpatra using Ashtagandha. Place it in the North-East direction of your workspace. Recite 'Om Hrim Shrim Klim Aim Arham Bhagavati Chakreshwari Devyai Hrim Swaha' 108 times using a Kamalgatta mala before starting any major work.",
        duration: "Daily until the goal is achieved."
      }
    },
    hi: { 
      title: "करियर और सफलता", deity: "माता चक्रेश्वरी", yantra: "व्यापार वृद्धि सिद्धचक्र यंत्र", source: "ज्वालामालिनी कल्प", mantra: "ॐ ह्रीं श्रीं क्लीं ऐं अर्हं भगवती चक्रेश्वरी देव्यै ह्रीं स्वाहा", bhaktamar: "श्लोक 33", procedure: "यंत्र को उत्तर दिशा में स्थापित करें। प्रतिदिन काम शुरू करने से पहले अगरबत्ती जलाएं। 21 दिनों तक कमलगट्टे की माला से 108 बार मंत्र का जाप करें।",
      cause: "दशम भाव की पीड़ा या कमजोर सूर्य/शनि के कारण, जो पिछले जन्मों में कर्तव्यों में अहंकार (मान कषाय) को दर्शाता है।",
      impact: "पदोन्नति में देरी, बार-बार नौकरी छूटना, या कड़ी मेहनत के बावजूद पहचान की कमी।",
      conventional: {
        method: "जैन तीर्थंकर आराधना",
        process: "प्रतिदिन भक्तामर श्लोक 33 का पाठ करें। भगवान पद्मप्रभु को शुद्ध जल अर्पित करें। योग्य छात्रों को ज्ञान दान (शास्त्र दान) करें।",
        duration: "लगातार 48 दिन (एक मंडल)।"
      },
      nonConventional: {
        method: "तांत्रिक चक्रेश्वरी साधना",
        process: "शुक्ल पक्ष के किसी बुधवार को अष्टगंध से भोजपत्र पर व्यापार वृद्धि यंत्र बनाएं। इसे अपने कार्यस्थल की उत्तर-पूर्व दिशा में स्थापित करें। कोई भी बड़ा काम शुरू करने से पहले कमलगट्टे की माला से 108 बार 'ॐ ह्रीं श्रीं क्लीं ऐं अर्हं भगवती चक्रेश्वरी देव्यै ह्रीं स्वाहा' का जाप करें।",
        duration: "लक्ष्य प्राप्त होने तक प्रतिदिन।"
      }
    }
  },
  wealth: {
    en: { 
      title: "Wealth & Material Abundance", deity: "Mata Padmavati", yantra: "Padmavati Mahayantra", source: "Bhairav Padmavati Kalpa", mantra: "Om Hrim Shrim Klim Aim Padmavati Devyai Namah", bhaktamar: "Shloka 48", procedure: "Draw the Yantra on Bhojpatra using Kesar (saffron) ink on a Friday morning. Keep it in your safe or cash box. Chant the mantra 108 times daily facing the North direction.",
      cause: "Afflictions in the 2nd and 11th houses indicating misuse of wealth or extreme greed (Lobha Kashaya) in past lives.",
      impact: "Sudden financial losses, heavy debts, or inability to save money.",
      conventional: {
        method: "Dana & Pooja",
        process: "Perform Ahar Daan (feeding monks/poor) on Fridays. Recite Bhaktamar Shloka 48. Worship Lord Parshvanath with folded hands daily.",
        duration: "Fridays, ongoing."
      },
      nonConventional: {
        method: "Padmavati Wealth Protocol",
        process: "Draw the Padmavati Mahayantra on Bhojpatra using Kesar (saffron) ink on a Friday morning. Keep it in your safe or cash box wrapped in red silk. Chant 'Om Hrim Shrim Klim Aim Padmavati Devyai Namah' 108 times daily facing the North direction at twilight.",
        duration: "6 months for measurable results."
      }
    },
    hi: { 
      title: "धन एवं प्रचुरता", deity: "माता पद्मावती", yantra: "पद्मावती महायंत्र", source: "भैरव पद्मावती कल्प", mantra: "ॐ ह्रीं श्रीं क्लीं ऐं पद्मावती देव्यै नमः", bhaktamar: "श्लोक 48", procedure: "शुक्रवार की सुबह भोजपत्र पर केसर से यंत्र बनाएं। इसे अपनी तिजोरी में रखें। उत्तर दिशा की ओर मुख करके प्रतिदिन 108 बार इस मंत्र का जाप करें।",
      cause: "दूसरे और ग्यारहवें भाव में पीड़ा जो पिछले जन्मों में धन के दुरुपयोग या अत्यधिक लोभ (लोभ कषाय) को दर्शाती है।",
      impact: "अचानक आर्थिक नुकसान, भारी कर्ज, या पैसा बचाने में असमर्थता।",
      conventional: {
        method: "दान और पूजा",
        process: "शुक्रवार को आहार दान (भिक्षुओं/गरीबों को भोजन) करें। भक्तामर श्लोक 48 का पाठ करें। प्रतिदिन हाथ जोड़कर भगवान पार्श्वनाथ की पूजा करें।",
        duration: "शुक्रवार, निरंतर।"
      },
      nonConventional: {
        method: "पद्मावती धन अनुष्ठान",
        process: "शुक्रवार की सुबह भोजपत्र पर केसर से पद्मावती महायंत्र बनाएं। इसे लाल रेशम में लपेटकर अपनी तिजोरी या कैश बॉक्स में रखें। गोधूलि बेला में उत्तर दिशा की ओर मुख करके प्रतिदिन 108 बार 'ॐ ह्रीं श्रीं क्लीं ऐं पद्मावती देव्यै नमः' का जाप करें।",
        duration: "ठोस परिणामों के लिए 6 महीने।"
      }
    }
  },
  relationships: {
    en: { 
      title: "Relationships & Harmony", deity: "Mata Ambika", yantra: "Ambika Raksha Yantra", source: "Ambika Kalpa", mantra: "Om Hrim Shrim Klim Aim Ambika Devyai Swaha", bhaktamar: "Shloka 31", procedure: "Write the mantra with a pomegranate stick on copper plate. Place it in the bedroom facing East. On Wednesdays, offer white flowers and chant the mantra 108 times for domestic harmony.",
      cause: "7th house afflictions indicating past karma of creating discord (Maya - Deceit) between people.",
      impact: "Marital discord, frequent misunderstandings, or delayed marriage.",
      conventional: {
        method: "Svadhyaya & Forgiveness",
        process: "Practice the vow of Brahmacharya (faithfulness). Recite Bhaktamar Shloka 31. Practice daily Kshamaapana (forgiveness) mentally towards all beings.",
        duration: "Daily at night."
      },
      nonConventional: {
        method: "Ambika Harmony Ritual",
        process: "Write 'Om Hrim Shrim Klim Aim Ambika Devyai Swaha' with a pomegranate stick using pure sandalwood paste on a copper plate. Place it in the bedroom facing East. On Wednesdays, offer 5 white flowers to it and chant the mantra 108 times.",
        duration: "Until harmony is restored."
      }
    },
    hi: { 
      title: "रिश्ते एवं सद्भाव", deity: "माता अंबिका", yantra: "अंबिका रक्षा यंत्र", source: "अंबिका कल्प", mantra: "ॐ ह्रीं श्रीं क्लीं ऐं अंबिका देव्यै स्वाहा", bhaktamar: "श्लोक 31", procedure: "तांबे की प्लेट पर अनार की कलम से मंत्र लिखें। इसे शयनकक्ष में पूर्व दिशा की ओर रखें। बुधवार को सफेद फूल चढ़ाएं और सद्भाव के लिए 108 बार जाप करें।",
      cause: "सातवें भाव की पीड़ा जो लोगों के बीच कलह (माया - छल) पैदा करने के पिछले कर्म को दर्शाती है।",
      impact: "वैवाहिक कलह, बार-बार गलतफहमी, या विवाह में देरी।",
      conventional: {
        method: "स्वाध्याय और क्षमा",
        process: "ब्रह्मचर्य (निष्ठा) का पालन करें। भक्तामर श्लोक 31 का पाठ करें। सभी प्राणियों के प्रति मानसिक रूप से प्रतिदिन क्षमापना क्षमा) का अभ्यास करें।",
        duration: "रात में प्रतिदिन।"
      },
      nonConventional: {
        method: "अंबिका सद्भाव अनुष्ठान",
        process: "एक तांबे की प्लेट पर शुद्ध चंदन के लेप का उपयोग करके अनार की कलम से 'ॐ ह्रीं श्रीं क्लीं ऐं अंबिका देव्यै स्वाहा' लिखें। इसे पूर्व दिशा की ओर शयनकक्ष में रखें। प्रत्येक बुधवार को 5 सफेद फूल चढ़ाएं और मंत्र का 108 बार जाप करें।",
        duration: "सद्भाव बहाल होने तक।"
      }
    }
  },
  protection: {
    en: { 
      title: "Protection & Legal Troubles", deity: "Bhairav / Kshatrapal", yantra: "Bhairav Raksha Kavach", source: "Bhairav Kalpa", mantra: "Om Hrim Shrim Klim Aim Bhairavanathaya Kshatrapalaya Swaha", bhaktamar: "Shloka 39", procedure: "Take a black thread, chant this mantra 21 times while tying 7 knots. Wear it on the right wrist on a Saturday evening. Dissolve it in a river after your legal matters are successfully resolved.",
      cause: "Afflicted 6th house indicating past karma of harming others or giving false testimonies.",
      impact: "Hidden enemies, sudden legal cases, or constant feeling of negativity.",
      conventional: {
        method: "Sattvic Defense",
        process: "Sponsor medicines for monks (Aushadhi Daan). Recite Bhaktamar Shloka 39. Absolute avoidance of meat, alcohol, and honey.",
        duration: "Strict adherence during the legal phase."
      },
      nonConventional: {
        method: "Kshatrapal Raksha Bandhan",
        process: "Take a black cotton thread, chant 'Om Hrim Shrim Klim Aim Bhairavanathaya Kshatrapalaya Swaha' 21 times while tying 7 knots at equal intervals. Wear it on the right wrist during a Saturday evening after sunset. Dissolve it in flowing water after your legal matters or troubles are fully resolved.",
        duration: "Keep wearing until the issue passes."
      }
    },
    hi: { 
      title: "बुरी नजर व रक्षा", deity: "भैरव / क्षेत्रपाल", yantra: "भैरव रक्षा यंत्र", source: "भैरव कल्प", mantra: "ॐ ह्रीं श्रीं क्लीं ऐं भैरवनाथाय क्षेत्रपालाय स्वाहा", bhaktamar: "श्लोक 39", procedure: "एक काला धागा लें, 7 गांठ बांधते हुए 21 बार इस मंत्र का जाप करें। इसे शनिवार शाम दाहिनी कलाई पर पहनें। विवाद सुलझने के बाद इसे नदी में विसर्जित करें।",
      cause: "पीड़ित छठा भाव जो दूसरों को नुकसान पहुंचाने या झूठी गवाही देने के पिछले कर्म को दर्शाता है।",
      impact: "गुप्त शत्रु, अचानक कानूनी मामले, या नकारात्मकता की निरंतर भावना।",
      conventional: {
        method: "सात्विक रक्षा",
        process: "मुनियों के लिए दवाओं का दान करें (औषधि दान)। भक्तामर श्लोक 39 का पाठ करें। मांस, शराब और शहद से पूर्ण परहेज।",
        duration: "संकट के दौरान सख्त पालन।"
      },
      nonConventional: {
        method: "क्षेत्रपाल रक्षा बंधन",
        process: "एक काला सूती धागा लें, समान अंतराल पर 7 गांठ बांधते हुए 21 बार 'ॐ ह्रीं श्रीं क्लीं ऐं भैरवनाथाय क्षेत्रपालाय स्वाहा' का जाप करें। शनिवार की शाम को सूर्यास्त के बाद इसे अपनी दाहिनी कलाई पर बांध लें। संकट टलने के बाद इसे बहते जल में विसर्जित करें।",
        duration: "समस्या हल होने तक पहने रहें।"
      }
    }
  },
  health: {
    en: { 
      title: "Health & Disease Reversal", deity: "Ghantakarna Mahavir", yantra: "Ghantakarna Mahavir Yantra", source: "Ghantakarna Kalpa", mantra: "Om Hrim Shrim Klim Aim Ghantakarna Mahavir Sarvavyadhi Vinashanam Kuru Kuru Swaha", bhaktamar: "Shloka 45", procedure: "Abhimantran: Place a copper vessel filled with water. Chant the mantra 108 times focusing on the water. Drink this energized water empty stomach every day for 48 days.",
      cause: "6th/8th house afflictions, reflecting Asata Vedaniya karma deeply rooted in past life violence.",
      impact: "Chronic untreatable ailments, sudden accidents, or prolonged physical suffering.",
      conventional: {
        method: "Vedaniya Karma Shedding",
        process: "Strict dietary restrictions (no eating after sunset, boiled water only). Recite Bhaktamar Shloka 45 daily. Care for the sick.",
        duration: "For 3 months minimum."
      },
      nonConventional: {
        method: "Ghantakarna Jal Abhimantran",
        process: "Place a pure copper vessel filled with clean drinking water in front of you. Chant 'Om Hrim Shrim Klim Aim Ghantakarna Mahavir Sarvavyadhi Vinashanam Kuru Kuru Swaha' 108 times focusing entirely on the water. Drink this energized water on an empty stomach every morning.",
        duration: "Exactly 48 days."
      }
    },
    hi: { 
      title: "स्वास्थ्य एवं रोग निवारण", deity: "घंटाकर्ण महावीर", yantra: "घंटाकर्ण यंत्र", source: "घंटाकर्ण कल्प", mantra: "ॐ ह्रीं श्रीं क्लीं ऐं घंटाकर्ण महावीर सर्वव्याधि विनाशं कुरु कुरु स्वाहा", bhaktamar: "श्लोक 45", procedure: "अभिमंत्रण: पानी से भरा एक तांबे का बर्तन रखें। पानी पर ध्यान केंद्रित करते हुए 108 बार मंत्र का जाप करें। लगातार 48 दिनों तक खाली पेट इस अभिमंत्रित जल को पिएं।",
      cause: "6ठे/8वें भाव की पीड़ा, असाता वेदनीय कर्म को दर्शाती है जो पिछले जन्म की हिंसा से उत्पन्न हुआ है।",
      impact: "पुरानी लाइलाज बीमारियां, अचानक दुर्घटनाएं, या लंबे समय तक शारीरिक कष्ट।",
      conventional: {
        method: "वेदनीय कर्म निर्जरा",
        process: "सख्त आहार नियम (सूर्यास्त के बाद भोजन नहीं, केवल उबला हुआ पानी)। प्रतिदिन भक्तामर श्लोक 45 का पाठ करें। बीमारों की सेवा करें।",
        duration: "न्यूनतम 3 महीने के लिए।"
      },
      nonConventional: {
        method: "घंटाकर्ण जल अभिमंत्रण",
        process: "पीने के साफ पानी से भरा एक तांबे का बर्तन अपने सामने रखें। पानी पर पूरी तरह से ध्यान केंद्रित करते हुए 'ॐ ह्रीं श्रीं क्लीं ऐं घंटाकर्ण महावीर सर्वव्याधि विनाशं कुरु कुरु स्वाहा' का 108 बार जाप करें। हर सुबह खाली पेट इस अभिमंत्रित जल का सेवन करें।",
        duration: "ठीक 48 दिन।"
      }
    }
  }
};
