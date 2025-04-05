
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

const Flashcards = () => {
  // Mock data for demonstration
  const flashcards: Flashcard[] = [
    {
      id: '1',
      front: 'What is spaced repetition?',
      back: 'A learning technique that involves reviewing information at increasing intervals.',
      category: 'Learning'
    },
    {
      id: '2',
      front: 'What is the Forgetting Curve?',
      back: 'A graph showing how information is lost over time when there is no attempt to retain it.',
      category: 'Learning'
    },
    {
      id: '3',
      front: 'What is a Knowledge Graph?',
      back: 'A representation of relationships between concepts, helping students understand how ideas connect across different subjects.',
      category: 'Technology'
    },
    {
      id: '4',
      front: 'What is AI-powered knowledge management?',
      back: 'Systems that use natural language processing and machine learning to organize and retrieve information efficiently.',
      category: 'Technology'
    }
  ];

  const categories = Array.from(new Set(flashcards.map(card => card.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const filteredCards = flashcards.filter(card => card.category === selectedCategory);

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

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Flashcards</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Flashcard
          </Button>
        </div>

        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            {categories.map(category => (
              <TabsTrigger 
                key={category}
                value={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="w-full">
              {filteredCards.length > 0 ? (
                <div className="flex flex-col items-center">
                  <Card 
                    className="w-full max-w-3xl h-64 md:h-80 transition-all duration-500 cursor-pointer perspective-1000" 
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <CardContent className="flex items-center justify-center h-full p-6">
                      <div className={`w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                        <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-6 ${isFlipped ? 'hidden' : ''}`}>
                          <BookOpen className="h-8 w-8 mb-4 text-primary/60" />
                          <p className="text-xl text-center">{filteredCards[currentCardIndex]?.front}</p>
                        </div>
                        <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-6 rotate-y-180 ${isFlipped ? '' : 'hidden'}`}>
                          <p className="text-lg text-center">{filteredCards[currentCardIndex]?.back}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between w-full max-w-3xl mt-6">
                    <Button variant="outline" onClick={handlePrevCard}>
                      Previous
                    </Button>
                    <p className="self-center">
                      {currentCardIndex + 1} of {filteredCards.length}
                    </p>
                    <Button variant="outline" onClick={handleNextCard}>
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-center">No flashcards in this category</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Flashcard
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Flashcards;
