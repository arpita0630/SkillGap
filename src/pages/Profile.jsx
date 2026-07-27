import React, { useState } from 'react';
import { Target, ArrowRight } from 'lucide-react';

const COMPANIES = ["Google", "Microsoft", "Amazon", "Adobe", "Oracle", "TCS", "Infosys", "Wipro", "Accenture", "Capgemini"];
const ROLES = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Java Developer", "Python Developer", "Data Analyst", "AI Engineer", "Software Engineer"];
const YEARS = ["2026", "2027", "2028"];

export default function Profile({ initialProfile, onSaveProfile }) {
  const [name, setName] = useState(initialProfile.name || '');
  const [company, setCompany] = useState(initialProfile.company || COMPANIES[0]);
  const [role, setRole] = useState(initialProfile.role || ROLES[0]);
  const [gradYear, setGradYear] = useState(initialProfile.gradYear || YEARS[0]);
  const [studyHours, setStudyHours] = useState(initialProfile.studyHours || 10);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveProfile({
      name: name.trim(),
      company,
      role,
      gradYear,
      studyHours: parseInt(studyHours, 10)
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto py-10 px-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-2xl text-primary">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-poppins font-bold text-2xl text-slate-800 dark:text-white leading-tight">
              Career Profile
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Tell us about your dream job and preparation goals
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-name" className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              id="user-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              placeholder="John Doe"
              className={`w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-850 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                errors.name ? 'border-danger' : 'border-slate-200 dark:border-slate-800'
              }`}
            />
            {errors.name && (
              <span className="text-xs font-semibold text-danger" id="name-error">
                {errors.name}
              </span>
            )}
          </div>

          {/* Company & Role Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="target-company" className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                Target Company
              </label>
              <select
                id="target-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-slate-700 dark:text-slate-300"
              >
                {COMPANIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="target-role" className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                Target Role
              </label>
              <select
                id="target-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-slate-700 dark:text-slate-300"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Graduation Year */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="grad-year" className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
              Graduation Year
            </label>
            <select
              id="grad-year"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-slate-700 dark:text-slate-300"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Study Hours Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="study-hours" className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                Weekly Study Hours
              </label>
              <span className="text-sm font-extrabold text-primary font-poppins">
                {studyHours} Hours
              </span>
            </div>
            <input
              type="range"
              id="study-hours"
              min="1"
              max="40"
              value={studyHours}
              onChange={(e) => setStudyHours(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
              <span>1 Hour</span>
              <span>40 Hours</span>
            </div>
          </div>

          {/* Continue button */}
          <button
            type="submit"
            className="w-full py-4 mt-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            id="profile-continue-btn"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
