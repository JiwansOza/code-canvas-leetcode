
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProblemDetail from '@/components/ProblemDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProblemDetails, mockProblems } from '@/data/mockData';

const ProblemPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<typeof mockProblemDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch the problem details
    // For this demo, we're using mock data
    
    setTimeout(() => {
      try {
        if (!slug) {
          throw new Error("Problem not found");
        }
        
        const foundProblem = mockProblems.find(p => p.slug === slug);
        if (!foundProblem) {
          throw new Error("Problem not found");
        }
        
        // In a real app, we would fetch the full problem details
        // Here we're just using mock data
        setProblem(mockProblemDetails);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    }, 500); // Simulate loading delay
  }, [slug]);
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 animate-fade-in"
            asChild
          >
            <Link to="/problems" className="flex items-center">
              <ChevronLeft size={18} className="mr-1" />
              Back to Problems
            </Link>
          </Button>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-pulse flex flex-col w-full max-w-3xl mx-auto">
                <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
                <div className="h-32 bg-muted rounded mb-4"></div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">{error}</h2>
              <Button asChild>
                <Link to="/problems">Browse All Problems</Link>
              </Button>
            </div>
          ) : problem ? (
            <div className="max-w-4xl mx-auto">
              <ProblemDetail problem={problem} />
            </div>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProblemPage;
