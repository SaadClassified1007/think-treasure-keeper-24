
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { NoteCard, Note } from '@/components/NoteCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, FileText } from 'lucide-react';
import { categorizeText } from '@/utils/ai';
import { useToast } from '@/components/ui/use-toast';
import NoteEditor from '@/components/NoteEditor';

const Notes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Introduction to AI Knowledge Management',
      content: 'AI-powered knowledge management systems can help organize and retrieve information more efficiently. These systems use natural language processing and machine learning algorithms to categorize and connect related information.\n\nKey benefits include:\n- Automated tagging and categorization\n- Improved search and discovery\n- Content summarization\n- Relationship mapping between pieces of information\n- Personalized content delivery based on user interests\n\nImplementing an effective AI-powered knowledge management system requires careful attention to data quality, algorithm selection, and user experience design.',
      createdAt: new Date().toISOString(),
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Effective Note-Taking Strategies',
      content: 'Research shows that effective note-taking involves active engagement with the material, not just passive recording. This includes summarizing concepts in your own words, asking questions, and making connections to existing knowledge.\n\nRecommended techniques:\n1. Cornell Method: Divide your page into sections for notes, cues, and summary\n2. Mind Mapping: Create visual connections between ideas\n3. Outlining: Organize information hierarchically\n4. Charting: Use tables to compare and contrast concepts\n5. Sentence Method: Write complete sentences for each point\n\nDigital tools like NOTEIT can enhance these methods with features like tagging, search, and integration with other resources.',
      createdAt: new Date().toISOString(),
      category: 'Productivity'
    },
    {
      id: '3',
      title: 'The Science of Memory and Learning',
      content: 'Spaced repetition is a learning technique that involves reviewing information at increasing intervals. This approach leverages the psychological spacing effect, which demonstrates that information is more effectively stored in long-term memory when it\'s studied multiple times over spaced intervals.\n\nThe forgetting curve, first described by Hermann Ebbinghaus, shows how information is lost over time when there is no attempt to retain it. The curve is steep, with significant information loss occurring within the first few days after learning.\n\nMemory consolidation occurs during sleep, making adequate rest essential for effective learning. During deep sleep, the brain processes and strengthens neural connections formed during waking hours.\n\nFlashcards are particularly effective for learning because they utilize active recall, which strengthens memory pathways more effectively than passive review methods like rereading.',
      createdAt: new Date().toISOString(),
      category: 'Science'
    },
    {
      id: '4',
      title: 'Advanced AI Concepts in Education',
      content: 'Adaptive learning systems use AI to customize educational content based on individual student needs. These systems analyze performance data and learning patterns to deliver personalized learning experiences that address specific strengths and weaknesses.\n\nNatural Language Processing (NLP) enables educational platforms to understand and respond to student questions, provide feedback on written assignments, and generate summaries of complex texts.\n\nKnowledge graphs can represent relationships between concepts, helping students understand how ideas connect across different subjects and domains.\n\nPredictive analytics can identify students at risk of falling behind, allowing for early intervention and support.\n\nAI-powered assessment tools can evaluate not just factual knowledge but also higher-order thinking skills like critical analysis, problem-solving, and creativity.',
      createdAt: new Date().toISOString(),
      category: 'Technology'
    }
  ]);
  
  const categories = Array.from(new Set(notes.map(note => note.category)));
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || note.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleCreateNote = (title: string, content: string, attachedFiles: File[]) => {
    // In a real app, we'd also handle file uploads to a storage service
    const category = categorizeText(content);
    
    const createdNote: Note = {
      id: Date.now().toString(),
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
      category
    };
    
    setNotes(prev => [createdNote, ...prev]);
    setIsCreatingNote(false);
    
    toast({
      title: "Note created",
      description: "Your new note has been created successfully.",
    });
  };
  
  const handleNoteClick = (id: string) => {
    navigate(`/notes/${id}`);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {isCreatingNote ? (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Create New Note</h1>
              <Button 
                variant="ghost" 
                onClick={() => setIsCreatingNote(false)}
              >
                Cancel
              </Button>
            </div>
            
            <NoteEditor 
              onSave={handleCreateNote}
              onCancel={() => setIsCreatingNote(false)}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
                <p className="text-muted-foreground">Manage and organize your knowledge</p>
              </div>
              
              <Button onClick={() => setIsCreatingNote(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
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
            
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-lg animate-fade-in">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No notes found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || categoryFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first note to get started"}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setIsCreatingNote(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Note
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <NoteCard 
                    key={note.id} 
                    note={note}
                    onClick={() => handleNoteClick(note.id)}
                    className="h-full"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Notes;
