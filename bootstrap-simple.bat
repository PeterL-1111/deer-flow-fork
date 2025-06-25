@echo off
SETLOCAL ENABLEEXTENSIONS

echo 🦌 Unghost Agent - Simple Bootstrap
echo ==================================

REM Check if Python is available
echo Checking Python installation...
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Python not found. Please install Python 3.8+ first.
    exit /b 1
)

FOR /F "tokens=2" %%i IN ('python --version 2^>^&1') DO SET PYTHON_VERSION=%%i
echo ✅ Python %PYTHON_VERSION% found

REM Install minimal dependencies
echo Installing minimal dependencies...
python -m pip install -r requirements-minimal.txt

REM Start the backend server
echo Starting backend server...
start python server.py

REM Start the frontend
echo Starting frontend...
cd front
call npm install
call npm run dev

ENDLOCAL