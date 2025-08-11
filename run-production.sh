#!/bin/bash

echo "🚀 Starting NebulaFlow Markdown Editor in Production Mode..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Kill any existing processes
echo "🔄 Stopping any existing processes..."
pkill -f "node index.js" 2>/dev/null || true
pkill -f "serve" 2>/dev/null || true

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the frontend
echo "🔨 Building frontend for production..."
npm run build

# Install serve globally if not installed
if ! command -v serve &> /dev/null; then
    echo "📦 Installing serve globally..."
    npm install -g serve
fi

# Start backend in background
echo "🚀 Starting backend server..."
cd server && npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🌐 Starting frontend server..."
cd ../client && serve -s build -l 3001 &
FRONTEND_PID=$!

echo ""
echo "🎉 NebulaFlow is running in production mode!"
echo ""
echo "🌐 Your application is available at:"
echo "   Frontend: http://localhost:3001"
echo "   Backend:  http://localhost:5001"
echo ""
echo "📝 API Endpoints:"
echo "   • GET  http://localhost:5001 - API info"
echo "   • POST http://localhost:5001/api/convert - Convert markdown to HTML"
echo "   • POST http://localhost:5001/api/export/html - Export as HTML"
echo "   • POST http://localhost:5001/api/export/pdf - Export as PDF"
echo ""
echo "🛑 Press Ctrl+C to stop all services"
echo ""

# Wait for user to stop
wait
