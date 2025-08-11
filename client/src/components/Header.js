import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Download, 
  Trash2, 
  FileText, 
  Zap,
  Github
} from 'lucide-react';

const Header = ({ onExport, onClear, onLoadSample }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Yasir's AI-Powered
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Markdown to HTML Converter
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Load Sample Button */}
            <button
              onClick={onLoadSample}
              className="btn-secondary flex items-center space-x-2 text-sm"
              title="Load sample markdown"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Sample</span>
            </button>

            {/* Clear Button */}
            <button
              onClick={onClear}
              className="btn-secondary flex items-center space-x-2 text-sm"
              title="Clear editor"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            {/* Export Button */}
            <button
              onClick={onExport}
              className="btn-primary flex items-center space-x-2 text-sm"
              title="Export as HTML or PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title="View on GitHub"
            >
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
          </div>
        </div>

        {/* Mobile Menu for smaller screens */}
        <div className="mt-4 sm:hidden">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={onLoadSample}
              className="btn-secondary text-xs px-3 py-1"
            >
              Sample
            </button>
            <button
              onClick={onClear}
              className="btn-secondary text-xs px-3 py-1"
            >
              Clear
            </button>
            <button
              onClick={onExport}
              className="btn-primary text-xs px-3 py-1"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
