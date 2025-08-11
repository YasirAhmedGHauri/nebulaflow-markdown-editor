import React, { useState } from 'react';
import { X, Download, FileText, FileDown, Copy } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ExportModal = ({ markdown, html, onClose, setIsLoading }) => {
  const [filename, setFilename] = useState('converted-markdown');
  const [exportType, setExportType] = useState('html');


  const handleExport = async () => {
    if (!markdown.trim()) {
      toast.error('No content to export');
      return;
    }

    setIsLoading(true);
    
    try {
      if (exportType === 'html') {
        // Export as HTML
        const response = await axios.post('/api/export/html', {
          markdown,
          filename: `${filename}.html`
        }, {
          responseType: 'blob'
        });

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}.html`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success('HTML file exported successfully!');
      } else if (exportType === 'pdf') {
        // Export as PDF
        const response = await axios.post('/api/export/pdf', {
          markdown,
          filename: `${filename}.pdf`
        }, {
          responseType: 'blob'
        });

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success('PDF file exported successfully!');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export file. Please try again.');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      toast.success('HTML copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy HTML:', err);
      toast.error('Failed to copy HTML');
    }
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success('Markdown copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy Markdown:', err);
      toast.error('Failed to copy Markdown');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Export Options
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Filename Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="input-field"
              placeholder="Enter filename"
            />
          </div>

          {/* Export Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setExportType('html')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportType === 'html'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <FileText className={`w-8 h-8 ${
                    exportType === 'html' ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    exportType === 'html' ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    HTML File
                  </span>
                </div>
              </button>

              <button
                onClick={() => setExportType('pdf')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportType === 'pdf'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <FileDown className={`w-8 h-8 ${
                    exportType === 'pdf' ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    exportType === 'pdf' ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    PDF File
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Actions
            </label>
            <div className="space-y-2">
              <button
                onClick={copyHtml}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy HTML to Clipboard</span>
              </button>
              
              <button
                onClick={copyMarkdown}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Markdown to Clipboard</span>
              </button>
            </div>
          </div>

          {/* File Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Markdown: {markdown.length} characters</div>
              <div>HTML: {html.length} characters</div>
              <div>Words: {markdown.trim() ? markdown.trim().split(/\s+/).length : 0}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export {exportType.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
