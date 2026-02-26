# MentorConnect — Frontend (Vite + React)

This is a minimal frontend for an online mentorship platform built with Vite and React.

Quick start

1. Install dependencies:

```powershell
npm install
```

2. Run the dev server:

```powershell
npm run dev
```

3. Open the URL shown by Vite (usually http://localhost:5173).

What is included

- `index.html` — root HTML
- `src/main.jsx` — React entry
- `src/App.jsx` — main app wiring and sample mentors
- `src/components/*` — Mentor list, profile, scheduling, progress tracker
- `src/styles.css` — simple styles

Notes

- Data (appointments, progress) is stored locally in `localStorage` for demo purposes.
- This is intended as a frontend scaffold you can extend by connecting to a backend API for authentication, persistent storage, notifications, and real scheduling.
