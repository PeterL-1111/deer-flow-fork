const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Unghost Agent in development mode...');
console.log('This script will use the standard Python interpreter instead of uv');

// Run the Python script with the interactive flag
const pythonProcess = spawn('python', ['main.py', '--interactive'], {
  stdio: 'inherit',
  shell: true
});

pythonProcess.on('error', (error) => {
  console.error(`Error starting Python process: ${error.message}`);
  process.exit(1);
});

pythonProcess.on('close', (code) => {
  console.log(`Python process exited with code ${code}`);
  process.exit(code);
});