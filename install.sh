#!/bin/bash

echo "🚀 Installing Yasir's AI-Powered Markdown to HTML Converter..."

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

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ All dependencies installed successfully!"
echo ""
echo "🎉 Installation complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To start only the server:"
echo "  npm run server"
echo ""
echo "To start only the client:"
echo "  npm run client"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "🌐 The application will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo "📝 Happy coding!"
