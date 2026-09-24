@echo off
echo Starting TravelGuide Backend Server...
cd /d "%~dp0"
"..\python\python.exe" server.py
pause
