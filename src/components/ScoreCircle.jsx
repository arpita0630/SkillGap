import React, { useEffect, useState } from 'react';

export default function ScoreCircle({ score = 0, size = 180, strokeWidth = 14 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    // Smooth number counting animation
    const duration = 1200; // ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing out quad
      const easedProgress = progress * (2 - progress);
      setAnimatedScore(Math.round(easedProgress * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const offset = circumference - (animatedScore / 100) * circumference;

  // Determine color matching score range
  let gradientId = 'grad-danger';
  if (score >= 90) {
    gradientId = 'grad-success';
  } else if (score >= 70) {
    gradientId = 'grad-secondary';
  } else if (score >= 40) {
    gradientId = 'grad-warning';
  }

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="grad-success" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          <linearGradient id="grad-secondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="grad-warning" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient id="grad-danger" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F87171" />
          </linearGradient>
        </defs>
        
        {/* Track Circle */}
        <circle
          className="stroke-slate-100 dark:stroke-slate-800"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress Circle */}
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>

      {/* Inside Text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white font-poppins">
          {animatedScore}%
        </span>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 mt-0.5">
          Readiness
        </span>
      </div>
    </div>
  );
}
