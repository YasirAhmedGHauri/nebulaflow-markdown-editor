#!/bin/bash

echo "🚀 Starting NebulaFlow Markdown Editor Locally..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Kill any existing processes on the ports
echo "🔄 Stopping any existing processes..."
pkill -f "node index.js" 2>/dev/null || true
pkill -f "react-scripts start" 2>/dev/null || true

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm run install-all

# Start both frontend and backend
echo "🌟 Starting NebulaFlow..."
echo ""
echo "🌐 Your application will be available at:"
echo "   Frontend: http://localhost:3001"
echo "   Backend:  http://localhost:5001"
echo ""
echo "📝 API Endpoints:"
echo "   • GET  http://localhost:5001 - API info"
echo "   • POST http://localhost:5001/api/convert - Convert markdown to HTML"
echo "   • POST http://localhost:5001/api/export/html - Export as HTML"
echo "   • POST http://localhost:5001/api/export/pdf - Export as PDF"
echo ""
echo "🎉 Press Ctrl+C to stop all services"
echo ""

# Start the development environment
npm run dev
