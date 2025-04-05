
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FileText, Brain, BookOpen, Upload, BarChart, ArrowRight, Check, Star } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="border-b border-border py-4 px-6 flex items-center justify-between bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">NOTEIT</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button 
            variant="outline" 
            onClick={() => navigate('/signin')}
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-10 max-w-5xl mx-auto mt-10 mb-20">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">
            AI-Powered Knowledge Management
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl font-light">
            Organize your thoughts, notes, and knowledge with the power of artificial intelligence
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/signin')}
          >
            Get Started For Free
          </Button>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 px-6 md:px-10 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">The Problem We Solve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Information overload and knowledge fragmentation make it difficult to organize and retrieve what matters most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProblemCard 
              title="Information Overload"
              description="Too much content from multiple sources makes it hard to focus on what's important."
            />
            <ProblemCard 
              title="Knowledge Fragmentation"
              description="Notes scattered across different apps and platforms, making retrieval difficult."
            />
            <ProblemCard 
              title="Manual Organization"
              description="Time wasted on manual tagging, categorizing, and searching through notes."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-10">
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

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-10 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-12">
            <WorkflowStep 
              number={1}
              title="Create Notes"
              description="Write or import your notes using our Markdown editor"
            />
            <WorkflowStep 
              number={2}
              title="AI Processing"
              description="Our AI analyzes and categorizes your content"
            />
            <WorkflowStep 
              number={3}
              title="Knowledge Organization"
              description="Your notes are automatically organized by topics"
            />
            <WorkflowStep 
              number={4}
              title="Learn & Review"
              description="Use flashcards and spaced repetition to retain knowledge"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="NOTEIT has completely transformed how I study for my medical exams. The AI categorization is spot on!"
              name="Sarah L."
              role="Medical Student"
              rating={5}
            />
            <TestimonialCard 
              quote="As a researcher, I need to organize tons of papers and notes. This tool has saved me countless hours."
              name="Dr. Tomas R."
              role="Research Scientist"
              rating={5}
            />
            <TestimonialCard 
              quote="The flashcard feature automatically generated from my notes is a game-changer for language learning."
              name="Alex K."
              role="Language Enthusiast"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 bg-primary/10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge Management?</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Join thousands of students, researchers, and professionals who have enhanced their learning with NOTEIT.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="text-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/signin')}
              className="text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">NOTEIT</h3>
              <p className="text-muted-foreground">
                AI-powered note-taking and knowledge management for the modern learner.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Smart Notes</li>
                <li>AI Categorization</li>
                <li>Flashcards</li>
                <li>Document Processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Blog</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>© 2025 NOTEIT. All rights reserved.</p>
          </div>
        </div>
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
    <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-300">
      <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const ProblemCard = ({ 
  title, 
  description 
}: { 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const WorkflowStep = ({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <div className="hidden md:block w-full h-1 bg-primary/30 relative">
        {number < 4 && (
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
            <ArrowRight className="text-primary" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ 
  quote, 
  name, 
  role, 
  rating 
}: { 
  quote: string; 
  name: string; 
  role: string;
  rating: number;
}) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-300">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} className="text-primary fill-primary" />
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <Star key={i + rating} size={16} className="text-muted" />
        ))}
      </div>
      <p className="italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default Landing;
