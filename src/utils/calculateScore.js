export function calculateScore(selectedSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return {
      readinessScore: 0,
      knownSkills: [],
      missingSkills: [],
      nextSkill: null
    };
  }

  const knownSkills = requiredSkills.filter(skill => selectedSkills.includes(skill));
  const missingSkills = requiredSkills.filter(skill => !selectedSkills.includes(skill));
  
  const score = requiredSkills.length > 0 
    ? Math.round((knownSkills.length / requiredSkills.length) * 100)
    : 0;

  const nextSkill = missingSkills.length > 0 ? missingSkills[0] : null;

  return {
    readinessScore: Math.min(100, Math.max(0, score)),
    knownSkills,
    missingSkills,
    nextSkill
  };
}
