
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export type Problem = {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  slug: string;
};

type ProblemCardProps = {
  problem: Problem;
  index: number;
  className?: string;
};

const ProblemCard = ({ problem, index, className = '' }: ProblemCardProps) => {
  const difficultyColor = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard'
  };
  
  // Add a delay based on index for staggered animation
  const animationDelay = `${index * 50}ms`;
  
  return (
    <Link to={`/problem/${problem.slug}`}>
      <Card className={`card-hover overflow-hidden opacity-0 animate-slide-up ${className}`}
            style={{ animationDelay, animationFillMode: 'forwards' }}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-muted-foreground text-sm">#{problem.id}</span>
                <Badge className={difficultyColor[problem.difficulty]}>
                  {problem.difficulty}
                </Badge>
              </div>
              <h3 className="font-medium text-lg mb-2">{problem.title}</h3>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {problem.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-secondary/50">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProblemCard;
