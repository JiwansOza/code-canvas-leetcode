
import React, { useState } from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  animated?: boolean;
  value?: string; // Added this prop
};

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search problems...", 
  className = "",
  animated = true,
  value: externalValue // Added this prop with a renamed parameter to avoid conflicts
}: SearchBarProps) => {
  // If externalValue is provided, use it as initial state
  const [searchQuery, setSearchQuery] = useState(externalValue || '');
  const [isFocused, setIsFocused] = useState(false);
  
  // Update internal state when external value changes
  React.useEffect(() => {
    if (externalValue !== undefined) {
      setSearchQuery(externalValue);
    }
  }, [externalValue]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative group ${className} ${animated ? 'transition-all duration-300' : ''}`}
    >
      <div className={`
        flex items-center bg-card border ${isFocused ? 'border-primary shadow-md' : 'border-border'} 
        rounded-lg overflow-hidden transition-all duration-300 ease-in-out
        ${isFocused ? 'ring-2 ring-primary/20' : ''}
      `}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-grow p-3 pl-4 bg-transparent focus:outline-none text-foreground"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button 
          type="submit"
          className={`p-3 text-foreground/70 hover:text-primary transition-colors`}
        >
          <Search size={20} />
        </button>
      </div>
      {animated && (
        <div className={`
          absolute inset-0 -z-10 bg-primary/5 rounded-lg 
          transition-all duration-500 ease-in-out 
          ${isFocused ? 'scale-105 opacity-100' : 'scale-100 opacity-0'}
        `}></div>
      )}
    </form>
  );
};

export default SearchBar;
