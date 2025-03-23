
import React from 'react';
import { Layout } from '@/components/Layout';
import { NoteCard, Note } from '@/components/NoteCard';
import { FlashcardView, Flashcard } from '@/components/FlashcardView';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, Upload, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Mock data
  const recentNotes: Note[] = [
    {
      id: '1',
      title: 'Introduction to AI Knowledge Management',
      content: 'AI-powered knowledge management systems can help organize and retrieve information more efficiently. These systems use natural language processing and machine learning algorithms to categorize and connect related information.',
      tags: ['AI', 'Knowledge Management'],
      createdAt: new Date().toISOString(),
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Effective Note-Taking Strategies',
      content: 'Research shows that effective note-taking involves active engagement with the material, not just passive recording. This includes summarizing concepts in your own words, asking questions, and making connections to existing knowledge.',
      tags: ['Productivity', 'Learning'],
      createdAt: new Date().toISOString(),
      category: 'Productivity'
    }
  ];
  
  const featuredFlashcards: Flashcard[] = [
    {
      id: 'f1',
      question: 'What are the key benefits of AI-powered knowledge management?',
      answer: 'Automated organization, improved retrieval, content summarization, and enhanced connections between related information.',
      category: 'Technology'
    }
  ];
  
  const stats = [
    { label: 'Total Notes', value: 24, icon: FileText },
    { label: 'Flashcards', value: 86, icon: BookOpen },
    { label: 'Uploaded Files', value: 12, icon: Upload },
    { label: 'Categories', value: 8, icon: BarChart }
  ];

  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome to ThoughtKeeper</h1>
          <p className="text-muted-foreground">
            Your AI-powered personal knowledge management system
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="glass-card p-4 rounded-lg flex items-center gap-4 animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Recent Notes</h2>
              <Button variant="ghost" onClick={() => navigate('/notes')}>
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentNotes.map((note) => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onClick={() => navigate('/notes')}
                />
              ))}
            </div>
            
            <div className="glass-card rounded-lg p-6 mt-4 flex items-center justify-between animate-fade-in">
              <div>
                <h3 className="text-lg font-medium">Ready to add new knowledge?</h3>
                <p className="text-sm text-muted-foreground">Upload documents or create new notes</p>
              </div>
              <Button onClick={() => navigate('/upload')}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Flashcards</h2>
              <Button variant="ghost" onClick={() => navigate('/flashcards')}>
                View All
              </Button>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <FlashcardView flashcards={featuredFlashcards} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
