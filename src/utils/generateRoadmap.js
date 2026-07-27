import { skillsList } from '../data/skills';

export function generateRoadmap(missingSkills, targetRole, weeklyStudyHours) {
  // If there are no missing skills (readiness is 100%)
  if (missingSkills.length === 0) {
    return [
      {
        weekRange: "Week 1-2",
        title: "Advanced System Design & Architecture",
        description: "Focus on designing high-throughput, scale-ready architectures.",
        topics: ["Microservices vs Monoliths", "Load Balancers & Caching", "API Gateways", "System Design Patterns"],
        type: "concept"
      },
      {
        weekRange: "Week 3-4",
        title: "Production Deployment & CI/CD",
        description: "Deploy a production-grade application and set up monitoring.",
        topics: ["GitHub Actions / GitLab CI", "Container Orchestration (Kubernetes/ECS)", "Logging (ELK Stack / Prometheus)", "Cloud Deployment (AWS/GCP/Vercel)"],
        type: "practice"
      },
      {
        weekRange: "Week 5-6",
        title: "Capstone Portfolio Project",
        description: `Build a highly polished, showcase-ready ${targetRole} application.`,
        topics: ["Advanced state management / db optimization", "Complete integration tests", "User authentication & JWT", "Automated deployment & Domain setup"],
        type: "project",
        projectTitle: getProjectTitle(targetRole)
      }
    ];
  }

  // Calculate speed multiplier based on weekly study hours (10 hours = standard 1x speed)
  const baseHours = 10;
  const multiplier = baseHours / weeklyStudyHours;

  const roadmapSteps = [];
  let currentWeek = 1;

  // Map each missing skill to a roadmap step
  missingSkills.forEach(skillName => {
    const skillData = skillsList.find(s => s.name === skillName) || {
      name: skillName,
      difficulty: "Medium",
      weeks: 2,
      topics: ["Core Fundamentals", "Best Practices", "Hands-on Exercise"]
    };

    // Calculate adjusted weeks, min 1 week
    const adjustedWeeks = Math.max(1, Math.round(skillData.weeks * multiplier));
    const endWeek = currentWeek + adjustedWeeks - 1;
    
    const weekRange = adjustedWeeks === 1 
      ? `Week ${currentWeek}` 
      : `Week ${currentWeek}-${endWeek}`;

    roadmapSteps.push({
      weekRange,
      title: `${skillData.name} Mastery`,
      description: `Learn the fundamentals and advanced topics of ${skillData.name} at a ${skillData.difficulty.toLowerCase()} level.`,
      topics: skillData.topics,
      type: "concept"
    });

    currentWeek = endWeek + 1;
  });

  // Add a Capstone Project week at the end
  const projectDuration = Math.max(1, Math.round(2 * multiplier));
  const projectEndWeek = currentWeek + projectDuration - 1;
  const projectWeekRange = projectDuration === 1 
    ? `Week ${currentWeek}` 
    : `Week ${currentWeek}-${projectEndWeek}`;

  roadmapSteps.push({
    weekRange: projectWeekRange,
    title: "Capstone Mini Project",
    description: `Build a real-world project to solidify your new skills.`,
    topics: ["Project Setup & Repository", "Implementation & API Integration", "Styling & Responsive UI", "Deployment to Production"],
    type: "project",
    projectTitle: getProjectTitle(targetRole)
  });

  return roadmapSteps;
}

function getProjectTitle(role) {
  const projects = {
    "Frontend Developer": "Premium Analytics Dashboard or E-Commerce Frontend",
    "Backend Developer": "Secure Task Manager API or Real-time Blog Backend Services",
    "Full Stack Developer": "SaaS Workspace Planner or Social Networking Platform",
    "Java Developer": "Scalable Inventory Management System or Bank Transaction API",
    "Python Developer": "Data Scraping & Visualization Tool or Django REST Commerce Engine",
    "Data Analyst": "Housing Market Interactive Analysis or Sales Performance Dashboard",
    "AI Engineer": "Image Classification Web App or Sentiment Analysis Pipeline",
    "Software Engineer": "Distributed Key-Value Store or Custom Lightweight Database"
  };

  return projects[role] || "Full-featured Portfolio Application";
}

export function estimateCompletionWeeks(missingSkills, weeklyStudyHours) {
  if (missingSkills.length === 0) return 6;
  const baseHours = 10;
  const multiplier = baseHours / weeklyStudyHours;
  
  const skillsWeeks = missingSkills.reduce((total, skillName) => {
    const skillData = skillsList.find(s => s.name === skillName);
    const skillWeeks = skillData ? skillData.weeks : 2;
    return total + Math.max(1, Math.round(skillWeeks * multiplier));
  }, 0);

  const projectWeeks = Math.max(1, Math.round(2 * multiplier));
  return skillsWeeks + projectWeeks;
}
