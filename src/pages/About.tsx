
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 animate-fade-in">About This Project</h1>
          
          <Card className="mb-8 animate-slide-up">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <p className="text-muted-foreground mb-4">
                This website showcases LeetCode problem solutions sourced from the GitHub repository 
                <a 
                  href="https://github.com/walkccc/LeetCode" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mx-1"
                >
                  walkccc/LeetCode
                </a>
                created by Peng-Yu Chen. The purpose of this site is educational, helping users learn from well-implemented solutions to algorithmic problems.
              </p>
              <p className="text-muted-foreground">
                The website features a modern, responsive design with smooth animations and transitions, 
                making it pleasant and easy to browse through hundreds of programming solutions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Attribution</h2>
              <p className="text-muted-foreground mb-4">
                All solutions displayed on this website are credited to Peng-Yu Chen (walkccc) and are used under the MIT license. 
                We express our sincere gratitude for making these high-quality solutions available to the community.
              </p>
              <p className="text-muted-foreground">
                This website is created by Jiwans Oza as a portfolio project to demonstrate modern web development skills 
                while providing educational value to the programming community.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>React with TypeScript for the frontend</li>
                <li>Tailwind CSS for styling</li>
                <li>Shadcn UI component library</li>
                <li>React Router for navigation</li>
                <li>CSS animations for smooth transitions</li>
                <li>Syntax highlighting for code blocks</li>
                <li>Responsive design for all device types</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Educational Use</h2>
              <p className="text-muted-foreground mb-4">
                This website is designed for educational purposes only. The intention is to help programmers learn 
                from well-crafted solutions and understand various algorithms and data structures through practical examples.
              </p>
              <p className="text-muted-foreground mb-6">
                We encourage users to understand the solutions rather than memorizing them, and to practice 
                implementing the solutions themselves before checking the reference solutions provided here.
              </p>
              <div className="flex justify-center">
                <Button asChild>
                  <Link to="/problems">Start Exploring Solutions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
