@echo off
echo Starting College App...

echo Launching Frontend...
start "College Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Launching Backend...
start "College Backend" cmd /k "cd /d %~dp0backend && npm start"

echo App started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
pause
