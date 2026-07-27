import React from 'react';
import { Compass, BookOpen, Layers, Target, ArrowRight } from 'lucide-react';

export default function Landing({ onStartAnalysis }) {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Skill Analysis",
      description: "Analyze your current coding skills against major real-world role requirements at top tier tech companies."
    },
    {
      icon: <Layers className="w-6 h-6 text-secondary" />,
      title: "Career Dashboard",
      description: "Get a clear picture of your career readiness percentage with modern dynamic visual charts."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-success" />,
      title: "Learning Roadmap",
      description: "Get a customized timeline of missing skills, with weekly topics and suggestions for mini-projects."
    },
    {
      icon: <Compass className="w-6 h-6 text-warning" />,
      title: "Progress Tracking",
      description: "Keep track of estimated completion times and milestones as you work towards 100% readiness."
    }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-4xl mx-auto flex flex-col items-center relative">
        {/* Background blobs for depth */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />
        <div className="absolute -top-10 left-1/3 w-60 h-60 bg-secondary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-6 border border-primary/20">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          Powered by Smart Match Matching Algorithm
        </div>

        <h1 className="font-poppins font-extrabold text-5xl md:text-6xl tracking-tight text-slate-800 dark:text-white leading-tight mb-6">
          Know your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Skill Gap</span>.<br />
          Build Your Career with Confidence.
        </h1>
        
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-455 max-w-2xl leading-relaxed mb-10">
          SkillGap helps students bridging the distance between where they are and where they want to be. Select your dream role, check your current skills, and get a customized learning roadmap.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <button
            onClick={onStartAnalysis}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            id="start-analysis-cta-btn"
          >
            Start Analysis
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <a
            href="#features-section"
            className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-all duration-300 flex items-center justify-center cursor-pointer"
            id="learn-more-btn"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-16 px-6 max-w-6xl w-full scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl text-slate-800 dark:text-white mb-3">
            Comprehensive Career Mapping
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xl mx-auto">
            Our app analyzes and prepares you step-by-step to be competitive in the job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="bg-slate-50 dark:bg-slate-850 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-slate-100 dark:border-slate-805">
                {feature.icon}
              </div>
              <h3 className="font-poppins font-bold text-lg text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
