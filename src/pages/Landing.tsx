import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Brain, 
  FileText, 
  Upload, 
  Grid3X3, 
  LineChart, 
  Layers, 
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const Landing = () => {
  const navigate = useNavigate();
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        duration: 0.5,
        left: mousePosition.x,
        top: mousePosition.y,
        ease: "power2.out",
      });
    }
  }, [mousePosition]);

  useEffect(() => {
    // Set loaded state to trigger initial animations
    setIsLoaded(true);
  
    // Hero section animation
    const heroTl = gsap.timeline({ delay: 0.5 });
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.animate-hero');
      if (heroElements.length > 0) {
        heroTl.fromTo(heroElements, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      }
    }
  
    if (ctaRef.current && ctaRef.current.children.length > 0) {
      heroTl.fromTo(ctaRef.current.children,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }
  
    // Setup section animations
    sectionRefs.current.forEach((section) => {
      if (section) {
        const sectionTitle = section.querySelector('.section-title');
        if (sectionTitle) {
          gsap.fromTo(sectionTitle, 
            { y: 30, opacity: 0 },
            { 
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
              },
              y: 0, opacity: 1, duration: 0.8, ease: "power2.out" 
            }
          );
        }
  
        const animateItems = section.querySelectorAll('.animate-item');
        if (animateItems.length > 0) {
          gsap.fromTo(animateItems,
            { y: 40, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
              },
              y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out"
            }
          );
        }
      }
    });
  
    // Cleanup function to avoid memory leaks
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Scroll to section function for navigation
  const scrollToSection = (sectionId: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 80 },
      ease: "power3.inOut"
    });
  };
  
  // Add refs to an array function
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Cursor effect */}
      <div ref={cursorRef} className="cursor-glow fixed pointer-events-none z-0" style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.05) 70%, transparent 100%)',
        transform: 'translate(-50%, -50%)',
      }} />
      
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-blue-500/20 rounded-full filter blur-lg opacity-30 animate-pulse" />
        <div className="absolute top-[40%] right-[5%] w-[40rem] h-[25rem] bg-purple-500/20 rounded-full filter blur-lg opacity-30 animate-pulse" style={{ animationDuration: '15s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[35rem] h-[25rem] bg-teal-500/20 rounded-full filter blur-lg opacity-20 animate-pulse" style={{ animationDuration: '20s' }} />
      </div>

      {/* Navbar */}
      <header className="border-b border-border/40 py-4 px-6 flex items-center justify-between bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight font-sans">NOTEIT</h1>
        </div>
        <div className="hidden md:flex items-center gap-8 font-sans">
          <button onClick={() => scrollToSection('features')} className="text-foreground/80 hover:text-primary transition-colors">Features</button>
          <button onClick={() => scrollToSection('howItWorks')} className="text-foreground/80 hover:text-primary transition-colors">How It Works</button>
          <button onClick={() => scrollToSection('solutions')} className="text-foreground/80 hover:text-primary transition-colors">Solutions</button>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button 
            variant="outline" 
            onClick={() => navigate('/signin')}
            className="font-sans"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/signup')}
            className="font-sans relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-10 max-w-6xl mx-auto mt-10 mb-20 relative">
        <div className="relative z-10 spotlight">
          <h1 className="animate-hero text-4xl md:text-6xl xl:text-7xl font-bold mb-6 font-sans leading-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            AI-Powered Notes, Flashcards <br className="hidden md:block" /> & Knowledge That Grows With You
          </h1>
          <p className="animate-hero text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl font-sans text-center">
            NOTEIT is your personal AI for mastering what matters.
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none shadow-lg hover:shadow-blue-700/20 transition-all duration-300"
              onClick={() => navigate('/signup')}
            >
              Get Started For Free
            </Button>
            <Button
              variant="outline" 
              size="lg"
              className="text-lg group"
              onClick={() => scrollToSection('howItWorks')}
            >
              See How It Works
              <ArrowRight className="ml-2 h-7 w-7 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="mt-16 animate-hero glass-morphism p-5 rounded-xl flex justify-center items-center" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div className="w-full max-w-4xl aspect-[16/9] rounded-lg bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/30 flex items-center justify-center">
              <div className="p-6 glass-morphism rounded-xl flex items-center gap-4" style={{
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <Brain className="h-10 w-10 text-primary" />
                <div className="text-left">
                  <h3 className="text-xl font-semibold">AI-Powered Knowledge Management</h3>
                  <p className="text-muted-foreground">Transform your notes into actionable knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Solve Section */}
      <section ref={(el) => addToRefs(el)} id="solutions" className="py-24 px-6 md:px-10 glass-morphism my-10" style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-5xl font-bold mb-4">The Problems We Solve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
              NOTEIT transforms how you capture, organize, and retain knowledge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="glass-card p-8 rounded-2xl animate-item hover:shadow-xl hover:shadow-primary/5 transition duration-300 order-2 md:order-1" style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div className="space-y-6">
                <div className="flex items-start gap-4 animate-item">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Information Overload</h3>
                    <p className="text-muted-foreground">NOTEIT distills your content and files into concise, actionable notes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 animate-item">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Knowledge Fragmentation</h3>
                    <p className="text-muted-foreground">Centralize all your notes, references and knowledge in one seamless system</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 animate-item">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Passive Learning</h3>
                    <p className="text-muted-foreground">Transform passive reading into active knowledge with flashcards and spaced repetition</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 animate-item">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Manual Organization</h3>
                    <p className="text-muted-foreground">NOTEIT's AI automatically categorizes and connects your knowledge</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-full flex items-center justify-center order-1 md:order-2">
              <div className="glass-card p-6 rounded-2xl w-full max-w-lg animate-item" style={{
                background: 'rgba(255, 255, 255, 0.07)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/20 p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'rgba(147, 204, 255, 0.1)\' stroke-width=\'1\'%3E%3C/path%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'%3E%3C/rect%3E%3C/svg%3E")',
                  }}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <Brain className="h-24 w-24 mb-6 text-primary" />
                    <h3 className="text-2xl md:text-3xl font-bold font-sans text-center mb-4">AI Understands Your Content</h3>
                    <p className="text-center text-muted-foreground">
                      Our artificial intelligence analyzes your notes and documents, extracting key concepts and relationships to create a personalized knowledge graph.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-500/20 rounded-full filter blur-lg animate-pulse"></div>
              <div className="absolute -top-8 -left-8 w-60 h-60 bg-purple-500/20 rounded-full filter blur-lg animate-pulse" style={{ animationDuration: '15s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section ref={(el) => addToRefs(el)} id="features" className="py-24 px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-5xl font-bold mb-4 font-sans">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
              Everything you need to capture, organize, and master knowledge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={Brain}
              title="AI-Generated Notes"
              description="Let our AI transform documents and uploads into concise, organized notes"
              index={0}
            />
            <FeatureCard 
              icon={FileText}
              title="Smart Flashcards"
              description="Convert your notes into flashcards with spaced repetition for better retention"
              index={1}
            />
            <FeatureCard 
              icon={Grid3X3}
              title="Easy Categorization"
              description="Automatically organize your notes with AI-powered categorization"
              index={2}
            />
            <FeatureCard 
              icon={Layers}
              title="Bento Dashboard"
              description="View your knowledge system through an intuitive bento grid interface"
              index={3}
            />
            <FeatureCard 
              icon={LineChart}
              title="Progress Tracking"
              description="Track your learning progress and knowledge growth over time"
              index={4}
            />
            <FeatureCard 
              icon={Upload}
              title="Document Upload"
              description="Extract knowledge from PDFs and documents with AI processing"
              index={5}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={(el) => addToRefs(el)} id="howItWorks" className="py-24 px-6 md:px-10 glass-morphism" style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-5xl font-bold mb-4 font-sans">How NOTEIT Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
              Transform how you capture and retain knowledge in just four simple steps
            </p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/30 via-purple-500/40 to-indigo-500/30 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <WorkflowStep 
                number={1}
                title="Add Notes or Upload"
                description="Write notes or upload documents to your knowledge base"
              />
              <WorkflowStep 
                number={2}
                title="AI Processing"
                description="Our AI analyzes and organizes your content"
              />
              <WorkflowStep 
                number={3}
                title="Create Flashcards"
                description="Transform your notes into effective learning tools"
              />
              <WorkflowStep 
                number={4}
                title="Master Knowledge"
                description="Track progress and reinforce your learning"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section ref={(el) => addToRefs(el)} className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-5xl font-bold mb-4 font-sans">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
              Join thousands of students and professionals who've transformed their learning
            </p>
          </div>
          
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
              quote="The organization features have made a huge difference in how I manage my research notes."
              name="Alex K."
              role="PhD Student"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={(el) => addToRefs(el)} className="py-20 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/40"></div>
        <div className="absolute inset-0" style={{
          background: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMWEiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iI2ZmZmZmZjBhIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+")',
          opacity: 0.2,
        }}></div>
        
        <div className="max-w-5xl mx-auto relative z-10 glass-panel p-12 rounded-2xl border border-white/10 shadow-2xl" style={{
          background: 'rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans">Ready to Learn Smarter?</h2>
            <p className="text-lg md:text-xl font-sans text-muted-foreground mb-8">
              Join thousands of students, researchers, and professionals who have enhanced their learning with NOTEIT.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none shadow-lg hover:shadow-blue-700/20 transition-all duration-300"
              >
                Start Using NOTEIT Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">No credit card needed · Start in 60 seconds</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-primary/10 p-2 rounded-full">
                <Check size={18} className="text-primary" />
              </div>
              <p className="text-sm">Free starter account</p>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-primary/10 p-2 rounded-full">
                <Check size={18} className="text-primary" />
              </div>
              <p className="text-sm">AI-powered organization</p>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-primary/10 p-2 rounded-full">
                <Check size={18} className="text-primary" />
              </div>
              <p className="text-sm">Smart flashcard system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <h3 className="text-2xl font-semibold mb-4 font-sans">NOTEIT</h3>
              <p className="text-muted-foreground">
                AI-powered note-taking and knowledge management for the modern learner.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 font-sans">Features</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors">Smart Notes</li>
                <li className="hover:text-foreground transition-colors">AI Categorization</li>
                <li className="hover:text-foreground transition-colors">Flashcards</li>
                <li className="hover:text-foreground transition-colors">Document Processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 font-sans">Resources</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors">Help Center</li>
                <li className="hover:text-foreground transition-colors">Documentation</li>
                <li className="hover:text-foreground transition-colors">API</li>
                <li className="hover:text-foreground transition-colors">Community</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 font-sans">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors">About Us</li>
                <li className="hover:text-foreground transition-colors">Blog</li>
                <li className="hover:text-foreground transition-colors">Privacy Policy</li>
                <li className="hover:text-foreground transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} NOTEIT. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="cursor-pointer hover:text-foreground transition-colors">Twitter</span>
              <span className="cursor-pointer hover:text-foreground transition-colors">GitHub</span>
              <span className="cursor-pointer hover:text-foreground transition-colors">Discord</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};



const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  index
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  index: number;
}) => {
  return (
    <div className="animate-item group glass-card rounded-xl p-6 border border-border/40 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg transition-all duration-500"
         style={{ transitionDelay: `${index * 50}ms` }}>
      <div className="flex flex-col h-full">
        <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors duration-300">
          <Icon size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2 font-space">{title}</h3>
        <p className="text-muted-foreground font-jakarta">{description}</p>
        
        <div className="mt-auto pt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span>Learn more</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

// Workflow Step Component
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
    <div className="animate-item flex flex-col items-center text-center relative">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-blue-500/20 z-10">
        {number}
      </div>
      <h3 className="text-xl font-semibold mt-2 mb-2 font-space">{title}</h3>
      <p className="text-muted-foreground font-jakarta">{description}</p>
    </div>
  );
};

// Testimonial Card Component
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
    <div className="animate-item glass-card p-6 rounded-xl border border-border/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} className="text-primary fill-primary" />
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <Star key={i + rating} size={16} className="text-muted" />
        ))}
      </div>
      <p className="italic mb-6 font-jakarta">"{quote}"</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default Landing;
