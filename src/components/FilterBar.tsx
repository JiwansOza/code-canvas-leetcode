
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Filter } from 'lucide-react';

export type FilterState = {
  difficulty: string[];
  language: string;
  tags: string[];
};

type FilterBarProps = {
  onFilterChange: (filters: FilterState) => void;
  availableTags: string[];
  availableLanguages: string[];
};

const FilterBar = ({ onFilterChange, availableTags, availableLanguages }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    difficulty: [],
    language: '',
    tags: []
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleDifficulty = (difficulty: string) => {
    let newDifficulties: string[];
    
    if (filters.difficulty.includes(difficulty)) {
      newDifficulties = filters.difficulty.filter(d => d !== difficulty);
    } else {
      newDifficulties = [...filters.difficulty, difficulty];
    }
    
    const newFilters = { ...filters, difficulty: newDifficulties };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleLanguageChange = (language: string) => {
    const newFilters = { ...filters, language };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const toggleTag = (tag: string) => {
    let newTags: string[];
    
    if (filters.tags.includes(tag)) {
      newTags = filters.tags.filter(t => t !== tag);
    } else {
      newTags = [...filters.tags, tag];
    }
    
    const newFilters = { ...filters, tags: newTags };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const resetFilters = () => {
    const newFilters = { difficulty: [], language: '', tags: [] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6 animate-slide-up">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
        <h3 className="font-medium flex items-center gap-2">
          <Filter size={18} />
          Filters
          {(filters.difficulty.length > 0 || filters.language || filters.tags.length > 0) && (
            <Badge variant="secondary" className="ml-2">
              {filters.difficulty.length + (filters.language ? 1 : 0) + filters.tags.length}
            </Badge>
          )}
        </h3>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          {(filters.difficulty.length > 0 || filters.language || filters.tags.length > 0) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                <Button 
                  key={difficulty} 
                  variant={filters.difficulty.includes(difficulty) ? "default" : "outline"}
                  size="sm"
                  className={filters.difficulty.includes(difficulty) 
                    ? `bg-${difficulty.toLowerCase()}-200 hover:bg-${difficulty.toLowerCase()}-300 text-${difficulty.toLowerCase()}-800` 
                    : ''}
                  onClick={() => toggleDifficulty(difficulty)}
                >
                  {filters.difficulty.includes(difficulty) && (
                    <Check size={16} className="mr-1" />
                  )}
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Language</p>
            <Select 
              value={filters.language} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All languages</SelectItem>
                {availableLanguages.map(language => (
                  <SelectItem key={language} value={language}>
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Tags</p>
            <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto">
              {availableTags.map(tag => (
                <Badge 
                  key={tag} 
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${filters.tags.includes(tag) ? 'bg-primary' : 'hover:bg-secondary'}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  {filters.tags.includes(tag) && (
                    <Check size={12} className="ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
