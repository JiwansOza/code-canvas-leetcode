
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProblemDetail from '@/components/ProblemDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProblems } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const ProblemPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProblemDetails = async () => {
      setLoading(true);
      try {
        if (!slug) {
          throw new Error("Problem not found");
        }
        
        const foundProblem = mockProblems.find(p => p.slug === slug);
        if (!foundProblem) {
          throw new Error("Problem not found");
        }
        
        // Get the problem ID for the GitHub repo
        const problemId = String(foundProblem.id).padStart(4, '0');
        
        // Fetch the problem details from GitHub
        const solutions: Record<string, string> = {};
        
        // Languages to fetch
        const languages = ['python', 'java', 'cpp'];
        
        // Try to fetch each language solution
        await Promise.all(languages.map(async (lang) => {
          let extension = lang;
          if (lang === 'cpp') extension = 'cpp';
          else if (lang === 'java') extension = 'java';
          else if (lang === 'python') extension = 'py';
          
          try {
            // Format the GitHub raw content URL
            const url = `https://raw.githubusercontent.com/walkccc/LeetCode/main/solutions/${problemId}.%20${foundProblem.title.replace(/\s+/g, '%20')}/${extension === 'py' ? 'main.' + extension : 'Solution.' + extension}`;
            
            const response = await fetch(url);
            
            if (response.ok) {
              const code = await response.text();
              solutions[lang] = code;
            } else {
              console.log(`No ${lang} solution found for problem ${foundProblem.title}`);
            }
          } catch (err) {
            console.error(`Error fetching ${lang} solution:`, err);
          }
        }));
        
        // If we couldn't find any solutions
        if (Object.keys(solutions).length === 0) {
          toast({
            title: "No solutions found",
            description: "Couldn't find solutions in the GitHub repo for this problem",
            variant: "destructive"
          });
          
          // Use placeholder solution message
          solutions.python = "// No solution found in GitHub repository";
          solutions.java = "// No solution found in GitHub repository";
          solutions.cpp = "// No solution found in GitHub repository";
        }
        
        // Create a problem object with the found solutions
        const problemDetails = {
          id: foundProblem.id,
          title: foundProblem.title,
          difficulty: foundProblem.difficulty as "Easy" | "Medium" | "Hard",
          description: `<p>This is the description for ${foundProblem.title}.</p>
                        <p>View the full problem on <a href="https://leetcode.com/problems/${slug}/" target="_blank" rel="noopener noreferrer">LeetCode</a>.</p>`,
          tags: foundProblem.tags,
          solutions: solutions,
          explanation: `<p>Solutions provided by <a href="https://github.com/walkccc/LeetCode" target="_blank" rel="noopener noreferrer">walkccc/LeetCode</a> GitHub repository.</p>
                       <p>For a detailed explanation, please visit the repository.</p>`
        };
        
        setProblem(problemDetails);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "An error occurred fetching the problem",
          variant: "destructive"
        });
      }
    };

    fetchProblemDetails();
  }, [slug, toast]);
  
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
