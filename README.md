# 🏋️ FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion web app where users can browse a library of workouts, view detailed exercise instructions, build a daily workout plan, and save exercises for later — all with data that persists across page reloads.

## 🛠️ Technologies Used

- Next.js (App Router) — page routing and rendering
- React — UI components and state management
- TypeScript — type safety across components and data
- Tailwind CSS — styling and responsive layout
- Context API — global state for plan/saved workouts
- localStorage — persisting user's plan and saved list across reloads
- FitLog REST API — fetching workout data (https://api.abcz.workers.dev/api/fitlog)

## ✨ Key Features

1. Workout Library — Browse all 12 workouts in a responsive 3-column grid, each showing image, category tags, equipment, duration, calories, and rating.
2. Workout Detail Page — Dynamic route (/exercise/[id]) showing full workout info: equipment, difficulty, sets, reps, duration, calories, rating, and step-by-step instructions.
3. Today's Plan & Saved List — Add any workout to "Today's Plan" (capped at 5 lifts) or "Save for later," with live badge counters in the navbar.
4. My Plan Page — Tabbed view (Today's Plan / Saved) with a live-updating stats summary (exercises, minutes, calories), a Sort By dropdown (Duration / Calories / Rating), Mark as Done and Remove actions, and a friendly empty state.
5. Persistent Data + Toast Notifications — Plan and saved data are stored in localStorage so they survive page reloads, with toast notifications confirming every add/remove/done action.

## 📄 Pages

| Route              | Description                          |
|---------------------|---------------------------------------|
| /                  | Home page — Hero + Workout Library    |
| /exercise/[id]     | Workout detail page                   |
| /my-plan           | Today's Plan & Saved workouts         |
| * (unknown route)  | Custom 404 page                       |

## 🚀 Getting Started

bash
npm install
npm run dev