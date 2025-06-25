# Unghost Agent - Simplified Setup

This is a simplified setup guide for Unghost Agent that works with standard Python environments without requiring specialized tools like `uv`.

## Prerequisites

- Python 3.8+ (standard installation)
- Node.js 16+ (for the frontend)
- npm or pnpm (for package management)

## Quick Start

### Option 1: Using the bootstrap script

Run the bootstrap script to automatically set up and start both backend and frontend:

```bash
# On Linux/macOS
chmod +x bootstrap-simple.sh
./bootstrap-simple.sh

# On Windows
bootstrap-simple.bat
```

### Option 2: Manual setup

1. Install Python dependencies:
   ```bash
   python -m pip install -r requirements-minimal.txt
   ```

2. Start the backend server:
   ```bash
   python server.py
   ```

3. In a separate terminal, start the frontend:
   ```bash
   cd front
   npm install  # or pnpm install
   npm run dev  # or pnpm run dev
   ```

## Configuration

Create a `.env` file in the project root with your API keys:

```
# Required for basic functionality
OPENAI_API_KEY=your_openai_key_here
TAVILY_API_KEY=your_tavily_key_here

# Optional for additional features
VOLCENGINE_TTS_APPID=your_appid_here
VOLCENGINE_TTS_ACCESS_TOKEN=your_token_here
```

## Troubleshooting

If you encounter any issues:

1. Make sure Python and Node.js are properly installed and in your PATH
2. Check that you have the correct API keys in your `.env` file
3. Look for error messages in the terminal output
4. Try installing dependencies manually with `python -m pip install -r requirements.txt`

## Limitations

This simplified setup provides basic functionality but may not include all features of the full Unghost Agent. For advanced features, consider setting up the complete environment as described in the main README.md.