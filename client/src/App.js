import React, { useState, useEffect, useRef, useCallback } from 'react';
import { marked } from 'marked';
import { 
  Sparkles, 
  Code, 
  Eye, 
  Download, 
  Sun, 
  Moon, 
  Save,
  Upload,
  Settings,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Maximize2,
  Minimize2,
  Search,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Sidebar
} from 'lucide-react';

function App() {
  // Core State
  const [markdown, setMarkdown] = useState(`# 🌟 Welcome to NebulaFlow - The Cosmic Markdown Experience

## ✨ Stellar Features

- **Real-time Preview** - Watch your content come alive instantly
- **Syntax Highlighting** - Beautiful code blocks that shine like stars
- **Export Options** - Transform your content into any format
- **Responsive Design** - Works seamlessly across all galaxies
- **Dark/Light Themes** - Choose your cosmic preference
- **Advanced Animations** - Smooth transitions like cosmic waves

## 💻 Code Example

\`\`\`javascript
function cosmicGreeting(name) {
  return \`Hello, \${name}! Welcome to the NebulaFlow universe.\`;
}

console.log(cosmicGreeting('Cosmic Developer'));
\`\`\`

## 🎨 NebulaFlow Features

### Core Capabilities
- Live preview with instant updates
- Multiple export formats
- Custom themes and styling
- Keyboard shortcuts
- Auto-save functionality

### Advanced Powers
- AI-powered suggestions
- Collaborative editing
- Version history
- Custom plugins
- Performance optimization

---

*Begin your cosmic journey with NebulaFlow - Where creativity meets the stars!*`);

  const [html, setHtml] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  
  // Advanced State Management
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Editor State
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('monospace');
  const [lineHeight, setLineHeight] = useState(1.6);
  const [wordWrap, setWordWrap] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(2);
  const [insertSpaces, setInsertSpaces] = useState(true);
  
  // History and Version Control
  const [history, setHistory] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  // Analytics and Performance
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Templates and Snippets
  const [templates, setTemplates] = useState([
    { 
      name: 'Blog Post', 
      content: `# Blog Post Title

## Introduction
Write a compelling introduction that hooks your readers and explains what they'll learn from this post.

## Main Content

### Section 1: Key Point
Explain your first main point with supporting details and examples.

### Section 2: Key Point
Continue with your second main point, providing valuable insights.

### Section 3: Key Point
Conclude your main content with your final key point.

## Conclusion
Summarize the main takeaways and encourage readers to take action or continue learning.

---
*Published on [Date] | Tags: [tag1, tag2, tag3]*` 
    },
    { 
      name: 'Documentation', 
      content: `# Project Documentation

## Overview
Brief description of what this project does and its main features.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run the application

## Usage

### Basic Usage
\`\`\`javascript
// Example code
const example = require('your-package');
example.doSomething();
\`\`\`

### Advanced Usage
Explain more complex use cases and configurations.

## API Reference

### Function Name
**Description:** What this function does

**Parameters:**
- \`param1\` (type): Description
- \`param2\` (type): Description

**Returns:** (type) Description

**Example:**
\`\`\`javascript
// Example usage
\`\`\`

## Contributing
Guidelines for contributing to the project.

## License
Information about the project license.` 
    },
    { 
      name: 'Meeting Notes', 
      content: `# Meeting Notes - [Meeting Title]

**Date:** [Date]  
**Time:** [Start Time] - [End Time]  
**Location:** [Location/Virtual Meeting Link]  
**Facilitator:** [Name]  
**Note Taker:** [Name]

## Attendees
- [Name] - [Role]
- [Name] - [Role]
- [Name] - [Role]

## Agenda
1. [Agenda Item 1]
2. [Agenda Item 2]
3. [Agenda Item 3]

## Discussion Points

### [Topic 1]
- **Key Points:**
  - Point 1
  - Point 2
- **Decisions Made:**
  - Decision 1
- **Questions Raised:**
  - Question 1

### [Topic 2]
- **Key Points:**
  - Point 1
  - Point 2
- **Decisions Made:**
  - Decision 1

## Action Items
| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| [Action 1] | [Name] | [Date] | [ ] |
| [Action 2] | [Name] | [Date] | [ ] |

## Next Steps
- [ ] Follow up on action items
- [ ] Schedule next meeting
- [ ] Send meeting summary to team

---
*Next Meeting: [Date] at [Time]*` 
    },
    { 
      name: 'Project Plan', 
      content: `# Project Plan - [Project Name]

## Project Overview
**Project Name:** [Name]  
**Start Date:** [Date]  
**End Date:** [Date]  
**Project Manager:** [Name]  
**Stakeholders:** [List of stakeholders]

## Goals and Objectives
### Primary Goals
- [Goal 1]
- [Goal 2]
- [Goal 3]

### Success Criteria
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

## Timeline

### Phase 1: Planning (Week 1-2)
- [ ] Define project scope
- [ ] Create detailed requirements
- [ ] Set up project infrastructure

### Phase 2: Development (Week 3-8)
- [ ] Core feature development
- [ ] Testing and quality assurance
- [ ] Documentation

### Phase 3: Deployment (Week 9-10)
- [ ] Final testing
- [ ] Production deployment
- [ ] Training and handover

## Resources

### Team Members
| Role | Name | Responsibilities |
|------|------|------------------|
| Project Manager | [Name] | Overall project coordination |
| Developer | [Name] | Technical implementation |
| Designer | [Name] | UI/UX design |

### Budget
- **Total Budget:** [Amount]
- **Development:** [Amount]
- **Infrastructure:** [Amount]
- **Contingency:** [Amount]

## Risks and Mitigation

### High Priority Risks
| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|-------------------|
| [Risk 1] | High | High | [Strategy] |
| [Risk 2] | Medium | High | [Strategy] |

## Communication Plan
- **Weekly Status Reports:** [Day] at [Time]
- **Stakeholder Updates:** [Frequency]
- **Team Meetings:** [Schedule]

---
*Last Updated: [Date] | Version: [Version Number]*` 
    },
    { 
      name: 'Technical Specification', 
      content: `# Technical Specification - [Feature/Component Name]

## Overview
Detailed technical specification for [Feature/Component Name].

## Requirements

### Functional Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Non-Functional Requirements
- **Performance:** [Requirements]
- **Security:** [Requirements]
- **Scalability:** [Requirements]
- **Usability:** [Requirements]

## Architecture

### System Design
\`\`\`mermaid
graph TD
    A[Client] --> B[API Gateway]
    B --> C[Service 1]
    B --> D[Service 2]
    C --> E[Database]
    D --> E
\`\`\`

### Data Models
\`\`\`javascript
// Example data model
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

## API Design

### Endpoints
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | /api/users | Get all users | - | User[] |
| POST | /api/users | Create user | User | User |
| PUT | /api/users/:id | Update user | User | User |
| DELETE | /api/users/:id | Delete user | - | Success |

### Request/Response Examples
\`\`\`json
// POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com"
}

// Response
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
\`\`\`

## Implementation Details

### Technology Stack
- **Frontend:** [Technology]
- **Backend:** [Technology]
- **Database:** [Technology]
- **Infrastructure:** [Technology]

### Dependencies
\`\`\`json
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
\`\`\`

## Testing Strategy

### Unit Tests
- [ ] Component tests
- [ ] Service tests
- [ ] Utility function tests

### Integration Tests
- [ ] API endpoint tests
- [ ] Database integration tests

### E2E Tests
- [ ] User workflow tests
- [ ] Critical path tests

## Deployment

### Environment Configuration
\`\`\`env
NODE_ENV=production
DATABASE_URL=mongodb://localhost:27017/app
API_KEY=your-api-key
\`\`\`

### Deployment Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Security Considerations
- [Security consideration 1]
- [Security consideration 2]
- [Security consideration 3]

---
*Created: [Date] | Author: [Name] | Reviewers: [Names]*` 
    },
    { 
      name: 'README', 
      content: `# [Project Name]

[Brief project description - one or two sentences that explain what this project does]

## 🚀 Features

- **Feature 1:** Description of the first main feature
- **Feature 2:** Description of the second main feature
- **Feature 3:** Description of the third main feature

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Prerequisite 1] (version X.X.X)
- [Prerequisite 2] (version X.X.X)
- [Prerequisite 3] (version X.X.X)

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/username/project-name.git
   cd project-name
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. **Run the application**
   \`\`\`bash
   npm start
   # or
   yarn start
   \`\`\`

## 📖 Usage

### Basic Usage
\`\`\`javascript
// Example of basic usage
const example = require('your-package');
const result = example.doSomething();
console.log(result);
\`\`\`

### Advanced Usage
\`\`\`javascript
// Example of advanced usage
const example = require('your-package');
const config = {
  option1: 'value1',
  option2: 'value2'
};
const result = example.doSomethingAdvanced(config);
\`\`\`

## 🧪 Testing

Run the test suite:
\`\`\`bash
npm test
# or
yarn test
\`\`\`

Run tests with coverage:
\`\`\`bash
npm run test:coverage
# or
yarn test:coverage
\`\`\`

## 📁 Project Structure

\`\`\`
project-name/
├── src/
│   ├── components/
│   ├── utils/
│   └── index.js
├── tests/
├── docs/
├── package.json
└── README.md
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📝 License

This project is licensed under the [LICENSE NAME] - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Credit 1] for [contribution]
- [Credit 2] for [contribution]
- [Credit 3] for [contribution]

## 📞 Support

If you have any questions or need help:
- Create an [issue](https://github.com/username/project-name/issues)
- Email: [your-email@example.com]
- Documentation: [link-to-docs]

---
*Made with ❤️ by [Your Name]*
` 
    },
    { 
      name: 'Resume/CV', 
      content: `# [Your Name]

[Your Title/Role]  
📧 [your.email@example.com] | 📱 [Phone Number] | 🌐 [LinkedIn/Website]  
📍 [City, State/Country]

## Professional Summary
Experienced [Your Role] with [X] years of expertise in [key skills/technologies]. Proven track record of [key achievements]. Passionate about [your interests/values].

## Skills

### Technical Skills
- **Programming Languages:** [Language 1], [Language 2], [Language 3]
- **Frameworks & Libraries:** [Framework 1], [Framework 2], [Framework 3]
- **Databases:** [Database 1], [Database 2], [Database 3]
- **Tools & Technologies:** [Tool 1], [Tool 2], [Tool 3]

### Soft Skills
- Leadership & Team Management
- Problem Solving & Critical Thinking
- Communication & Collaboration
- Project Management

## Work Experience

### [Job Title] | [Company Name]
*[Start Date] - [End Date/Present]*
- Led development of [specific project/feature] resulting in [measurable outcome]
- Managed team of [X] developers and delivered [X] projects on time
- Implemented [specific technology/process] that improved [metric] by [X]%
- Collaborated with cross-functional teams to [specific achievement]

### [Previous Job Title] | [Previous Company]
*[Start Date] - [End Date]*
- Developed [specific feature/system] using [technologies]
- Optimized [process/system] leading to [X]% improvement in [metric]
- Mentored [X] junior developers and conducted [X] code reviews

## Education

### [Degree Name] | [University Name]
*[Graduation Year]*
- **Major:** [Your Major]
- **Minor:** [Your Minor] (if applicable)
- **GPA:** [GPA] (if applicable)
- **Relevant Coursework:** [Course 1], [Course 2], [Course 3]

## Projects

### [Project Name]
- **Technologies:** [Tech 1], [Tech 2], [Tech 3]
- **Description:** [Brief description of what the project does]
- **Key Features:** [Feature 1], [Feature 2], [Feature 3]
- **Link:** [GitHub/Live Demo URL]

### [Another Project]
- **Technologies:** [Tech 1], [Tech 2], [Tech 3]
- **Description:** [Brief description]
- **Key Features:** [Feature 1], [Feature 2]
- **Link:** [URL]

## Certifications
- [Certification 1] - [Issuing Organization] ([Year])
- [Certification 2] - [Issuing Organization] ([Year])

## Languages
- **English:** Native/Fluent
- **Spanish:** Intermediate/Advanced
- **Other:** [Level]

## Interests
- [Interest 1]
- [Interest 2]
- [Interest 3]

---
*Last Updated: [Date] | References available upon request*` 
    }
  ]);
  
  const [snippets, setSnippets] = useState([
    { 
      name: 'Code Block', 
      content: '```\n// Your code here\n```' 
    },
    { 
      name: 'JavaScript Function', 
      content: '```javascript\nfunction functionName(param1, param2) {\n  // Function logic here\n  return result;\n}\n```' 
    },
    { 
      name: 'React Component', 
      content: '```jsx\nimport React from \'react\';\n\nconst ComponentName = ({ prop1, prop2 }) => {\n  return (\n    <div>\n      {/* Component content */}\n    </div>\n  );\n};\n\nexport default ComponentName;\n```' 
    },
    { 
      name: 'Table', 
      content: '| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |' 
    },
    { 
      name: 'Link', 
      content: '[Link Text](https://example.com)' 
    },
    { 
      name: 'Image', 
      content: '![Alt Text](https://example.com/image.jpg)' 
    },
    { 
      name: 'Bold Text', 
      content: '**Bold text here**' 
    },
    { 
      name: 'Italic Text', 
      content: '*Italic text here*' 
    },
    { 
      name: 'Strikethrough', 
      content: '~~Strikethrough text~~' 
    },
    { 
      name: 'Inline Code', 
      content: '`inline code`' 
    },
    { 
      name: 'Blockquote', 
      content: '> This is a blockquote\n> It can span multiple lines' 
    },
    { 
      name: 'Unordered List', 
      content: '- Item 1\n- Item 2\n- Item 3\n  - Sub-item 1\n  - Sub-item 2' 
    },
    { 
      name: 'Ordered List', 
      content: '1. First item\n2. Second item\n3. Third item' 
    },
    { 
      name: 'Task List', 
      content: '- [ ] Unchecked task\n- [x] Checked task\n- [ ] Another task' 
    },
    { 
      name: 'Horizontal Rule', 
      content: '---' 
    },
    { 
      name: 'Heading 1', 
      content: '# Heading 1' 
    },
    { 
      name: 'Heading 2', 
      content: '## Heading 2' 
    },
    { 
      name: 'Heading 3', 
      content: '### Heading 3' 
    },
    { 
      name: 'Heading 4', 
      content: '#### Heading 4' 
    },
    { 
      name: 'Heading 5', 
      content: '##### Heading 5' 
    },
    { 
      name: 'Heading 6', 
      content: '###### Heading 6' 
    },
    { 
      name: 'Collapsible Section', 
      content: '<details>\n<summary>Click to expand</summary>\n\nContent goes here...\n\n</details>' 
    },
    { 
      name: 'HTML Comment', 
      content: '<!-- This is a comment -->' 
    },
    { 
      name: 'Emoji', 
      content: ':smile: :heart: :rocket: :star: :check:' 
    },
    { 
      name: 'Math Equation', 
      content: '$$\nE = mc^2\n$$' 
    },
    { 
      name: 'Mermaid Diagram', 
      content: '```mermaid\ngraph TD\n    A[Start] --> B{Decision?}\n    B -->|Yes| C[Action 1]\n    B -->|No| D[Action 2]\n    C --> E[End]\n    D --> E\n```' 
    },
    { 
      name: 'GitHub Issue Link', 
      content: '#123' 
    },
    { 
      name: 'User Mention', 
      content: '@username' 
    },
    { 
      name: 'Keyboard Shortcut', 
      content: '<kbd>Ctrl</kbd> + <kbd>C</kbd>' 
    },
    { 
      name: 'Highlight', 
      content: '==highlighted text==' 
    },
    { 
      name: 'Superscript', 
      content: 'X<sup>2</sup>' 
    },
    { 
      name: 'Subscript', 
      content: 'H<sub>2</sub>O' 
    },
    { 
      name: 'Definition List', 
      content: 'Term 1\n: Definition 1\n\nTerm 2\n: Definition 2' 
    },
    { 
      name: 'Footnotes', 
      content: 'Here is a sentence with a footnote[^1].\n\n[^1]: This is the footnote content.' 
    },
    { 
      name: 'Abbreviation', 
      content: '*[HTML]: HyperText Markup Language\n*[CSS]: Cascading Style Sheets' 
    },
    { 
      name: 'Citation', 
      content: 'Here is a quote from a source[^source].\n\n[^source]: Author, A. (Year). Title. Publisher.' 
    }
  ]);
  
  // Plugins and Extensions
  const [plugins, setPlugins] = useState([
    { name: 'Spell Check', enabled: true },
    { name: 'Grammar Check', enabled: false },
    { name: 'Auto Complete', enabled: true },
    { name: 'Code Highlighting', enabled: true },
    { name: 'Math Equations', enabled: false },
    { name: 'Diagrams', enabled: false },
    { name: 'Emoji Picker', enabled: true },
    { name: 'File Upload', enabled: false }
  ]);
  
  // Notifications and Alerts
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');
  
  // Search and Replace
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [isReplaceMode, setIsReplaceMode] = useState(false);
  
  // File Management
  const [currentFile, setCurrentFile] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30000); // 30 seconds
  
  // Refs
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);

  // Configure marked with advanced options
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false,
    highlight: function(code, lang) {
      return code;
    }
  });

  // Utility Functions
  const showNotificationCallback = useCallback((message, type = 'info', duration = 3000) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), duration);
  }, []);

  const calculateStats = useCallback((text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const chars = text.length;
    const lines = text.split('\\n').length;
    const readingTime = Math.ceil(words.length / 200);
    
    setWordCount(words.length);
    setCharCount(chars);
    setLineCount(lines);
    setReadingTime(readingTime);
  }, []);

  const addToHistory = useCallback((content) => {
    const newHistory = [...history.slice(0, currentVersion), content];
    setHistory(newHistory);
    setCurrentVersion(newHistory.length - 1);
    setCanUndo(currentVersion > 0);
    setCanRedo(false);
  }, [history, currentVersion]);

  const undo = useCallback(() => {
    if (currentVersion > 0) {
      const newVersion = currentVersion - 1;
      setCurrentVersion(newVersion);
      setMarkdown(history[newVersion]);
      setCanUndo(newVersion > 0);
      setCanRedo(true);
    }
  }, [currentVersion, history]);

  const redo = useCallback(() => {
    if (currentVersion < history.length - 1) {
      const newVersion = currentVersion + 1;
      setCurrentVersion(newVersion);
      setMarkdown(history[newVersion]);
      setCanUndo(true);
      setCanRedo(newVersion < history.length - 1);
    }
  }, [currentVersion, history]);

  const insertSnippet = useCallback((snippet) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = markdown.substring(0, start) + snippet.content + markdown.substring(end);
      setMarkdown(newText);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + snippet.content.length, start + snippet.content.length);
      }, 0);
    }
  }, [markdown]);

  const applyTemplate = useCallback((template) => {
    setMarkdown(template.content);
    showNotificationCallback(`Template "${template.name}" applied`, 'success');
  }, [showNotificationCallback]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotificationCallback('Copied to clipboard!', 'success');
    } catch (err) {
      showNotificationCallback('Failed to copy to clipboard', 'error');
    }
  }, [showNotificationCallback]);

  const generateShareLink = useCallback(() => {
    const encoded = btoa(encodeURIComponent(markdown));
    const link = `${window.location.origin}${window.location.pathname}?content=${encoded}`;
    copyToClipboard(link);
  }, [markdown, copyToClipboard]);

  const searchInMarkdown = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    const regex = new RegExp(query, 'gi');
    const matches = [];
    let match;
    
    while ((match = regex.exec(markdown)) !== null) {
      matches.push({
        index: match.index,
        text: match[0],
        line: markdown.substring(0, match.index).split('\\n').length
      });
    }
    
    setSearchResults(matches);
    setCurrentSearchIndex(0);
  }, [markdown]);

  const replaceInMarkdown = useCallback((search, replace) => {
    const newMarkdown = markdown.replace(new RegExp(search, 'g'), replace);
    setMarkdown(newMarkdown);
    showNotificationCallback(`Replaced ${search} with ${replace}`, 'success');
  }, [markdown, showNotificationCallback]);

  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem('yasir-markdown-editor-content', markdown);
      localStorage.setItem('yasir-markdown-editor-settings', JSON.stringify({
        isDark,
        fontSize,
        fontFamily,
        lineHeight,
        wordWrap,
        showLineNumbers,
        tabSize,
        insertSpaces
      }));
      setLastSaved(new Date());
      setIsDirty(false);
      showNotificationCallback('Auto-saved successfully', 'success');
    } catch (err) {
      showNotificationCallback('Failed to auto-save', 'error');
    }
  }, [markdown, isDark, fontSize, fontFamily, lineHeight, wordWrap, showLineNumbers, tabSize, insertSpaces, showNotificationCallback]);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedContent = localStorage.getItem('yasir-markdown-editor-content');
      const savedSettings = localStorage.getItem('yasir-markdown-editor-settings');
      
      if (savedContent) {
        setMarkdown(savedContent);
      }
      
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setIsDark(settings.isDark || false);
        setFontSize(settings.fontSize || 14);
        setFontFamily(settings.fontFamily || 'monospace');
        setLineHeight(settings.lineHeight || 1.6);
        setWordWrap(settings.wordWrap !== undefined ? settings.wordWrap : true);
        setShowLineNumbers(settings.showLineNumbers !== undefined ? settings.showLineNumbers : true);
        setTabSize(settings.tabSize || 2);
        setInsertSpaces(settings.insertSpaces !== undefined ? settings.insertSpaces : true);
      }
    } catch (err) {
      showNotificationCallback('Failed to load saved content', 'error');
    }
  }, [showNotificationCallback]);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => {
      if (markdown.trim()) {
        try {
          const convertedHtml = marked(markdown);
          setHtml(convertedHtml);
          calculateStats(markdown);
          setIsDirty(true);
        } catch (error) {
          console.error('Markdown conversion error:', error);
          setHtml('<p class="text-red-500">Error converting markdown</p>');
        }
      } else {
        setHtml('');
        calculateStats('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [markdown, calculateStats]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [markdown]);

  useEffect(() => {
    if (isAutoSave && isDirty) {
      const timer = setTimeout(saveToLocalStorage, autoSaveInterval);
      return () => clearTimeout(timer);
    }
  }, [markdown, isAutoSave, isDirty, autoSaveInterval, saveToLocalStorage]);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveToLocalStorage();
            break;
          case 'n':
            e.preventDefault();
            setMarkdown('');
            break;
          case 'o':
            e.preventDefault();
            fileInputRef.current?.click();
            break;
          case 'e':
            e.preventDefault();
            setShowExportModal(true);
            break;
          case 'f':
            e.preventDefault();
            setIsSearching(true);
            setTimeout(() => searchInputRef.current?.focus(), 100);
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'b':
            e.preventDefault();
            insertSnippet({ content: '**bold text**' });
            break;
          case 'i':
            e.preventDefault();
            insertSnippet({ content: '*italic text*' });
            break;
        }
      }
      
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [saveToLocalStorage, undo, redo, insertSnippet, toggleFullscreen]);

  // Event Handlers
  const handleMarkdownChange = (e) => {
    const newContent = e.target.value;
    setMarkdown(newContent);
    setIsTyping(true);
    addToHistory(newContent);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleExport = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-markdown.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotificationCallback('File exported successfully', 'success');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdown(event.target.result);
        setCurrentFile(file.name);
        showNotificationCallback(`File "${file.name}" loaded successfully`, 'success');
      };
      reader.readAsText(file);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchInMarkdown(query);
  };

  const handleReplace = () => {
    if (searchQuery && replaceQuery) {
      replaceInMarkdown(searchQuery, replaceQuery);
      setSearchQuery('');
      setReplaceQuery('');
    }
  };
  
  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Background Particles */}
      {showParticles && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-pulse ${
                isDark ? 'bg-blue-400/20' : 'bg-purple-400/20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className={`relative z-10 p-4 transition-all duration-500 ${
        isDark ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'
      } border-b border-gray-200 dark:border-gray-700`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              } shadow-lg`}>
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  NebulaFlow
                </h1>
                <p className={`text-sm transition-colors duration-500 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  The Cosmic Markdown Experience
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Open File (Ctrl+O)"
              >
                <Upload className="w-4 h-4 group-hover:animate-bounce" />
              </button>

              <button
                onClick={saveToLocalStorage}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Save (Ctrl+S)"
              >
                <Save className="w-4 h-4 group-hover:animate-bounce" />
              </button>

              <button
                onClick={() => setIsSearching(!isSearching)}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Search (Ctrl+F)"
              >
                <Search className="w-4 h-4 group-hover:animate-bounce" />
              </button>

              <button
                onClick={handleExport}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Export (Ctrl+E)"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
              </button>

              <button
                onClick={generateShareLink}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Share"
              >
                <Share2 className="w-4 h-4 group-hover:animate-bounce" />
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Settings"
              >
                <Settings className="w-4 h-4 group-hover:animate-bounce" />
              </button>

              <button
                onClick={toggleTheme}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                )}
              </button>

              <button
                onClick={toggleFullscreen}
                className={`group relative p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                }`}
                title="Fullscreen (F11)"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 group-hover:animate-bounce" />
                ) : (
                  <Maximize2 className="w-4 h-4 group-hover:animate-bounce" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearching && (
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search in markdown..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
              </div>
              {searchQuery && (
                <span className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {searchResults.length} results
                </span>
              )}
              {isReplaceMode && (
                <input
                  type="text"
                  placeholder="Replace with..."
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
              )}
              <button
                onClick={() => setIsReplaceMode(!isReplaceMode)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  isReplaceMode 
                    ? 'bg-blue-500 text-white' 
                    : isDark 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-white text-gray-800'
                }`}
              >
                Replace
              </button>
              {isReplaceMode && replaceQuery && (
                <button
                  onClick={handleReplace}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Replace All
                </button>
              )}
              <button
                onClick={() => setIsSearching(false)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-800'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <aside className={`w-64 p-4 transition-all duration-500 ${
            isDark ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm border-r border-gray-200 dark:border-gray-700`}>
            <div className="space-y-4">
              {/* Templates */}
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Templates
                </h3>
                <div className="space-y-1">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => applyTemplate(template)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Snippets */}
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Snippets
                </h3>
                <div className="space-y-1">
                  {snippets.map((snippet, index) => (
                    <button
                      key={index}
                      onClick={() => insertSnippet(snippet)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {snippet.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Statistics
                </h3>
                <div className={`text-xs space-y-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div>Words: {wordCount}</div>
                  <div>Characters: {charCount}</div>
                  <div>Lines: {lineCount}</div>
                  <div>Reading Time: {readingTime} min</div>
                  <div>Session: {Math.floor(sessionTime / 60)}m {sessionTime % 60}s</div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Editor Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Editor Panel */}
              <div className={`group relative transition-all duration-500 ${
                isDark 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl'
                } rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isDark ? 'bg-blue-600/20' : 'bg-blue-100'
                    }`}>
                      <Code className={`w-5 h-5 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                    </div>
                    <h2 className={`text-xl font-semibold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Markdown Editor
                    </h2>
                    {isTyping && (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    )}
                  </div>

                  {/* Editor Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={undo}
                      disabled={!canUndo}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        canUndo 
                          ? isDark 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          : isDark 
                            ? 'bg-gray-800 text-gray-500' 
                            : 'bg-gray-50 text-gray-400'
                      }`}
                      title="Undo (Ctrl+Z)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={redo}
                      disabled={!canRedo}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        canRedo 
                          ? isDark 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          : isDark 
                            ? 'bg-gray-800 text-gray-500' 
                            : 'bg-gray-50 text-gray-400'
                      }`}
                      title="Redo (Ctrl+Shift+Z)"
                    >
                      <RotateCcw className="w-4 h-4 transform scale-x-[-1]" />
                    </button>
                  </div>
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={markdown}
                  onChange={handleMarkdownChange}
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily,
                    lineHeight: lineHeight,
                    tabSize: tabSize
                  }}
                  className={`w-full min-h-[500px] p-4 rounded-xl border-2 transition-all duration-300 resize-none focus:outline-none focus:ring-4 ${
                    isDark 
                      ? 'bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                      : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
                  placeholder="Start typing your markdown here..."
                  spellCheck={plugins.find(p => p.name === 'Spell Check')?.enabled}
                />
              </div>

              {/* Preview Panel */}
              <div className={`group relative transition-all duration-500 ${
                isDark 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl'
                } rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isDark ? 'bg-purple-600/20' : 'bg-purple-100'
                    }`}>
                      <Eye className={`w-5 h-5 ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                    <h2 className={`text-xl font-semibold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Live Preview
                    </h2>
                  </div>

                  {/* Preview Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(html)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                      title="Copy HTML"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div 
                  ref={previewRef}
                  className={`prose prose-lg max-w-none transition-all duration-500 ${
                    isDark 
                      ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-purple-400 prose-pre:bg-gray-900' 
                      : 'prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-code:text-purple-600 prose-pre:bg-gray-100'
                  }`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.txt,.markdown"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-20 flex flex-col space-y-2">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className={`group relative p-4 rounded-full transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500' 
              : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400'
          } shadow-lg hover:shadow-xl transform hover:scale-110`}
          title="Toggle Sidebar"
        >
          <Sidebar className="w-6 h-6 text-white group-hover:animate-bounce" />
        </button>

        <button
          onClick={() => setShowParticles(!showParticles)}
          className={`group relative p-4 rounded-full transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400'
          } shadow-lg hover:shadow-xl transform hover:scale-110`}
          title="Toggle Particles"
        >
          <Sparkles className="w-6 h-6 text-white group-hover:animate-spin" />
        </button>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notificationType === 'success' 
            ? 'bg-green-500 text-white' 
            : notificationType === 'error' 
              ? 'bg-red-500 text-white' 
              : 'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            {notificationType === 'success' && <CheckCircle className="w-5 h-5" />}
            {notificationType === 'error' && <AlertCircle className="w-5 h-5" />}
            {notificationType === 'info' && <Info className="w-5 h-5" />}
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
