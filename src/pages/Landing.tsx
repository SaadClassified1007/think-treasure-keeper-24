
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FileText, Brain, BookOpen, Upload, BarChart } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="border-b border-border py-4 px-6 flex items-center justify-between bg-background/95 backdrop-blur-sm">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">NOTEIT</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered Knowledge Management
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl">
          Organize your thoughts, notes, and knowledge with the power of artificial intelligence
        </p>
        <Button 
          size="lg" 
          className="text-lg px-8 py-6"
          onClick={() => navigate('/dashboard')}
        >
          Get Started For Free
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-10 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Brain}
              title="AI-Powered Organization"
              description="Automatically categorize and organize your notes with advanced AI algorithms"
            />
            <FeatureCard 
              icon={BookOpen}
              title="Smart Flashcards"
              description="Convert your notes into interactive flashcards for effective learning"
            />
            <FeatureCard 
              icon={FileText}
              title="Intelligent Note-Taking"
              description="Take notes efficiently with AI-assisted formatting and organization"
            />
            <FeatureCard 
              icon={Upload}
              title="Document Upload"
              description="Upload and process documents for easy knowledge extraction"
            />
            <FeatureCard 
              icon={BarChart}
              title="Knowledge Analytics"
              description="Gain insights into your learning patterns and knowledge base"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-border text-center text-sm text-muted-foreground">
        <p>© 2025 NOTEIT. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
