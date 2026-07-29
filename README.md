<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=800&size=36&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=SkillGap+Analyzer+%F0%9F%9A%80;Know+Your+Gap.;Build+Your+Career." alt="SkillGap Typing SVG" />

<p align="center">
  <strong>A career readiness web app that identifies your skill gap and gives you a personalized, week-by-week learning roadmap to land your dream tech job.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" />
</p>

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔍 How It Works](#-how-it-works)
- [🤖 AI-Assisted Development](#-ai-assisted-development)
- [📸 App Preview](#-app-preview)
- [🙋 Author](#-author)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Skill Selection** | Browse, search, and filter 40+ industry skills by category |
| 📊 **Readiness Score** | Animated circular progress score showing your % match with the target role |
| 🗺️ **Learning Roadmap** | Auto-generated week-by-week plan, personalized by your weekly study hours |
| 🌙 **Dark / Light Mode** | Full dark mode with persistent preference via LocalStorage |
| 🎉 **Confetti Celebration** | Fires when your readiness score hits 90%+ |
| 💾 **State Persistence** | Profile, skills, and page state saved to `localStorage` — nothing is lost on refresh |
| 🔍 **Smart Filtering** | Search + category filter combined — find any skill instantly |
| 📱 **Responsive Design** | Fully responsive across mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | v19 | UI framework |
| [Vite](https://vitejs.dev) | v8 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility-first styling |
| [Lucide React](https://lucide.dev) | latest | Icon library |
| [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | latest | Celebration animation |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** `v18+` — [Download here](https://nodejs.org)
- **npm** `v9+` (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/arpita0630/SkillGap.git

# 2. Navigate into the project folder
cd skillgap

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser and go to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to Vercel, Netlify, or any static host.

---

## 📁 Project Structure

```
SkillGap/
├── index.html                  # Entry HTML file
├── vite.config.js              # Vite configuration
├── package.json
│
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Page router + global state (profile, skills, dark mode)
    ├── App.css
    ├── index.css               # Global styles & Tailwind imports
    │
    ├── components/             # Reusable UI components
    │   ├── Navbar.jsx          # Top navigation bar + dark mode toggle
    │   ├── ScoreCircle.jsx     # Animated SVG circular readiness score
    │   ├── Timeline.jsx        # Week-by-week learning roadmap timeline
    │   └── ProgressCard.jsx    # Summary stats (known skills, missing, weeks)
    │
    ├── pages/                  # App views / screens
    │   ├── Landing.jsx         # Hero section + feature highlights
    │   ├── Profile.jsx         # Career profile form
    │   └── Analysis.jsx        # Main dashboard — skill selection, gap analysis, roadmap
    │
    ├── data/                   # Static data
    │   ├── skills.js           # 40+ skills with category, difficulty, weeks & topics
    │   └── roles.js            # Required skill sets per target role
    │
    └── utils/                  # Core business logic
        ├── calculateScore.js   # Computes readiness % from selected vs. required skills
        └── generateRoadmap.js  # Builds personalized week-by-week roadmap
```

---

## 🔍 How It Works

The app has 3 screens:

### 1. 🏠 Landing Page
Introduces the app with a hero section and feature cards. Users click **"Start Analysis"** to begin.

### 2. 👤 Profile Setup
The user fills in:
- **Full Name**
- **Target Company** (Google, Microsoft, Amazon, etc.)
- **Target Role** (Frontend Developer, AI Engineer, etc.)
- **Graduation Year**
- **Weekly Study Hours** (used to personalize the roadmap timeline)

### 3. 📊 Analysis Dashboard
The main feature. It has two sub-views:

**Skill Selection View:**
- A filterable, searchable grid of 40+ skills
- Skills are tagged with `Required` if they're needed for the chosen role
- User checks off the skills they already know

**Results Dashboard View (after clicking "Analyze Skill Gap"):**
- **Readiness Score** — animated circular % score
- **Recommended Next Skill** — the first missing required skill to focus on
- **Learning Roadmap** — a step-by-step timeline with week ranges, topics, and a capstone project — all dynamically adjusted for weekly study hours
- **Skill Gaps Panel** — chips showing known ✅ vs. missing ❌ required skills

---

## 🧮 Core Algorithms

### Readiness Score (`calculateScore.js`)

```js
// Compares selected skills against the role's required skill list
const knownSkills  = requiredSkills.filter(s => selectedSkills.includes(s));
const missingSkills = requiredSkills.filter(s => !selectedSkills.includes(s));
const score = Math.round((knownSkills.length / requiredSkills.length) * 100);
```

### Personalized Roadmap (`generateRoadmap.js`)

```js
// Adjusts skill weeks based on how many hours/week the user studies
const baseHours  = 10; // standard baseline
const multiplier = baseHours / weeklyStudyHours;
// A user studying 20hrs/week finishes each skill in half the estimated time
const adjustedWeeks = Math.max(1, Math.round(skill.weeks * multiplier));
```

---

## 🤖 AI-Assisted Development

This project was built **using AI as a development assistant**. Here's a summary:

### What AI helped with
- 🏗️ **Architecture design** — folder structure, routing strategy, state management approach
- ⚙️ **Logic scaffolding** — initial versions of `calculateScore.js` and `generateRoadmap.js`
- 🎨 **Component generation** — `ScoreCircle` SVG ring, `Timeline`, `ProgressCard`
- 📋 **Data population** — the `skills.js` and `roles.js` data files
- 🐛 **Debugging** — diagnosing the dark mode flicker, confetti race condition

### Manual improvements made after reviewing AI output

| # | Issue | Fix Applied |
|---|---|---|
| 1 | Dark mode flicker on reload | Changed to lazy `useState` initializer so localStorage is read synchronously |
| 2 | Roadmap ignored study hours | Added `multiplier = baseHours / studyHours` formula for dynamic timelines |
| 3 | Search bar had no effect | Combined search query + category filter with `&&` |
| 4 | Skills reset on navigation | Lifted `selectedSkills` state up to `App.jsx` |
| 5 | Confetti triggered on every re-render | Added `isAnalyzed` guard in `useEffect` dependency array |
| 6 | Blank UI on empty filter results | Added empty state messages for better UX |

---

## 📸 App Preview

| Page | Description |
|---|---|
| **Landing** | Hero with gradient title, feature cards, animated blob backgrounds |
| **Profile** | Clean form with dropdowns, study hours slider |
| **Skill Selection** | Filterable card grid with difficulty badges and required tags |
| **Dashboard** | Score ring, next skill card, timeline roadmap, skill gap chips |

---

## 🗂️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server at `localhost:5173` |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint for code quality checks |

---

## 🙋 Author

**Arpita Mishra**

- 🎓 B.Tech Student — Graduating 2028

---

<div align="center">

Built with ❤️ using React, Vite, and Tailwind CSS

⭐ **If you found this useful, give it a star!** ⭐

</div>
