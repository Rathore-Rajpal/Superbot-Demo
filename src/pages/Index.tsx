import { useState } from 'react';
import Home from './Home';
import Chat from './Chat';
import { SupabaseDashboard } from '@/components/SupabaseDashboard';
import HowItWorks from '@/components/HowItWorks';
import SampleQueries from '@/components/SampleQueries';
import { N8NChatWidget } from '@/components/N8NChatWidget';

type ViewType = 'home' | 'chat' | 'dashboard' | 'how-it-works' | 'sample-queries';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSelectOption = (option: string) => {
    setSelectedCategory(option);
    if (option === 'Database' || option === 'Supabase Dashboard' || option === 'Live Data') {
      setCurrentView('dashboard');
    } else if (option === 'How It Works') {
      setCurrentView('how-it-works');
    } else if (option === 'Sample Queries') {
      setCurrentView('sample-queries');
    } else {
      setCurrentView('chat');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'home' ? (
        <Home onSelectOption={handleSelectOption} />
      ) : currentView === 'chat' ? (
        <Chat category={selectedCategory} onBack={handleBackToHome} />
      ) : currentView === 'how-it-works' ? (
        <div className="relative">
          <button
            onClick={handleBackToHome}
            className="absolute top-8 left-8 z-10 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl text-white font-semibold transition-all duration-300 border border-white/20"
          >
            ← Back to Home
          </button>
          <HowItWorks />
        </div>
      ) : currentView === 'sample-queries' ? (
        <div className="relative">
          <button
            onClick={handleBackToHome}
            className="absolute top-8 left-8 z-10 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl text-white font-semibold transition-all duration-300 border border-white/20"
          >
            ← Back to Home
          </button>
          <SampleQueries />
        </div>
      ) : (
        <div className="min-h-screen bg-[#00081d]">
          <div className="max-w-7xl mx-auto">
            <div className="p-6">
              <button
                onClick={handleBackToHome}
                className="mb-6 flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to Home
              </button>
            </div>
            <SupabaseDashboard />
          </div>
        </div>
      )}
      
      {/* Global Chat Widget - Available on all pages */}
      <N8NChatWidget />
    </div>
  );
};

export default Index;
