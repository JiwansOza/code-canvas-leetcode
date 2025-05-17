
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import ProblemCard from '@/components/ProblemCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockFeaturedProblems } from '@/data/mockData';

const Home = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/problems?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-blue-50 to-background">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              LeetCode Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Explore and learn from elegant, well-explained solutions to LeetCode problems
            </p>
            
            <div className="max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <SearchBar onSearch={handleSearch} placeholder="Search for problems (e.g., 'Two Sum', 'Linked List')" />
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Button onClick={() => navigate('/problems')} className="gap-1 px-6">
                Browse All Problems 
                <ChevronRight size={16} />
              </Button>
              <Button variant="outline" onClick={() => navigate('/about')} className="px-6">
                About This Project
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Problems */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Featured Problems</h2>
              <Button variant="ghost" onClick={() => navigate('/problems')}>
                View All <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFeaturedProblems.map((problem, index) => (
                <ProblemCard 
                  key={problem.id} 
                  problem={problem} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">Problem Categories</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Arrays & Strings", count: 240, icon: "📊" },
                { name: "Linked Lists", count: 120, icon: "🔗" },
                { name: "Trees & Graphs", count: 180, icon: "🌲" },
                { name: "Dynamic Programming", count: 150, icon: "🧩" },
                { name: "Binary Search", count: 90, icon: "🔍" },
                { name: "Sorting & Searching", count: 110, icon: "🔢" },
              ].map((category, index) => (
                <Card key={category.name} className="card-hover opacity-0 animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg">{category.name}</h3>
                      <p className="text-muted-foreground">{category.count} problems</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 animate-fade-in">Ready to Level Up Your Coding Skills?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Dive into our comprehensive collection of LeetCode solutions and accelerate your programming journey.
            </p>
            <Button 
              onClick={() => navigate('/problems')} 
              size="lg"
              variant="secondary"
              className="animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              Start Exploring
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
