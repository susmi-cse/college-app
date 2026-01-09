@echo off
echo Starting College Super App (Advanced Version)...

:: Start Backend (if not already running, but this script assumes new instance)
start "College Backend" cmd /k "cd server && npm start"

:: Start Next.js Frontend
start "College Frontend (Next.js)" cmd /k "cd client-next && npm run dev"

echo App starting on http://localhost:3000