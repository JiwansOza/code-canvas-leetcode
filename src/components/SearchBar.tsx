
import React, { useState } from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  animated?: boolean;
};

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search problems...", 
  className = "",
  animated = true 
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
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
