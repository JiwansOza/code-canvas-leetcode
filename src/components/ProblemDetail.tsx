
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CodeBlock from './CodeBlock';
import { ChevronDown, ExternalLink } from 'lucide-react';

export type ProblemDetails = {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  solutions: {
    [key: string]: string;  // e.g. { python: "...", java: "...", cpp: "..." }
  };
  explanation: string;
};

type ProblemDetailProps = {
  problem: ProblemDetails;
};

const ProblemDetail = ({ problem }: ProblemDetailProps) => {
  const difficultyColor = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard'
  };
  
  // Generate a LeetCode URL from the problem title
  const leetCodeUrl = `https://leetcode.com/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/`;
  
  // Check if we have any valid solutions
  const hasSolutions = Object.keys(problem.solutions).length > 0;
  const solutionMessage = !hasSolutions 
    ? "No solutions found for this problem." 
    : Object.keys(problem.solutions).some(lang => 
        problem.solutions[lang] && !problem.solutions[lang].includes("No solution found")
      ) ? "" : "No solutions found for this problem.";
  
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-muted-foreground">#{problem.id}</span>
          <h1 className="text-2xl font-semibold">{problem.title}</h1>
          <Badge className={difficultyColor[problem.difficulty]}>
            {problem.difficulty}
          </Badge>
          <a 
            href={leetCodeUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-auto text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm"
          >
            View on LeetCode <ExternalLink size={14} />
          </a>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {problem.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-secondary/50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Accordion type="single" collapsible defaultValue="description">
          <AccordionItem value="description" className="border-b">
            <AccordionTrigger className="text-lg font-medium">Problem Description</AccordionTrigger>
            <AccordionContent>
              <div className="prose max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: problem.description }} />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="solution" className="border-b">
            <AccordionTrigger className="text-lg font-medium">Solution</AccordionTrigger>
            <AccordionContent>
              {solutionMessage ? (
                <p className="text-muted-foreground py-4">{solutionMessage}</p>
              ) : (
                <CodeBlock code={problem.solutions} className="mb-4" />
              )}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="explanation">
            <AccordionTrigger className="text-lg font-medium">Explanation</AccordionTrigger>
            <AccordionContent>
              <div className="prose max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: problem.explanation }} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="bg-secondary/30 p-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Solution credit: Local solutions data stored in leetcode_solutions.json
        </p>
      </div>
    </div>
  );
};

export default ProblemDetail;
