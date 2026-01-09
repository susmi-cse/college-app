@echo off
echo Starting College App...

echo Launching Server...
start "College App Server" cmd /k "cd /d %~dp0server && npm start"

echo Launching Client...
start "College App Client" cmd /k "cd /d %~dp0client-next && npm run dev"

echo App started! Please wait for both windows to initialize.
echo Client: http://localhost:3000
echo Server: http://localhost:5000
pause
