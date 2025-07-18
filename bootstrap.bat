@echo off
SETLOCAL ENABLEEXTENSIONS

REM Check if argument is dev mode
SET MODE=%1
IF "%MODE%"=="--dev" GOTO DEV
IF "%MODE%"=="-d" GOTO DEV
IF "%MODE%"=="dev" GOTO DEV
IF "%MODE%"=="development" GOTO DEV

:PROD
echo Starting Unghost Agent in [PRODUCTION] mode...
start uv run server.py
cd front
start pnpm start
REM Wait for user to close
GOTO END

:DEV
echo Starting Unghost Agent in [DEVELOPMENT] mode...
start uv run server.py --reload
cd front
start pnpm dev
REM Wait for user to close
pause

:END
ENDLOCAL