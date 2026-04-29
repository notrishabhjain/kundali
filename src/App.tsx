import React, { useState } from 'react';
import { calculateBirthChart } from './lib/chartGen';
import { CITIES } from './lib/jainData';
import { ChartHeader } from './components/ChartHeader';
import { Tabs } from './components/Tabs';
import { InputForm } from './components/InputForm';
import { KundaliView } from './components/KundaliView';
import { PlanetsView } from './components/PlanetsView';
import { DashaView } from './components/DashaView';
import { VedicView } from './components/VedicView';
import { PredictionsView } from './components/PredictionsView';
import { ChallengesView } from './components/ChallengesView';
import { RemediesView } from './components/RemediesView';
import { PujaView } from './components/PujaView';
import { CosmologyView } from './components/CosmologyView';
import { NotesView } from './components/NotesView';
import { RemediesReport } from './components/RemediesReport';
import { jsPDF } from "jspdf";
import * as htmlToImage from 'html-to-image';

function FullReport({ chartData, userData, lang, onReady }: any) {
  React.useEffect(() => {
    // Wait a tick for fonts/svgs to render
    const t = setTimeout(() => {
      onReady();
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="full-report-content" className="bg-[#FCF9F1] w-[800px] p-8 flex flex-col gap-10 font-sans mx-auto">
      <div className="text-center border-b-2 border-[#800000] pb-4">
         <h1 className="text-3xl font-serif text-[#800000] font-bold">{lang === 'hi' ? 'जैन जन्म कुण्डली' : 'Jain Janma Kundali'}</h1>
         <h2 className="text-xl font-bold mt-2">{userData.name}</h2>
         <p className="text-gray-600">{userData.date} | {userData.time} | {CITIES[userData.city]?.[lang] || userData.city}</p>
      </div>
      <div><KundaliView chart={chartData} lang={lang} userData={userData} /></div>
      <div className="page-break-after"><PlanetsView chart={chartData} lang={lang} /></div>
      <div><DashaView chart={chartData} lang={lang} /></div>
      <div><PredictionsView chart={chartData} lang={lang} /></div>
      <div><ChallengesView chart={chartData} lang={lang} /></div>
      <div><RemediesView chart={chartData} lang={lang} /></div>
      <div><PujaView chart={chartData} lang={lang} /></div>
      <div><CosmologyView chart={chartData} lang={lang} /></div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'en'|'hi'>('hi');
  const [activeTab, setActiveTab] = useState('input');
  const [chartData, setChartData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingRemediesPDF, setIsGeneratingRemediesPDF] = useState(false);

  const generateChart = (data: any) => {
    try {
      const cityData = CITIES[data.city];
      const lat = data.lat ? parseFloat(data.lat) : (cityData?.lat || 28.61);
      const lon = data.lon ? parseFloat(data.lon) : (cityData?.lon || 77.2);
      
      const chart = calculateBirthChart(data.date, data.time, lat, lon);
      setChartData(chart);
      setUserData({ ...data, lat, lon });
      setActiveTab('kundali');
    } catch(e) {
      console.error(e);
      alert('Error calculating chart.');
    }
  };

  const handleGeneratePDF = async () => {
    const element = document.getElementById('full-report-content');
    if(!element) {
      setIsGeneratingPDF(false);
      return;
    }
    
    try {
      const dataUrl = await htmlToImage.toPng(element, { 
        pixelRatio: 2, 
        backgroundColor: '#FCF9F1',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const props = pdf.getImageProperties(dataUrl);
      const imgHeightInMm = (props.height * pdfWidth) / props.width;

      let heightLeft = imgHeightInMm;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, imgHeightInMm);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeightInMm;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, imgHeightInMm);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${userData.name.replace(/\s+/g, '_')}_Jain_Kundali.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleGenerateRemediesPDF = async () => {
    const element = document.getElementById('remedies-report-content');
    if(!element) {
      setIsGeneratingRemediesPDF(false);
      return;
    }
    
    try {
      const dataUrl = await htmlToImage.toPng(element, { 
        pixelRatio: 2, 
        backgroundColor: '#FCF9F1',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const props = pdf.getImageProperties(dataUrl);
      const imgHeightInMm = (props.height * pdfWidth) / props.width;

      let heightLeft = imgHeightInMm;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, imgHeightInMm);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeightInMm;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, imgHeightInMm);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${userData.name.replace(/\s+/g, '_')}_Remedies_Anushthan.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingRemediesPDF(false);
    }
  };

  const renderTab = () => {
    if (activeTab === 'input') return <InputForm onCalculate={generateChart} lang={lang} />;
    if (!chartData) return null;
    
    switch(activeTab) {
      case 'kundali': return <KundaliView chart={chartData} lang={lang} userData={userData} />;
      case 'planets': return <PlanetsView chart={chartData} lang={lang} />;
      case 'vedic': return <VedicView chart={chartData} lang={lang} />;
      case 'dasha': return <DashaView chart={chartData} lang={lang} />;
      case 'predictions': return <PredictionsView chart={chartData} lang={lang} />;
      case 'challenges': return <ChallengesView chart={chartData} lang={lang} />;
      case 'remedies': return <RemediesView chart={chartData} lang={lang} />;
      case 'puja': return <PujaView chart={chartData} lang={lang} />;
      case 'cosmology': return <CosmologyView chart={chartData} lang={lang} />;
      case 'notes': return <NotesView lang={lang} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen bg-[#FCF9F1] font-sans text-gray-800 flex flex-col relative ${isGeneratingPDF || isGeneratingRemediesPDF ? '' : 'overflow-x-hidden'}`}>
      <ChartHeader lang={lang} toggleLang={() => setLang(l => l === 'en' ? 'hi' : 'en')} />
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        
        {chartData && activeTab !== 'input' && (
          <div className="flex justify-between items-center mb-6 bg-white p-3 md:p-4 rounded shadow-sm border border-gray-200">
            <div className="text-sm">
              <strong className="text-[#800000]">{userData.name}</strong> • {userData.date}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsGeneratingRemediesPDF(true)}
                disabled={isGeneratingRemediesPDF || isGeneratingPDF}
                className={`bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-medium text-xs tracking-wider transition shadow-sm flex items-center gap-2 ${isGeneratingRemediesPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isGeneratingRemediesPDF ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {lang === 'hi' ? 'पीडीएफ...' : 'Gen...'}
                  </>
                ) : (
                  <>
                    🕉️ {lang === 'hi' ? 'सम्पूर्ण उपाय एवं अनुष्ठान (PDF)' : 'Download Remedies Only (PDF)'}
                  </>
                )}
              </button>
              
              <button 
                onClick={() => setIsGeneratingPDF(true)}
                disabled={isGeneratingPDF || isGeneratingRemediesPDF}
                className={`bg-[#800000] hover:bg-[#800000]/90 text-white px-4 py-2 rounded font-medium text-xs tracking-wider uppercase transition shadow-sm flex items-center gap-2 ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isGeneratingPDF ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {lang === 'hi' ? 'पीडीएफ...' : 'Gen...'}
                  </>
                ) : (
                  <>
                    📥 {lang === 'hi' ? 'रुपरेखा रिपोर्ट (PDF)' : 'Full Report (PDF)'}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <Tabs activeTab={activeTab} onChange={setActiveTab} lang={lang} />
        <main className="mt-8">
          {renderTab()}
        </main>
      </div>

      {isGeneratingPDF && (
        <>
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[110] flex justify-center items-center">
             <div className="bg-white p-8 rounded-lg shadow-2xl text-center border border-gray-200">
                <div className="w-12 h-12 border-4 border-[#800000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-bold text-[#800000] text-lg mb-2">{lang === 'hi' ? 'सम्पूर्ण रिपोर्ट बनाई जा रही है...' : 'Building Full Report...'}</p>
                <p className="text-gray-500 text-sm">{lang === 'hi' ? 'कृपया प्रतीक्षा करें, इसमें कुछ सेकंड लग सकते हैं।' : 'Please wait, this might take a few seconds.'}</p>
             </div>
          </div>
          <div className="absolute top-0 left-0 -z-[100] opacity-0 pointer-events-none">
            <FullReport 
              chartData={chartData} 
              userData={userData} 
              lang={lang} 
              onReady={handleGeneratePDF} 
            />
          </div>
        </>
      )}

      {isGeneratingRemediesPDF && (
        <>
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[110] flex justify-center items-center">
             <div className="bg-white p-8 rounded-lg shadow-2xl text-center border border-gray-200">
                <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-bold text-orange-800 text-lg mb-2">{lang === 'hi' ? 'उपाय एवं अनुष्ठान रिपोर्ट बनाई जा रही है...' : 'Building Remedies Report...'}</p>
                <p className="text-gray-500 text-sm">{lang === 'hi' ? 'कृपया प्रतीक्षा करें, इसमें कुछ सेकंड लग सकते हैं।' : 'Please wait, this might take a few seconds.'}</p>
             </div>
          </div>
          <div className="absolute top-0 left-0 -z-[100] opacity-0 pointer-events-none">
            <RemediesReport 
              chartData={chartData} 
              chart={chartData}
              userData={userData} 
              lang={lang} 
              onReady={handleGenerateRemediesPDF} 
            />
          </div>
        </>
      )}
    </div>
  );
}
