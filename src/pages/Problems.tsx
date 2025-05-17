import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchBar from '@/components/SearchBar';
import ProblemCard from '@/components/ProblemCard';
import FilterBar, { FilterState } from '@/components/FilterBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProblems } from '@/data/mockData';

const Problems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProblems, setFilteredProblems] = useState(mockProblems);
  const [filters, setFilters] = useState<FilterState>({
    difficulty: [],
    language: '',
    tags: []
  });
  
  // Get all unique tags from mock data
  const allTags = [...new Set(mockProblems.flatMap(problem => problem.tags))];
  const allLanguages = ['python', 'java', 'cpp', 'javascript'];
  
  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      filterProblems(activeTab, '', filters);
    }
  }, [location.search]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProblems(activeTab, query, filters);
    
    // Update URL with search query
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() });
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterProblems(value, searchQuery, filters);
  };
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    filterProblems(activeTab, searchQuery, newFilters);
  };
  
  const filterProblems = (tab: string, query: string, filterState: FilterState) => {
    let results = [...mockProblems];
    
    // Filter by tab
    if (tab !== 'all') {
      results = results.filter(problem => 
        problem.difficulty.toLowerCase() === tab.toLowerCase()
      );
    }
    
    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(problem => 
        problem.title.toLowerCase().includes(lowercaseQuery) || 
        problem.id.toString().includes(lowercaseQuery) ||
        problem.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    // Filter by difficulty
    if (filterState.difficulty.length > 0) {
      results = results.filter(problem => 
        filterState.difficulty.includes(problem.difficulty)
      );
    }
    
    // Filter by language (would need actual data about available languages per problem)
    // This is a placeholder for the mock data
    if (filterState.language) {
      // In a real app, we would filter based on available languages
      // For the mock, we'll just keep all problems
    }
    
    // Filter by tags
    if (filterState.tags.length > 0) {
      results = results.filter(problem => 
        problem.tags.some(tag => filterState.tags.includes(tag))
      );
    }
    
    setFilteredProblems(results);
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 animate-fade-in">All Problems</h1>
          
          <div className="mb-6 animate-slide-up">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search problems..."
              value={searchQuery}
            />
          </div>
          
          <FilterBar 
            onFilterChange={handleFilterChange}
            availableTags={allTags}
            availableLanguages={allLanguages}
          />
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-8 animate-fade-in">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="easy">Easy</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="hard">Hard</TabsTrigger>
            </TabsList>
            
            {['all', 'easy', 'medium', 'hard'].map(tab => (
              <TabsContent key={tab} value={tab}>
                {filteredProblems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProblems.map((problem, index) => (
                      <ProblemCard 
                        key={problem.id} 
                        problem={problem} 
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-2">No problems found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                    <Button onClick={() => {
                      setFilters({ difficulty: [], language: '', tags: [] });
                      setSearchQuery('');
                      handleSearch('');
                      setActiveTab('all');
                    }}>
                      Reset filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Problems;
