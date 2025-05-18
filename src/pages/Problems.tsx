
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
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';

const PROBLEMS_PER_PAGE = 9;

const Problems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProblems, setFilteredProblems] = useState(mockProblems);
  const [currentPage, setCurrentPage] = useState(1);
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
    const page = params.get('page');
    
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      filterProblems(activeTab, '', filters);
    }
    
    if (page) {
      setCurrentPage(parseInt(page, 10) || 1);
    }
  }, [location.search]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * PROBLEMS_PER_PAGE,
    currentPage * PROBLEMS_PER_PAGE
  );
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate({ search: params.toString() });
    window.scrollTo(0, 0);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProblems(activeTab, query, filters);
    setCurrentPage(1);
    
    // Update URL with search query
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    params.delete('page');
    navigate({ search: params.toString() });
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterProblems(value, searchQuery, filters);
    setCurrentPage(1);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.delete('page');
    navigate({ search: params.toString() });
  };
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    filterProblems(activeTab, searchQuery, newFilters);
    setCurrentPage(1);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.delete('page');
    navigate({ search: params.toString() });
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
    
    // Sort by ID
    results.sort((a, b) => a.id - b.id);
    
    setFilteredProblems(results);
  };
  
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last pages as they're always shown
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
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
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedProblems.map((problem, index) => (
                        <ProblemCard 
                          key={problem.id} 
                          problem={problem} 
                          index={index}
                        />
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {filteredProblems.length > PROBLEMS_PER_PAGE && (
                      <div className="mt-12">
                        <Pagination>
                          <PaginationContent>
                            {currentPage > 1 && (
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => handlePageChange(currentPage - 1)} 
                                />
                              </PaginationItem>
                            )}
                            
                            {renderPaginationItems()}
                            
                            {currentPage < totalPages && (
                              <PaginationItem>
                                <PaginationNext
                                  onClick={() => handlePageChange(currentPage + 1)}
                                />
                              </PaginationItem>
                            )}
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
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
