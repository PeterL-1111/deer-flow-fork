#!/bin/bash

# Simple bootstrap script that doesn't rely on uv
echo "🦌 Unghost Agent - Simple Bootstrap"
echo "=================================="

# Check if Python is available
echo "Checking Python installation..."
if ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.8+ first."
    exit 1
fi

PYTHON_VERSION=$(python --version 2>&1 | awk '{print $2}')
echo "✅ Python ${PYTHON_VERSION} found"

# Install minimal dependencies
echo "Installing minimal dependencies..."
python -m pip install -r requirements-minimal.txt

# Start the backend server
echo "Starting backend server..."
python server.py &
SERVER_PID=$!

# Start the frontend
echo "Starting frontend..."
cd front
npm install
npm run dev &
FRONTEND_PID=$!

# Handle termination
trap "kill $SERVER_PID $FRONTEND_PID; exit" INT TERM
wait