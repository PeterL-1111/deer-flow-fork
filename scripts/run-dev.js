const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Unghost Agent in development mode...');

// Try to use uv first, then fall back to python
const pythonCommands = ['uv', 'python3', 'python'];
let pythonCmd = null;

async function findWorkingPython() {
  for (const cmd of pythonCommands) {
    try {
      const result = await new Promise((resolve) => {
        const proc = spawn(cmd, ['--version'], { stdio: 'pipe' });
        proc.on('close', (code) => {
          resolve(code === 0);
        });
        proc.on('error', () => {
          resolve(false);
        });
      });
      
      if (result) {
        console.log(`Using ${cmd} as Python interpreter`);
        return cmd;
      }
    } catch (error) {
      continue;
    }
  }
  return null;
}

async function testPythonModules(pythonCmd) {
  const testScript = `
import sys
try:
    import select
    import asyncio
    import socket
    print("Core modules available")
    sys.exit(0)
except ImportError as e:
    print(f"Missing module: {e}")
    sys.exit(1)
`;

  return new Promise((resolve) => {
    const proc = spawn(pythonCmd, ['-c', testScript], { stdio: 'pipe' });
    let output = '';
    
    proc.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    proc.stderr.on('data', (data) => {
      output += data.toString();
    });
    
    proc.on('close', (code) => {
      console.log(output);
      resolve(code === 0);
    });
  });
}

async function main() {
  pythonCmd = await findWorkingPython();
  
  if (!pythonCmd) {
    console.error('No working Python interpreter found');
    process.exit(1);
  }

  // Test if core modules are available
  const modulesOk = await testPythonModules(pythonCmd);
  if (!modulesOk) {
    console.error('Python installation is missing core modules. This may be a WebContainer limitation.');
    console.error('Try using a different Python environment or check if this is a known WebContainer issue.');
    process.exit(1);
  }

  // Determine the correct command based on the Python interpreter
  let args;
  if (pythonCmd === 'uv') {
    args = ['run', 'main.py'];
    console.log('Using uv to run the application');
  } else {
    args = ['main.py'];
    console.log('This script will use the standard Python interpreter instead of uv');
  }

  // Start the Python process
  const pythonProcess = spawn(pythonCmd, args, {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    process.exit(code);
  });

  pythonProcess.on('error', (error) => {
    console.error('Failed to start Python process:', error);
    process.exit(1);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\nReceived SIGINT, terminating Python process...');
    pythonProcess.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    console.log('\nReceived SIGTERM, terminating Python process...');
    pythonProcess.kill('SIGTERM');
  });
}

main().catch((error) => {
  console.error('Error starting development server:', error);
  process.exit(1);
});