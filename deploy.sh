#!/bin/bash

echo "🚀 Deploying NebulaFlow Markdown Editor..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install all dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the client
echo "🔨 Building client for production..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "🌐 Deployment Options:"
echo ""
echo "1. Vercel (Frontend) - Recommended:"
echo "   - Install Vercel CLI: npm i -g vercel"
echo "   - Run: vercel"
echo "   - Follow the prompts"
echo ""
echo "2. Render (Backend):"
echo "   - Go to https://render.com"
echo "   - Connect your GitHub repository"
echo "   - Create a new Web Service"
echo "   - Set build command: npm install"
echo "   - Set start command: npm start"
echo "   - Deploy"
echo ""
echo "3. Netlify (Frontend Alternative):"
echo "   - Go to https://netlify.com"
echo "   - Drag and drop the client/build folder"
echo "   - Or connect your GitHub repository"
echo ""
echo "📝 After deployment:"
echo "   - Update the REACT_APP_API_URL in your frontend environment"
echo "   - Configure CORS in your backend to allow your frontend domain"
echo ""
echo "�� Happy deploying!"
