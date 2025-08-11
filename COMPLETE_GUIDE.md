# 🌟 NebulaFlow Markdown Editor - Complete Guide

## 🚀 Quick Start

### Option 1: Run Locally (Recommended for Development)

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/YasirAhmedGHauri/nebulaflow-markdown-editor.git
cd nebulaflow-markdown-editor

# Run the application locally
./run-local.sh
```

**Your app will be available at:**
- Frontend: http://localhost:3001
- Backend: http://localhost:5001

### Option 2: Access Online (GitHub Pages)

**Your app is now live at:**
🌐 **https://yasirahmedghauri.github.io/nebulaflow-markdown-editor**

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Available Scripts

### Local Development
```bash
# Start both frontend and backend in development mode
./run-local.sh

# Start only the backend server
cd server && npm start

# Start only the frontend
cd client && npm start
```

### Production
```bash
# Run in production mode locally
./run-production.sh

# Test backend only
./test-backend.sh
```

### Deployment
```bash
# Deploy to GitHub Pages
./deploy-gh-pages-simple.sh

# Deploy backend to Render (manual steps)
./deploy-backend.sh
```

## 🌐 Online Access

### GitHub Pages (Frontend)
- **URL**: https://yasirahmedghauri.github.io/nebulaflow-markdown-editor
- **Status**: ✅ **LIVE** - Your React app is deployed and running
- **Features**: Full markdown editor with live preview, syntax highlighting, and export options

### Backend API (For Full Functionality)
To get the full functionality (export to PDF, advanced features), you'll need to deploy the backend:

1. **Option A: Deploy to Render (Free)**
   ```bash
   ./deploy-backend.sh
   ```
   Follow the instructions in the script to deploy to Render.

2. **Option B: Run Backend Locally**
   ```bash
   cd server && npm install && npm start
   ```
   Then update the frontend to use `http://localhost:5001` as the API URL.

## 🔧 Troubleshooting

### Port Already in Use
If you get "address already in use" errors:
```bash
# Kill existing processes
pkill -f "node index.js"
pkill -f "react-scripts"

# Then try running again
./run-local.sh
```

### Build Issues
If the build fails:
```bash
# Clean and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
npm run build
```

### GitHub Pages Not Loading
If GitHub Pages shows the README instead of your app:
1. Go to: https://github.com/YasirAhmedGHauri/nebulaflow-markdown-editor/settings/pages
2. Set Source to "Deploy from a branch"
3. Select "gh-pages" branch
4. Set folder to "/ (root)"
5. Click "Save"

## 📁 Project Structure

```
nebulaflow-markdown-editor/
├── client/                 # React frontend
│   ├── src/               # Source code
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── index.js           # Server code
│   └── package.json       # Backend dependencies
├── run-local.sh           # Start development servers
├── run-production.sh      # Start production mode
├── deploy-gh-pages-simple.sh # Deploy to GitHub Pages
└── README.md              # Project documentation
```

## 🎯 Features

### ✅ Available Now
- **Live Markdown Preview** - Real-time rendering
- **Syntax Highlighting** - Code blocks with Prism.js
- **Export to HTML** - Download as HTML files
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Toggle between themes
- **Auto-save** - Never lose your work
- **Keyboard Shortcuts** - Professional editing experience

### 🔄 Coming Soon
- **Export to PDF** - Requires backend deployment
- **File Upload/Download** - Import/export markdown files
- **Collaboration Features** - Real-time editing
- **Advanced Templates** - Pre-built document templates

## 🌟 How to Use

1. **Open the Editor**: Navigate to the application URL
2. **Start Writing**: Use the left panel to write markdown
3. **See Live Preview**: The right panel shows the rendered output
4. **Export**: Use the export button to download as HTML
5. **Customize**: Toggle themes, adjust settings in the sidebar

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Try running the application locally first
4. Check the browser console for any errors

## 🎉 Success!

Your NebulaFlow Markdown Editor is now:
- ✅ **Deployed to GitHub Pages**
- ✅ **Running locally**
- ✅ **Ready for use**

**Enjoy your cosmic markdown editing experience!** ✨
