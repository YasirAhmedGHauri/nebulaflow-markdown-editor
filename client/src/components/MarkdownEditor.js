import React, { useRef, useEffect } from 'react';
import { Edit3, FileText } from 'lucide-react';

const MarkdownEditor = ({ markdown, setMarkdown, isLoading }) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [markdown]);

  // Handle textarea changes
  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Tab key handling
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = markdown.substring(0, start) + '  ' + markdown.substring(end);
      setMarkdown(newValue);
      
      // Set cursor position after tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Insert markdown syntax
  const insertSyntax = (syntax) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    let newText = '';
    let newCursorPos = start;

    switch (syntax) {
      case 'bold':
        newText = markdown.substring(0, start) + `**${selectedText}**` + markdown.substring(end);
        newCursorPos = start + 2 + selectedText.length;
        break;
      case 'italic':
        newText = markdown.substring(0, start) + `*${selectedText}*` + markdown.substring(end);
        newCursorPos = start + 1 + selectedText.length;
        break;
      case 'code':
        newText = markdown.substring(0, start) + `\`${selectedText}\`` + markdown.substring(end);
        newCursorPos = start + 1 + selectedText.length;
        break;
      case 'link':
        newText = markdown.substring(0, start) + `[${selectedText}](url)` + markdown.substring(end);
        newCursorPos = start + selectedText.length + 3;
        break;
      case 'image':
        newText = markdown.substring(0, start) + `![${selectedText}](url)` + markdown.substring(end);
        newCursorPos = start + selectedText.length + 4;
        break;
      case 'heading':
        newText = markdown.substring(0, start) + `# ${selectedText}` + markdown.substring(end);
        newCursorPos = start + 2 + selectedText.length;
        break;
      case 'list':
        newText = markdown.substring(0, start) + `- ${selectedText}` + markdown.substring(end);
        newCursorPos = start + 2 + selectedText.length;
        break;
      case 'codeblock':
        newText = markdown.substring(0, start) + `\`\`\`\n${selectedText}\n\`\`\`` + markdown.substring(end);
        newCursorPos = start + 4 + selectedText.length;
        break;
      default:
        return;
    }

    setMarkdown(newText);
    
    // Set cursor position
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="card h-full flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Edit3 className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Markdown Editor
          </h2>
        </div>
        
        {/* Quick Insert Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => insertSyntax('bold')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            onClick={() => insertSyntax('italic')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            onClick={() => insertSyntax('code')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Inline Code"
          >
            {'</>'}
          </button>
          <button
            onClick={() => insertSyntax('link')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Link"
          >
            🔗
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-10">
            <div className="spinner"></div>
          </div>
        )}
        
        <div className="h-full p-4">
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your markdown here...
            
# Headings
## Subheadings

**Bold text** and *italic text*

- Lists
- Are easy

\`\`\`javascript
// Code blocks
function hello() {
  console.log('Hello, World!');
}
\`\`\`

> Blockquotes work too!"
            className="editor-textarea w-full h-full resize-none outline-none bg-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Editor Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Characters: {markdown.length}</span>
            <span>Words: {markdown.trim() ? markdown.trim().split(/\s+/).length : 0}</span>
            <span>Lines: {markdown.split('\n').length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Markdown</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
