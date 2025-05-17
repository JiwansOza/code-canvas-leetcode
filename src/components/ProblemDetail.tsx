
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CodeBlock from './CodeBlock';

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
  
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-muted-foreground">#{problem.id}</span>
          <h1 className="text-2xl font-semibold">{problem.title}</h1>
          <Badge className={difficultyColor[problem.difficulty]}>
            {problem.difficulty}
          </Badge>
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
              <CodeBlock code={problem.solutions} className="mb-4" />
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
          Solution credit: <a href="https://github.com/walkccc/LeetCode" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peng-Yu Chen (walkccc)</a> under MIT license.
        </p>
      </div>
    </div>
  );
};

export default ProblemDetail;
