import React, { useEffect, useRef } from 'react';
import { Eye, Code, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Preview = ({ html, isLoading }) => {
  const previewRef = useRef(null);
  const [showHtml, setShowHtml] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Apply syntax highlighting to code blocks in the preview
  useEffect(() => {
    if (previewRef.current && html) {
      const codeBlocks = previewRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        if (window.Prism) {
          window.Prism.highlightElement(block);
        }
      });
    }
  }, [html]);

  // Copy HTML to clipboard
  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  };

  // Format HTML for display
  const formatHtml = (htmlString) => {
    return htmlString
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;');
  };

  return (
    <div className="card h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Toggle View Button */}
          <button
            onClick={() => setShowHtml(!showHtml)}
            className="btn-secondary flex items-center space-x-2 text-sm"
            title={showHtml ? "Show rendered preview" : "Show HTML source"}
          >
            {showHtml ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {showHtml ? 'Preview' : 'HTML'}
            </span>
          </button>

          {/* Copy Button */}
          {showHtml && (
            <button
              onClick={copyHtml}
              className="btn-secondary flex items-center space-x-2 text-sm"
              title="Copy HTML to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-10">
            <div className="spinner"></div>
          </div>
        )}

        <div className="h-full overflow-auto">
          {showHtml ? (
            // HTML Source View
            <div className="p-4">
              <SyntaxHighlighter
                language="html"
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {formatHtml(html)}
              </SyntaxHighlighter>
            </div>
          ) : (
            // Rendered Preview
            <div className="p-4">
              {html ? (
                <div
                  ref={previewRef}
                  className="preview-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Preview will appear here</p>
                    <p className="text-sm">Start typing in the editor to see the live preview</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preview Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>HTML Length: {html.length}</span>
            <span>View: {showHtml ? 'Source' : 'Rendered'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>HTML</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
