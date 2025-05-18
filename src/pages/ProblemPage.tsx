
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProblemDetail from '@/components/ProblemDetail';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProblems } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { ProblemDetails } from '@/components/ProblemDetail';

// Define the type for solution entries in the JSON
interface SolutionEntry {
  slug: string;
  title: string;
  language: string;
  code: string;
}

const ProblemPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<ProblemDetails | null>(null);
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
        
        // Fetch solutions from local JSON file
        const solutions: Record<string, string> = {};
        
        try {
          const response = await fetch('/leetcode_solutions.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch solutions: ${response.status}`);
          }
          
          const solutionsData: SolutionEntry[] = await response.json();
          
          // Extract problem number from slug or title
          const problemIdMatch = foundProblem.title.match(/^\d+/) || slug.match(/\d+/);
          const problemNumber = problemIdMatch ? problemIdMatch[0] : '';
          
          // Filter solutions for the current problem - improved matching logic
          const problemSolutions = solutionsData.filter(solution => {
            // Match by slug containing problem number
            if (solution.slug && (
              solution.slug.includes(slug) || 
              (problemNumber && solution.slug.includes(problemNumber))
            )) {
              return true;
            }
            
            // Match by title containing the problem title or number
            if (solution.title && (
              solution.title.toLowerCase().includes(foundProblem.title.toLowerCase()) ||
              (problemNumber && solution.title.includes(problemNumber))
            )) {
              return true;
            }
            
            // Match by language field containing the problem title (for malformed entries)
            if (solution.language && (
              solution.language.toLowerCase().includes(foundProblem.title.toLowerCase()) ||
              (problemNumber && solution.language.includes(problemNumber))
            )) {
              return true;
            }
            
            return false;
          });
          
          console.log(`Found ${problemSolutions.length} solutions for problem ${foundProblem.title}`);
          
          // Group solutions by language
          problemSolutions.forEach(solution => {
            // Extract the actual language from the data fields
            let language = '';
            
            // Common programming languages to check for
            const languageKeywords = {
              'python': ['python', 'py'],
              'java': ['java'],
              'cpp': ['cpp', 'c++'],
              'javascript': ['javascript', 'js'],
              'typescript': ['typescript', 'ts'],
              'go': ['go', 'golang']
            };
            
            // Try to determine language from the language field
            const lowerLanguage = solution.language.toLowerCase();
            for (const [lang, keywords] of Object.entries(languageKeywords)) {
              if (keywords.some(keyword => lowerLanguage.includes(keyword))) {
                language = lang;
                break;
              }
            }
            
            // If language not found in the language field, try the title
            if (!language) {
              const lowerTitle = solution.title.toLowerCase();
              for (const [lang, keywords] of Object.entries(languageKeywords)) {
                if (keywords.some(keyword => lowerTitle.includes(keyword))) {
                  language = lang;
                  break;
                }
              }
            }
            
            // Fallback to a default if no language detected
            if (!language) {
              language = 'unknown';
            }
            
            // Store the solution with the detected language
            solutions[language] = solution.code;
          });
          
          // If we couldn't find any solutions
          if (Object.keys(solutions).length === 0) {
            console.log(`No solutions found for problem ${foundProblem.title}`);
            toast({
              title: "No solutions found",
              description: "Couldn't find solutions for this problem in the local JSON file",
              variant: "destructive"
            });
            
            // Use placeholder solution message
            solutions.python = "// No solution found in the local JSON file";
            solutions.java = "// No solution found in the local JSON file";
            solutions.cpp = "// No solution found in the local JSON file";
          }
          
        } catch (err) {
          console.error("Error fetching solutions:", err);
          toast({
            title: "Error loading solutions",
            description: "Failed to load solutions from the local JSON file",
            variant: "destructive"
          });
          
          // Use placeholder solution message for error case
          solutions.python = "// Error loading solutions from the local JSON file";
          solutions.java = "// Error loading solutions from the local JSON file";
          solutions.cpp = "// Error loading solutions from the local JSON file";
        }
        
        // Create a problem object with the found solutions
        const problemDetails: ProblemDetails = {
          id: foundProblem.id,
          title: foundProblem.title,
          difficulty: foundProblem.difficulty as "Easy" | "Medium" | "Hard",
          description: `<p>This is the description for ${foundProblem.title}.</p>
                        <p>View the full problem on <a href="https://leetcode.com/problems/${slug}/" target="_blank" rel="noopener noreferrer">LeetCode</a>.</p>`,
          tags: foundProblem.tags,
          solutions: solutions,
          explanation: `<p>Solutions loaded from local JSON file.</p>
                       <p>For a detailed explanation, please visit the LeetCode website.</p>`
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
