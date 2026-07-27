import React from 'react';
import { Compass, Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, onNavigateHome, currentPage }) {
  return (
    <nav className="sticky top-0 z-50 glassmorphism transition-colors duration-300 border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 flex justify-between items-center">
      <div 
        onClick={onNavigateHome}
        className="flex items-center gap-2 cursor-pointer group"
        id="navbar-logo"
      >
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl text-primary transition-transform duration-300 group-hover:scale-110">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-poppins font-bold text-xl tracking-tight text-slate-800 dark:text-white flex items-center gap-1">
            SkillGap
            <span className="text-[10px] font-semibold bg-gradient-to-r from-primary to-secondary text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> AI
            </span>
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Career Roadmap Builder</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {currentPage !== 'landing' && (
          <button
            onClick={onNavigateHome}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
            id="nav-home-btn"
          >
            Home
          </button>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all duration-300 cursor-pointer"
          aria-label="Toggle theme"
          id="theme-toggle-btn"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
      </div>
    </nav>
  );
}
