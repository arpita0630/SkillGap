import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, Check, Compass, Award, 
  ArrowLeft, RefreshCw, Sparkles, Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { skillsList } from '../data/skills';
import { roles } from '../data/roles';
import { calculateScore } from '../utils/calculateScore';
import { generateRoadmap, estimateCompletionWeeks } from '../utils/generateRoadmap';

import ScoreCircle from '../components/ScoreCircle';
import Timeline from '../components/Timeline';
import ProgressCard from '../components/ProgressCard';

const CATEGORIES = ["All", "Frontend", "Backend", "Languages", "Computer Science", "Tools", "DevOps"];

export default function Analysis({ 
  profile, 
  onBackToProfile, 
  showToast,
  selectedSkills,
  setSelectedSkills
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const requiredSkills = roles[profile.role] || [];
  
  // Calculate results
  const { readinessScore, knownSkills, missingSkills, nextSkill } = calculateScore(selectedSkills, requiredSkills);
  const roadmapSteps = generateRoadmap(missingSkills, profile.role, profile.studyHours);
  const estimatedWeeks = estimateCompletionWeeks(missingSkills, profile.studyHours);

  // Trigger confetti on high score
  useEffect(() => {
    if (isAnalyzed && readinessScore >= 90) {
      triggerConfetti();
    }
  }, [isAnalyzed, readinessScore]);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6C63FF', '#8B5CF6', '#22C55E']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6C63FF', '#8B5CF6', '#22C55E']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleToggleSkill = (skillName) => {
    setSelectedSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(s => s !== skillName) 
        : [...prev, skillName]
    );
  };

  const handleSelectAll = () => {
    setSelectedSkills(skillsList.map(s => s.name));
    showToast("All skills selected!");
  };

  const handleDeselectAll = () => {
    setSelectedSkills([]);
    showToast("All skills deselected!");
  };

  const handleRunAnalysis = () => {
    setIsAnalyzed(true);
    showToast("AI-Powered Skill Gap Analysis complete!");
  };

  // Filter skills
  const filteredSkills = skillsList.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const nextSkillDetails = nextSkill ? skillsList.find(s => s.name === nextSkill) : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-poppins font-extrabold text-3xl text-slate-800 dark:text-white flex items-center gap-2">
            {isAnalyzed ? (
              <>
                <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                Your Preparation Dashboard
              </>
            ) : (
              <>
                <Compass className="w-7 h-7 text-primary animate-pulse" />
                Select Your Skills
              </>
            )}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {isAnalyzed 
              ? `Real-time readiness roadmap for ${profile.name} to join ${profile.company} as a ${profile.role}`
              : `Check the skills you currently possess so we can compare them against ${profile.role} requirements.`
            }
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isAnalyzed ? (
            <>
              <button
                onClick={() => setIsAnalyzed(false)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                id="modify-skills-btn"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Modify Skills
              </button>
              <button
                onClick={onBackToProfile}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-250 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                id="edit-profile-btn"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            </>
          ) : (
            <button
              onClick={onBackToProfile}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-750 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              id="back-profile-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Profile
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: SKILL SELECTION */}
      {!isAnalyzed && (
        <div className="space-y-6">
          {/* Target requirements alert */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/10 dark:border-primary/20 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase bg-primary text-white px-2 py-0.5 rounded-full inline-block mb-1.5">
                Target Role
              </span>
              <h3 className="font-poppins font-bold text-lg text-slate-800 dark:text-white">
                {profile.role} at {profile.company}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Requires a specific set of <strong className="text-primary">{requiredSkills.length} core skills</strong>. Select the ones you already know below.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSelectAll}
                className="px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-850 text-xs font-semibold text-slate-650 dark:text-slate-300 rounded-xl transition-all cursor-pointer"
                id="select-all-skills"
              >
                Select All
              </button>
              <button 
                onClick={handleDeselectAll}
                className="px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-850 text-xs font-semibold text-slate-650 dark:text-slate-300 rounded-xl transition-all cursor-pointer"
                id="deselect-all-skills"
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search skills (e.g. React, Docker)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                id="skill-search-input"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-sm shadow-primary/20'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-55 dark:hover:bg-slate-800'
                  }`}
                  id={`filter-pill-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill.name);
              const isRequired = requiredSkills.includes(skill.name);
              
              // Difficulty tag color
              let diffColor = "text-success bg-success/10";
              if (skill.difficulty === "Medium") diffColor = "text-warning bg-warning/10";
              if (skill.difficulty === "Hard") diffColor = "text-danger bg-danger/10";

              return (
                <div
                  key={skill.name}
                  onClick={() => handleToggleSkill(skill.name)}
                  className={`border p-4.5 rounded-2xl cursor-pointer select-none transition-all duration-300 flex flex-col justify-between relative group ${
                    isSelected 
                      ? 'border-primary bg-primary/[0.02] dark:bg-primary/[0.04] shadow-md shadow-primary/5' 
                      : 'border-slate-250/60 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-700'
                  }`}
                  id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {/* Indicators */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${diffColor}`}>
                      {skill.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      {isRequired && (
                        <span className="text-[9px] font-semibold bg-secondary/15 text-secondary dark:bg-secondary/25 px-1.5 py-0.5 rounded-md">
                          Required
                        </span>
                      )}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isSelected 
                          ? 'bg-primary border-primary text-white scale-110' 
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-transparent group-hover:border-slate-300'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </div>
                    </div>
                  </div>

                  {/* Skill Name */}
                  <div className="mt-1">
                    <h3 className="font-poppins font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors text-base">
                      {skill.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      Est. {skill.weeks} {skill.weeks === 1 ? 'week' : 'weeks'}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {filteredSkills.length === 0 && (
              <div className="col-span-full text-center py-10 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl">
                No skills match your filters. Try adjusting search or category.
              </div>
            )}
          </div>

          {/* Analyze CTA */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleRunAnalysis}
              className="px-10 py-4.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 text-base cursor-pointer"
              id="analyze-skills-cta-btn"
            >
              Analyze Skill Gap
              <Sparkles className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: DASHBOARD & ROADMAP */}
      {isAnalyzed && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Overview cards & Timeline */}
          <div className="lg:col-span-8 space-y-8">
            {/* TOP SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* Score card */}
              <div className="sm:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center">
                <ScoreCircle score={readinessScore} />
                <div className="text-center mt-3">
                  <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">
                    Target Goal
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">
                    {profile.role} at {profile.company}
                  </span>
                </div>
              </div>

              {/* Next Skill / Profile details */}
              <div className="sm:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                
                {nextSkill ? (
                  <>
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-3">
                        <Sparkles className="w-3 h-3" /> Recommended next step
                      </span>
                      <h3 className="font-poppins font-extrabold text-2xl text-slate-800 dark:text-white leading-tight">
                        Learn {nextSkill}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                        To optimize your path for {profile.role}, our algorithm suggests focusing on this core missing skill first.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-secondary" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Est. Duration</span>
                          <span className="text-xs font-bold text-slate-750 dark:text-slate-300">
                            {nextSkillDetails ? nextSkillDetails.weeks : 2} {nextSkillDetails && nextSkillDetails.weeks === 1 ? 'Week' : 'Weeks'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-warning" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Difficulty</span>
                          <span className="text-xs font-bold text-slate-750 dark:text-slate-300">
                            {nextSkillDetails ? nextSkillDetails.difficulty : 'Medium'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full py-4">
                    <div className="bg-success/10 text-success p-3 rounded-full mb-3">
                      <Check className="w-8 h-8 stroke-[3px]" />
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-white">
                      All Requirements Met!
                    </h3>
                    <p className="text-xs text-slate-450 dark:text-slate-500 mt-1.5 max-w-sm">
                      You already have all of the required core skills for {profile.role}! Focus on the advanced system design roadmap below.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* LEARNING ROADMAP TIMELINE */}
            <div>
              <h2 className="font-poppins font-bold text-xl text-slate-850 dark:text-white mb-5 flex items-center gap-2">
                <BookOpen className="w-5.5 h-5.5 text-primary" />
                Step-by-Step Learning Roadmap
              </h2>
              <Timeline steps={roadmapSteps} />
            </div>
          </div>

          {/* RIGHT COLUMN: Progress tracker & Skills details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Progress tracker card */}
            <ProgressCard 
              readiness={readinessScore}
              haveCount={knownSkills.length}
              missingCount={missingSkills.length}
              estimatedWeeks={estimatedWeeks}
            />

            {/* Skills categorization chips */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-white mb-4">
                Core Skill Gaps for {profile.role}
              </h3>
              
              <div className="space-y-4">
                {/* Have list */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-success uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    Skills you possess ({knownSkills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {knownSkills.map(skill => (
                      <span 
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-success/10 text-success border border-success/10"
                      >
                        {skill}
                      </span>
                    ))}
                    {knownSkills.length === 0 && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 italic">None selected yet</span>
                    )}
                  </div>
                </div>

                {/* Missing list */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-danger uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger"></span>
                    Missing skills you need ({missingSkills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {missingSkills.map(skill => (
                      <span 
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-danger/10 text-danger border border-danger/10"
                      >
                        {skill}
                      </span>
                    ))}
                    {missingSkills.length === 0 && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 italic">All skills acquired!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
