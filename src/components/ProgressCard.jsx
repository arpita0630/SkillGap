import React from 'react';
import { Calendar, Target, Award, BookOpen } from 'lucide-react';

export default function ProgressCard({ 
  readiness = 0, 
  haveCount = 0, 
  missingCount = 0, 
  estimatedWeeks = 0 
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-success/10 dark:bg-success/20 p-2 rounded-xl text-success">
          <Target className="w-5 h-5" />
        </div>
        <h3 className="font-poppins font-bold text-lg text-slate-850 dark:text-white">
          Learning Tracker
        </h3>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm font-semibold">
          <span className="text-slate-500 dark:text-slate-400">Current Readiness</span>
          <span className="text-primary font-bold">{readiness}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-850 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${readiness}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
          <span>0%</span>
          <span>Target: 100%</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Have Skills */}
        <div className="bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Acquired</span>
            <BookOpen className="w-4 h-4 text-success" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white font-poppins block leading-none mb-1">
              {haveCount}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
              Skills
            </span>
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">To Learn</span>
            <Award className="w-4 h-4 text-danger" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white font-poppins block leading-none mb-1">
              {missingCount}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
              Skills
            </span>
          </div>
        </div>
      </div>

      {/* Completion Est */}
      <div className="mt-5 pt-5 border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4.5 h-4.5 text-primary" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Estimated Completion
          </span>
        </div>
        <span className="text-sm font-extrabold text-slate-800 dark:text-white font-poppins">
          {estimatedWeeks} {estimatedWeeks === 1 ? 'Week' : 'Weeks'}
        </span>
      </div>
    </div>
  );
}
