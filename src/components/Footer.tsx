
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fade-in">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-1 bg-primary rounded text-white font-bold">LC</div>
              <span className="text-lg font-semibold">LeetCode Solutions</span>
            </Link>
            <p className="mt-4 text-foreground/70">
              A collection of LeetCode problem solutions for educational purposes.
            </p>
          </div>
          
          <div className="animate-fade-in delay-100">
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-foreground/70 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/problems" className="text-foreground/70 hover:text-primary transition-colors">Problems</Link></li>
              <li><Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div className="animate-fade-in delay-200">
            <h3 className="font-semibold mb-4">Attribution</h3>
            <p className="text-foreground/70">
              All solutions are credited to Peng-Yu Chen (walkccc) under MIT license.
              This website is created by Jiwans Oza for educational purposes.
            </p>
            <p className="mt-4">
              <a 
                href="https://github.com/walkccc/LeetCode" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                GitHub Repository
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-8 pt-8 text-center text-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} LeetCode Solutions. For educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
