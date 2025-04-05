import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  mastered: boolean;
}

const Flashcards = () => {
  // Mock data with mastered property
  const flashcards: Flashcard[] = [
    {
      id: '1',
      front: 'What is spaced repetition?',
      back: 'A learning technique that involves reviewing information at increasing intervals.',
      category: 'Learning',
      mastered: false
    },
    {
      id: '2',
      front: 'What is the Forgetting Curve?',
      back: 'A graph showing how information is lost over time when there is no attempt to retain it.',
      category: 'Learning',
      mastered: true
    },
    {
      id: '3',
      front: 'What is a Knowledge Graph?',
      back: 'A representation of relationships between concepts, helping students understand how ideas connect across different subjects.',
      category: 'Technology',
      mastered: false
    },
    {
      id: '4',
      front: 'What is AI-powered knowledge management?',
      back: 'Systems that use natural language processing and machine learning to organize and retrieve information efficiently.',
      category: 'Technology',
      mastered: false
    }
  ];

  const categories = Array.from(new Set(flashcards.map(card => card.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const { toast } = useToast();

  const filteredCards = flashcards.filter(card => card.category === selectedCategory);
  const masteredCount = filteredCards.filter(card => card.mastered).length;
  const progressPercentage = filteredCards.length > 0 ? (masteredCount / filteredCards.length) * 100 : 0;

  const handleNextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
      setIsFlipped(false);
    } else {
      // Restart from the beginning
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1);
      setIsFlipped(false);
    } else {
      // Go to the last card
      setCurrentCardIndex(filteredCards.length - 1);
      setIsFlipped(false);
    }
  };

  const toggleMastered = (cardId: string) => {
    // In a real app, this would update in a database
    toast({
      title: "Status updated",
      description: "Flashcard mastery status has been updated.",
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Flashcards</h1>
          <Button className="glass-panel hover-btn">
            <Plus className="mr-2 h-4 w-4" /> Create Flashcard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Categories Sidebar */}
          <div className="md:col-span-3 space-y-4">
            <Card className="glass-card overflow-hidden border-none bg-card/30 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {categories.map(category => (
                    <Button 
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start text-left font-medium"
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentCardIndex(0);
                        setIsFlipped(false);
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="glass-card overflow-hidden border-none bg-card/30 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mastered</span>
                    <span>{masteredCount}/{filteredCards.length}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flashcard Display */}
          <div className="md:col-span-9">
            {filteredCards.length > 0 ? (
              <div className="flex flex-col items-center">
                <div className="w-full perspective-1000 mb-6">
                  <motion.div 
                    className="w-full h-64 md:h-80 cursor-pointer"
                    onClick={() => setIsFlipped(!isFlipped)}
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className={`absolute w-full h-full glass-card overflow-hidden border-none bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-lg ${isFlipped ? 'backface-hidden' : ''}`}>
                      <CardContent className="flex items-center justify-center h-full p-8">
                        <div className="flex flex-col items-center justify-center text-center">
                          <BookOpen className="h-8 w-8 mb-4 text-primary/60" />
                          <p className="text-xl font-medium">{filteredCards[currentCardIndex]?.front}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`absolute w-full h-full glass-card overflow-hidden border-none bg-gradient-to-br from-primary/5 to-card/40 backdrop-blur-lg ${!isFlipped ? 'backface-hidden' : ''}`}
                         style={{ transform: "rotateY(180deg)" }}>
                      <CardContent className="flex items-center justify-center h-full p-8">
                        <div className="flex flex-col items-center justify-center text-center">
                          <p className="text-lg">{filteredCards[currentCardIndex]?.back}</p>
                          <Button 
                            variant={filteredCards[currentCardIndex]?.mastered ? "default" : "outline"} 
                            size="sm" 
                            className="mt-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMastered(filteredCards[currentCardIndex]?.id);
                            }}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            {filteredCards[currentCardIndex]?.mastered ? "Mastered" : "Mark as Mastered"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div className="flex justify-between w-full max-w-3xl">
                  <Button variant="outline" onClick={handlePrevCard} className="hover-btn">
                    Previous
                  </Button>
                  <p className="self-center">
                    {currentCardIndex + 1} of {filteredCards.length}
                  </p>
                  <Button variant="outline" onClick={handleNextCard} className="hover-btn">
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="glass-card h-64 flex items-center justify-center">
                <CardContent className="text-center">
                  <CardTitle className="mb-4">No flashcards in this category</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Flashcard
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Flashcards;