import React from 'react';
import { BookOpen, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Timeline({ steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-8 py-4">
      {steps.map((step, index) => {
        const isProject = step.type === 'project';
        
        return (
          <div key={index} className="relative pl-8 md:pl-10 group">
            {/* Timeline Dot Indicator */}
            <div className={`absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-50 dark:border-slate-900 transition-all duration-300 group-hover:scale-110 ${
              isProject 
                ? 'bg-gradient-to-br from-secondary to-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-primary dark:text-secondary'
            }`}>
              {isProject ? (
                <Award className="w-3.5 h-3.5" />
              ) : (
                <BookOpen className="w-3.5 h-3.5" />
              )}
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light w-fit">
                  {step.weekRange}
                </span>
                <h4 className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {isProject ? 'Hands-on project' : 'Skill building'}
                </h4>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 dark:text-white font-poppins mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Topics / Project Spec */}
              {isProject && step.projectTitle ? (
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/10 dark:border-primary/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Suggested Project</span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-base">
                    {step.projectTitle}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {step.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-350">
                        <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Topics to Learn</span>
                  <div className="flex flex-wrap gap-2">
                    {step.topics.map((topic, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                      >
                        <ChevronRight className="w-3 h-3 text-primary" />
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
