
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FlashcardView, Flashcard } from '@/components/FlashcardView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Plus, BookMarked } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { categorizeText } from '@/utils/ai';

const Flashcards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data for flashcards
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: 'f1',
      question: 'What are the key benefits of AI-powered knowledge management?',
      answer: 'Automated organization, improved retrieval, content summarization, and enhanced connections between related information.',
      category: 'Technology'
    },
    {
      id: 'f2',
      question: 'What is spaced repetition?',
      answer: 'A learning technique that involves reviewing information at increasing intervals to leverage the psychological spacing effect for better long-term memory retention.',
      category: 'Learning'
    },
    {
      id: 'f3',
      question: 'How do adaptive learning systems work?',
      answer: 'They use AI to analyze student performance data and learning patterns to customize educational content based on individual needs, addressing specific strengths and weaknesses.',
      category: 'Education'
    }
  ]);
  
  const [newFlashcard, setNewFlashcard] = useState({
    question: '',
    answer: '',
    category: ''
  });
  const [isNewFlashcardDialogOpen, setIsNewFlashcardDialogOpen] = useState(false);
  
  const categories = Array.from(new Set(flashcards.map(card => card.category)));
  
  const filteredFlashcards = flashcards.filter(card => {
    const matchesSearch = searchQuery === '' || 
      card.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === null || card.category === categoryFilter;
    const matchesTab = activeTab === 'all' || (activeTab === 'mastered' ? true : true); // Placeholder for mastered logic
    
    return matchesSearch && matchesCategory && matchesTab;
  });
  
  const handleCreateFlashcard = () => {
    const category = newFlashcard.category || categorizeText(newFlashcard.question + ' ' + newFlashcard.answer);
    
    const createdFlashcard: Flashcard = {
      id: Date.now().toString(),
      question: newFlashcard.question,
      answer: newFlashcard.answer,
      category
    };
    
    setFlashcards(prev => [createdFlashcard, ...prev]);
    setNewFlashcard({ question: '', answer: '', category: '' });
    setIsNewFlashcardDialogOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Flashcards</h1>
            <p className="text-muted-foreground">Review and test your knowledge</p>
          </div>
          
          <Dialog open={isNewFlashcardDialogOpen} onOpenChange={setIsNewFlashcardDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Flashcard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Flashcard</DialogTitle>
                <DialogDescription>
                  Add a new flashcard to your collection. AI will help categorize it.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="question" className="text-sm font-medium">
                    Question
                  </label>
                  <Textarea
                    id="question"
                    value={newFlashcard.question}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                    placeholder="Enter flashcard question"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="answer" className="text-sm font-medium">
                    Answer
                  </label>
                  <Textarea
                    id="answer"
                    value={newFlashcard.answer}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                    placeholder="Enter flashcard answer"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category (optional)
                  </label>
                  <Select 
                    value={newFlashcard.category} 
                    onValueChange={(value) => setNewFlashcard({ ...newFlashcard, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select or let AI choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Let AI choose</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewFlashcardDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateFlashcard} 
                  disabled={!newFlashcard.question || !newFlashcard.answer}
                >
                  Create Flashcard
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search flashcards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter || ''} onValueChange={(value) => setCategoryFilter(value || null)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Flashcards</TabsTrigger>
            <TabsTrigger value="mastered">Mastered</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredFlashcards.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-lg animate-fade-in">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No flashcards found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || categoryFilter
                    ? "Try adjusting your filters"
                    : "Create your first flashcard to get started"}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setIsNewFlashcardDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Flashcard
                </Button>
              </div>
            ) : (
              <FlashcardView flashcards={filteredFlashcards} />
            )}
          </TabsContent>
          <TabsContent value="mastered" className="mt-6">
            <div className="text-center py-12 glass-card rounded-lg animate-fade-in">
              <BookMarked className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Mastery Tracking</h3>
              <p className="text-muted-foreground">
                Mastered flashcards will appear here as you learn
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {filteredFlashcards.slice(0, 3).map((card) => (
            <Card key={card.id} className="glass-card">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {card.category}
                  </span>
                </div>
                <CardTitle className="text-base line-clamp-2 mt-2">{card.question}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{card.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Flashcards;
