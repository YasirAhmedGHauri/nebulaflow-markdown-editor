#!/bin/bash

echo "🚀 Deploying NebulaFlow to GitHub Pages..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the React app
echo "🔨 Building React app for production..."
npm run build

# Check if build was successful
if [ ! -d "client/build" ]; then
    echo "❌ Build failed. Please check the build output."
    exit 1
fi

echo "✅ Build completed successfully!"

# Install gh-pages if not installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not available. Please install npm."
    exit 1
fi

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npx gh-pages -d client/build

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "🌐 Your app will be available at:"
echo "   https://yasirahmedghauri.github.io/nebulaflow-markdown-editor"
echo ""
echo "📝 Note: It may take a few minutes for the changes to appear."
echo ""
echo "🔧 If you need to enable GitHub Pages manually:"
echo "   1. Go to: https://github.com/YasirAhmedGHauri/nebulaflow-markdown-editor/settings/pages"
echo "   2. Source: Deploy from a branch"
echo "   3. Branch: gh-pages"
echo "   4. Folder: / (root)"
echo "   5. Click 'Save'"
