# 🚀 Quick Deployment Guide

## ✅ Current Status
- **Frontend**: ✅ Deployed to Vercel
- **Backend**: ⏳ Ready for deployment
- **GitHub**: ✅ Repository updated

## 🌐 Live URLs
- **Frontend**: https://nebulaflow-markdown-editor-qgfj0jhrm-yasirahmedghauris-projects.vercel.app
- **Backend**: Deploying to Render...

## 📋 Backend Deployment Steps

### Option 1: Render (Recommended)

1. **Go to Render**: https://render.com
2. **Sign up/Login** with your GitHub account
3. **Click "New Web Service"**
4. **Connect Repository**: `https://github.com/YasirAhmedGHauri/nebulaflow-markdown-editor.git`
5. **Configure Service**:
   - **Name**: `nebulaflow-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: `https://nebulaflow-markdown-editor-qgfj0jhrm-yasirahmedghauris-projects.vercel.app`
7. **Click "Create Web Service"**

### Option 2: Railway

1. **Go to Railway**: https://railway.app
2. **Connect GitHub repository**
3. **Create new service from `server` directory**
4. **Deploy**

### Option 3: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Create app
heroku create nebulaflow-backend

# Deploy
git push heroku main
```

## 🔧 After Backend Deployment

1. **Copy your backend URL** (e.g., `https://nebulaflow-backend.onrender.com`)

2. **Update Frontend API URL**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
   - Redeploy

3. **Test the full application**:
   - Frontend: https://nebulaflow-markdown-editor-qgfj0jhrm-yasirahmedghauris-projects.vercel.app
   - Try converting markdown to HTML
   - Test export functionality

## 🧪 Local Testing

```bash
# Test backend locally
./test-backend.sh

# Test frontend locally
cd client && npm start
```

## 📝 API Endpoints

- `GET /` - API information
- `POST /api/convert` - Convert markdown to HTML
- `POST /api/export/html` - Export as HTML file
- `POST /api/export/pdf` - Export as PDF file

## 🎉 Success!

Once deployed, your full NebulaFlow Markdown Editor will be live with:
- ✅ Real-time markdown preview
- ✅ Syntax highlighting
- ✅ HTML export
- ✅ PDF export
- ✅ Responsive design
- ✅ Dark/Light theme

## 🔗 Repository Links

- **GitHub**: https://github.com/YasirAhmedGHauri/nebulaflow-markdown-editor
- **Vercel**: https://vercel.com/yasirahmedghauris-projects/nebulaflow-markdown-editor
- **Render**: https://render.com (after deployment)
