
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 flex-grow">
        <div className="container mx-auto max-w-md text-center">
          <div className="text-8xl font-bold text-primary animate-float mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4 animate-fade-in">Page Not Found</h1>
          <p className="text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
