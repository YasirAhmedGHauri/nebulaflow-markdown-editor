#!/bin/bash

echo "🧪 Testing NebulaFlow Backend Locally..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

# Start the server
echo "🚀 Starting backend server..."
echo "Backend will be available at: http://localhost:5001"
echo "API endpoints:"
echo "  • GET  / - API info"
echo "  • POST /api/convert - Convert markdown to HTML"
echo "  • POST /api/export/html - Export as HTML"
echo "  • POST /api/export/pdf - Export as PDF"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
