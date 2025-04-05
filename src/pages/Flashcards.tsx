import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FlashcardView, Flashcard } from '@/components/FlashcardView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Flashcards = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Changed from null to "all"
  
  const categorizedFlashcards = {
    'Technology': [
      {
        id: 'tech1',
        question: 'What are the key benefits of AI-powered knowledge management?',
        answer: 'Automated organization, improved retrieval, content summarization, and enhanced connections between related information.',
        category: 'Technology'
      },
      {
        id: 'tech2',
        question: 'What is natural language processing?',
        answer: 'A branch of AI that enables computers to understand, interpret, and generate human language in a valuable way.',
        category: 'Technology'
      },
      {
        id: 'tech3',
        question: 'What are knowledge graphs?',
        answer: 'A knowledge graph is a network of entities, their semantic types, properties, and relationships between entities.',
        category: 'Technology'
      }
    ],
    'Science': [
      {
        id: 'sci1',
        question: 'What is spaced repetition?',
        answer: 'A learning technique that involves reviewing information at increasing intervals to improve long-term retention.',
        category: 'Science'
      },
      {
        id: 'sci2',
        question: 'Who described the forgetting curve?',
        answer: 'Hermann Ebbinghaus, who demonstrated how information is lost over time when there is no attempt to retain it.',
        category: 'Science'
      }
    ],
    'Productivity': [
      {
        id: 'prod1',
        question: 'What is the Cornell note-taking method?',
        answer: 'A system for taking and organizing notes by dividing the page into sections for notes, cues, and summary.',
        category: 'Productivity'
      },
      {
        id: 'prod2',
        question: 'What is active recall?',
        answer: 'A learning principle that involves actively stimulating memory during the learning process, rather than passively reviewing material.',
        category: 'Productivity'
      }
    ]
  };
  
  const categories = Object.keys(categorizedFlashcards);
  
  const [newFlashcard, setNewFlashcard] = useState({
    question: '',
    answer: '',
    category: categories[0]
  });
  
  // Filter flashcards by search query and category
  const filteredFlashcards = Object.entries(categorizedFlashcards)
    .filter(([category]) => selectedCategory === "all" || category === selectedCategory)
    .map(([category, cards]) => ({
      category,
      cards: cards.filter(card => 
        searchQuery === '' || 
        card.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(group => group.cards.length > 0);
    
  const allFlashcards = Object.values(categorizedFlashcards).flat();
  
  const handleCreateFlashcard = () => {
    // In a real app, this would add to the state
    console.log('Created flashcard:', newFlashcard);
    toast({
      title: "Flashcard created",
      description: "Your new flashcard has been created successfully."
    });
    setNewFlashcard({
      question: '',
      answer: '',
      category: categories[0]
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Flashcards</h1>
            <p className="text-muted-foreground">Review and reinforce your knowledge</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Flashcard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Flashcard</DialogTitle>
                <DialogDescription>
                  Add a new flashcard to your study collection.
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
                    placeholder="Enter question"
                    rows={2}
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
                    placeholder="Enter answer"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select 
                    value={newFlashcard.category} 
                    onValueChange={(value) => setNewFlashcard({ ...newFlashcard, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleCreateFlashcard} disabled={!newFlashcard.question || !newFlashcard.answer}>
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
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="all">All Flashcards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="space-y-6">
            {filteredFlashcards.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-lg animate-fade-in">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No flashcards found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first flashcard to get started"}
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Flashcard
                </Button>
              </div>
            ) : (
              <>
                {filteredFlashcards.map(({ category, cards }) => (
                  <Card key={category} className="overflow-hidden animate-scale-in">
                    <CardHeader>
                      <CardTitle>{category}</CardTitle>
                      <CardDescription>{cards.length} flashcards</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FlashcardView flashcards={cards} />
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Flashcards</CardTitle>
                <CardDescription>Review all your flashcards at once</CardDescription>
              </CardHeader>
              <CardContent>
                {searchQuery || selectedCategory !== "all" ? (
                  <FlashcardView flashcards={allFlashcards.filter(card => 
                    (selectedCategory === "all" || card.category === selectedCategory) &&
                    (searchQuery === '' || 
                    card.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    card.answer.toLowerCase().includes(searchQuery.toLowerCase()))
                  )} />
                ) : (
                  <FlashcardView flashcards={allFlashcards} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Flashcards;
