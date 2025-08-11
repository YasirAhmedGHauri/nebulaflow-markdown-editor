const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { marked } = require('marked');
const jsPDF = require('jspdf');
const htmlPdf = require('html-pdf-node');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure marked for basic rendering
marked.setOptions({
  breaks: true,
  gfm: true
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Yasir\'s AI-Powered Markdown to HTML Converter API',
    version: '1.0.0',
    endpoints: {
      convert: 'POST /api/convert',
      exportHtml: 'POST /api/export/html',
      exportPdf: 'POST /api/export/pdf'
    }
  });
});

// Convert Markdown to HTML
app.post('/api/convert', (req, res) => {
  try {
    const { markdown } = req.body;
    
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content is required' });
    }

    // Convert markdown to HTML
    const html = marked(markdown);
    
    // Add syntax highlighting CSS
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Converted Markdown</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          h1 { font-size: 2.5em; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
          h2 { font-size: 2em; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px; }
          h3 { font-size: 1.5em; }
          p { margin-bottom: 1em; }
          code {
            background-color: #f8f9fa;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #e74c3c;
          }
          pre {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 1em 0;
          }
          pre code {
            background: none;
            color: inherit;
            padding: 0;
          }
          blockquote {
            border-left: 4px solid #3498db;
            margin: 1em 0;
            padding-left: 20px;
            color: #7f8c8d;
            font-style: italic;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background-color: #3498db;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          ul, ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          li {
            margin-bottom: 0.5em;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 1em 0;
          }
          hr {
            border: none;
            border-top: 2px solid #ecf0f1;
            margin: 2em 0;
          }
        </style>
      </head>
      <body>
        <div class="content">
          ${html}
        </div>
      </body>
      </html>
    `;

    res.json({ 
      success: true, 
      html: fullHtml,
      plainHtml: html 
    });
    
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert markdown to HTML' });
  }
});

// Export as HTML file
app.post('/api/export/html', (req, res) => {
  try {
    const { markdown, filename = 'converted-markdown.html' } = req.body;
    
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content is required' });
    }

    const html = marked(markdown);
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${filename.replace('.html', '')}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          h1 { font-size: 2.5em; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
          h2 { font-size: 2em; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px; }
          h3 { font-size: 1.5em; }
          p { margin-bottom: 1em; }
          code {
            background-color: #f8f9fa;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #e74c3c;
          }
          pre {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 1em 0;
          }
          pre code {
            background: none;
            color: inherit;
            padding: 0;
          }
          blockquote {
            border-left: 4px solid #3498db;
            margin: 1em 0;
            padding-left: 20px;
            color: #7f8c8d;
            font-style: italic;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background-color: #3498db;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          ul, ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          li {
            margin-bottom: 0.5em;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 1em 0;
          }
          hr {
            border: none;
            border-top: 2px solid #ecf0f1;
            margin: 2em 0;
          }
        </style>
      </head>
      <body>
        <div class="content">
          ${html}
        </div>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(fullHtml);
    
  } catch (error) {
    console.error('HTML export error:', error);
    res.status(500).json({ error: 'Failed to export HTML file' });
  }
});

// Export as PDF file
app.post('/api/export/pdf', async (req, res) => {
  try {
    const { markdown, filename = 'converted-markdown.pdf' } = req.body;
    
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content is required' });
    }

    const html = marked(markdown);
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${filename.replace('.pdf', '')}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: white;
          }
          h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          h1 { font-size: 2.5em; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
          h2 { font-size: 2em; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px; }
          h3 { font-size: 1.5em; }
          p { margin-bottom: 1em; }
          code {
            background-color: #f8f9fa;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #e74c3c;
          }
          pre {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 1em 0;
          }
          pre code {
            background: none;
            color: inherit;
            padding: 0;
          }
          blockquote {
            border-left: 4px solid #3498db;
            margin: 1em 0;
            padding-left: 20px;
            color: #7f8c8d;
            font-style: italic;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background-color: #3498db;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          ul, ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          li {
            margin-bottom: 0.5em;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 1em 0;
          }
          hr {
            border: none;
            border-top: 2px solid #ecf0f1;
            margin: 2em 0;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    const options = {
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    };

    const file = { content: fullHtml };
    const pdfBuffer = await htmlPdf.generatePdf(file, options);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ error: 'Failed to export PDF file' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'NebulaFlow Cosmic API'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🌟 NebulaFlow Cosmic Server running on port ${PORT}`);
  console.log(`✨ The Cosmic Markdown Experience API ready`);
  console.log(`🌌 Health check: http://localhost:${PORT}/api/health`);
});
