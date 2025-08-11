# 🚀 How to Run NebulaFlow Markdown Editor

## ✅ **Current Status**
- **GitHub Repository**: ✅ Up to date
- **Local Development**: ✅ Running
- **Frontend**: ✅ http://localhost:3001
- **Backend**: ✅ http://localhost:5001

## 🌐 **Access Your Application**

### **Local Development (Currently Running)**
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5001

### **Online Deployments**
- **Vercel**: https://nebulaflow-markdown-editor-qgfj0jhrm-yasirahmedghauris-projects.vercel.app
- **GitHub Pages**: https://yasirahmedghauri.github.io/nebulaflow-markdown-editor (after enabling)

## 📋 **How to Run**

### **Option 1: Run Everything Locally (Recommended)**
```bash
# Start both frontend and backend
./run-local.sh

# Or use npm
npm run dev
```

### **Option 2: Run in Production Mode**
```bash
# Build and serve in production mode
./run-production.sh
```

### **Option 3: Run Individual Services**
```bash
# Backend only
cd server && npm start

# Frontend only
cd client && npm start
```

### **Option 4: Test Backend Only**
```bash
# Test backend API
./test-backend.sh
```

## 🔧 **Quick Commands**

### **Start Services**
```bash
# Development mode (frontend + backend)
./run-local.sh

# Production mode
./run-production.sh

# Backend only
cd server && npm start

# Frontend only
cd client && npm start
```

### **Stop Services**
```bash
# Stop all Node.js processes
pkill -f "node index.js"
pkill -f "react-scripts start"

# Or use Ctrl+C in the terminal where services are running
```

### **Build for Production**
```bash
# Build frontend
npm run build

# Install all dependencies
npm run install-all
```

## 📝 **API Endpoints**

### **Backend API (http://localhost:5001)**
- `GET /` - API information
- `POST /api/convert` - Convert markdown to HTML
- `POST /api/export/html` - Export as HTML file
- `POST /api/export/pdf` - Export as PDF file

### **Test API**
```bash
# Test API info
curl http://localhost:5001

# Test markdown conversion
curl -X POST http://localhost:5001/api/convert \
  -H "Content-Type: application/json" \
  -d '{"markdown": "# Hello World"}'
```

## 🎯 **Features Available**

### **Frontend Features**
- ✅ Real-time markdown preview
- ✅ Syntax highlighting
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Export functionality
- ✅ Auto-save
- ✅ Templates

### **Backend Features**
- ✅ Markdown to HTML conversion
- ✅ HTML file export
- ✅ PDF file export
- ✅ CORS enabled
- ✅ Security headers
- ✅ Compression

## 🌐 **Deployment Options**

### **Frontend Deployments**
1. **Vercel**: Already deployed
2. **GitHub Pages**: Configured, needs enabling
3. **Netlify**: Can be deployed

### **Backend Deployments**
1. **Render**: Free tier available
2. **Railway**: Free tier available
3. **Heroku**: Free tier available
4. **Local**: Currently running

## 🔗 **Repository Links**

- **GitHub**: https://github.com/YasirAhmedGHauri/nebulaflow-markdown-editor
- **Vercel**: https://vercel.com/yasirahmedghauris-projects/nebulaflow-markdown-editor
- **GitHub Pages**: https://yasirahmedghauri.github.io/nebulaflow-markdown-editor

## 🚨 **Troubleshooting**

### **Port Already in Use**
```bash
# Kill processes using ports
lsof -ti:3001 | xargs kill -9
lsof -ti:5001 | xargs kill -9
```

### **Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### **Build Issues**
```bash
# Build with no warnings
GENERATE_SOURCEMAP=false DISABLE_ESLINT_PLUGIN=true npm run build
```

## 🎉 **Success!**

Your NebulaFlow Markdown Editor is now running locally with full functionality!

**Open your browser and go to: http://localhost:3001**

Enjoy your cosmic markdown experience! 🌟
