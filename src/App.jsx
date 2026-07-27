import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Analysis from './pages/Analysis';
import { Sparkles } from 'lucide-react';

const STORAGE_KEYS = {
  PROFILE: 'skillgap_profile',
  SKILLS: 'skillgap_selected_skills',
  DARK_MODE: 'skillgap_dark_mode',
  CURRENT_PAGE: 'skillgap_current_page'
};

const DEFAULT_PROFILE = {
  name: '',
  company: 'Google',
  role: 'Frontend Developer',
  gradYear: '2026',
  studyHours: 10
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE) || 'landing';
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [selectedSkills, setSelectedSkills] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved ? JSON.parse(saved) : false;
  });

  const [toast, setToast] = useState({ message: '', visible: false });

  // Update theme class on HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
  }, [darkMode]);

  // Sync profile, skills, and current page to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(selectedSkills));
  }, [selectedSkills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE, currentPage);
  }, [currentPage]);

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3000);
  };

  const handleStartAnalysis = () => {
    if (profile.name) {
      setCurrentPage('analysis');
    } else {
      setCurrentPage('profile');
    }
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setCurrentPage('analysis');
    showToast('Profile updated successfully!');
  };

  const handleNavigateHome = () => {
    setCurrentPage('landing');
  };

  const handleBackToProfile = () => {
    setCurrentPage('profile');
  };

  return (
    <div className="min-h-screen bg-app-bg dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 flex flex-col font-sans">
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onNavigateHome={handleNavigateHome} 
        currentPage={currentPage}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-start relative">
        <div className="w-full transition-all duration-500 ease-in-out opacity-100">
          {currentPage === 'landing' && (
            <Landing onStartAnalysis={handleStartAnalysis} />
          )}

          {currentPage === 'profile' && (
            <Profile 
              initialProfile={profile} 
              onSaveProfile={handleSaveProfile} 
            />
          )}

          {currentPage === 'analysis' && (
            <Analysis 
              profile={profile} 
              onBackToProfile={handleBackToProfile} 
              showToast={showToast}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/50 dark:border-slate-900 px-6 text-center text-xs text-slate-400 dark:text-slate-500 mt-12 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-4">
          <p>© {new Date().getFullYear()} SkillGap. Built for developers with passion.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Support</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast.visible && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-xl border border-slate-850 dark:border-slate-100 transition-all duration-300 ease-out transform translate-y-0 animate-bounce"
          id="toast-notification"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold font-poppins">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
