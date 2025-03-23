
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FlashcardViewProps {
  flashcards: Flashcard[];
}

export const FlashcardView = ({ flashcards }: FlashcardViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<string[]>([]);

  const currentCard = flashcards[currentIndex];
  
  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
    }, 300);
  };
  
  const handlePrevious = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
    }, 300);
  };
  
  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };
  
  const toggleMastered = (id: string) => {
    setMastered((prev) => 
      prev.includes(id) 
        ? prev.filter((cardId) => cardId !== id) 
        : [...prev, id]
    );
  };

  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center h-64 glass-card rounded-xl p-8">
        <p className="text-lg text-muted-foreground">No flashcards available</p>
      </div>
    );
  }

  const isMastered = mastered.includes(currentCard.id);

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMastered(currentCard.id)}
          >
            {isMastered ? (
              <>
                <RotateCcw className="mr-1 h-4 w-4" />
                <span>Review Again</span>
              </>
            ) : (
              <>
                <CheckCircle className="mr-1 h-4 w-4" />
                <span>Mark as Mastered</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div 
        onClick={toggleFlip}
        className={cn(
          "relative cursor-pointer perspective-1000 group",
          "transition-all duration-500 ease-in-out transform-gpu",
          "min-h-[300px] w-full"
        )}
      >
        <Card 
          className={cn(
            "absolute backface-hidden w-full h-full p-8 flex flex-col items-center justify-center text-center",
            "transition-all duration-500 ease-in-out transform-gpu",
            isMastered ? "border-green-500/30" : "border-border",
            isFlipped ? "rotate-y-180 invisible" : "rotate-y-0 visible",
            "glass-card"
          )}
        >
          <div className="absolute top-4 left-4">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {currentCard.category}
            </span>
          </div>
          {isMastered && (
            <div className="absolute top-4 right-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          )}
          <div className="text-xl font-medium mb-4">{currentCard.question}</div>
          <p className="text-sm text-muted-foreground">Click to reveal answer</p>
        </Card>
        
        <Card 
          className={cn(
            "absolute backface-hidden w-full h-full p-8 flex flex-col items-center justify-center text-center",
            "transition-all duration-500 ease-in-out transform-gpu",
            isMastered ? "border-green-500/30" : "border-border",
            isFlipped ? "rotate-y-0 visible" : "rotate-y-180 invisible",
            "glass-card"
          )}
        >
          <div className="absolute top-4 left-4">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              Answer
            </span>
          </div>
          {isMastered && (
            <div className="absolute top-4 right-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          )}
          <div className="text-xl">{currentCard.answer}</div>
          <p className="text-sm text-muted-foreground mt-4">Click to see question</p>
        </Card>
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" onClick={handleNext}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
