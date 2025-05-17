
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CodeBlockProps = {
  code: {
    [key: string]: string;  // e.g. { python: "...", java: "...", cpp: "..." }
  };
  className?: string;
};

// A simple syntax highlighter
const syntaxHighlight = (code: string, language: string) => {
  // This is a basic version - ideally we would use a proper syntax highlighter library
  // like Prism.js or highlight.js in a production app
  
  let highlighted = code;
  
  // Apply some basic syntax highlighting rules based on language
  if (language === 'python') {
    const keywords = ['def', 'return', 'if', 'else', 'for', 'while', 'in', 'True', 'False', 'None', 'class', 'import', 'from'];
    keywords.forEach(keyword => {
      highlighted = highlighted.replace(
        new RegExp(`\\b${keyword}\\b`, 'g'),
        `<span class="text-blue-600 dark:text-blue-400">${keyword}</span>`
      );
    });
    
    // Highlight comments
    highlighted = highlighted.replace(
      /(#.*)$/gm,
      '<span class="text-green-600 dark:text-green-400">$1</span>'
    );
    
    // Highlight strings
    highlighted = highlighted.replace(
      /(['"])(.*?)(\1)/g,
      '<span class="text-amber-600 dark:text-amber-300">$1$2$3</span>'
    );
  } else if (language === 'java' || language === 'cpp') {
    const keywords = ['public', 'private', 'static', 'void', 'int', 'String', 'class', 'return', 'if', 'else', 'for', 'while'];
    keywords.forEach(keyword => {
      highlighted = highlighted.replace(
        new RegExp(`\\b${keyword}\\b`, 'g'),
        `<span class="text-blue-600 dark:text-blue-400">${keyword}</span>`
      );
    });
    
    // Highlight comments
    highlighted = highlighted.replace(
      /(\/\/.*)$/gm,
      '<span class="text-green-600 dark:text-green-400">$1</span>'
    );
    
    // Highlight strings
    highlighted = highlighted.replace(
      /(['"])(.*?)(\1)/g,
      '<span class="text-amber-600 dark:text-amber-300">$1$2$3</span>'
    );
  }
  
  return highlighted;
};

const CodeBlock = ({ code, className = '' }: CodeBlockProps) => {
  const [activeLanguage, setActiveLanguage] = useState(Object.keys(code)[0] || 'python');
  const [isCopied, setIsCopied] = useState(false);
  
  const languages = Object.keys(code);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code[activeLanguage]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  useEffect(() => {
    // Reset copied state when changing language
    setIsCopied(false);
  }, [activeLanguage]);
  
  return (
    <div className={`rounded-lg overflow-hidden border border-border animate-fade-in ${className}`}>
      <Tabs defaultValue={activeLanguage} onValueChange={setActiveLanguage}>
        <div className="flex justify-between items-center px-4 py-2 bg-secondary/50 border-b border-border">
          <TabsList className="bg-transparent">
            {languages.map(lang => (
              <TabsTrigger 
                key={lang} 
                value={lang}
                className="data-[state=active]:bg-background/80 data-[state=active]:shadow-sm"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <button 
            onClick={copyToClipboard}
            className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full transition-colors"
          >
            {isCopied ? "Copied!" : "Copy code"}
          </button>
        </div>
        
        {languages.map(lang => (
          <TabsContent key={lang} value={lang} className="m-0">
            <pre className="bg-code text-code-foreground p-4 overflow-x-auto text-sm">
              <code dangerouslySetInnerHTML={{
                __html: syntaxHighlight(code[lang], lang)
              }} />
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeBlock;
