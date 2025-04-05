
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { NoteCard, Note } from '@/components/NoteCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Tag, FileText } from 'lucide-react';
import { categorizeText, extractKeywords } from '@/utils/ai';

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Introduction to AI Knowledge Management',
      content: 'AI-powered knowledge management systems can help organize and retrieve information more efficiently. These systems use natural language processing and machine learning algorithms to categorize and connect related information.\n\nKey benefits include:\n- Automated tagging and categorization\n- Improved search and discovery\n- Content summarization\n- Relationship mapping between pieces of information\n- Personalized content delivery based on user interests\n\nImplementing an effective AI-powered knowledge management system requires careful attention to data quality, algorithm selection, and user experience design.',
      tags: ['AI', 'Knowledge Management'],
      createdAt: new Date().toISOString(),
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Effective Note-Taking Strategies',
      content: 'Research shows that effective note-taking involves active engagement with the material, not just passive recording. This includes summarizing concepts in your own words, asking questions, and making connections to existing knowledge.\n\nRecommended techniques:\n1. Cornell Method: Divide your page into sections for notes, cues, and summary\n2. Mind Mapping: Create visual connections between ideas\n3. Outlining: Organize information hierarchically\n4. Charting: Use tables to compare and contrast concepts\n5. Sentence Method: Write complete sentences for each point\n\nDigital tools like NOTEIT can enhance these methods with features like tagging, search, and integration with other resources.',
      tags: ['Productivity', 'Learning'],
      createdAt: new Date().toISOString(),
      category: 'Productivity'
    },
    {
      id: '3',
      title: 'The Science of Memory and Learning',
      content: 'Spaced repetition is a learning technique that involves reviewing information at increasing intervals. This approach leverages the psychological spacing effect, which demonstrates that information is more effectively stored in long-term memory when it\'s studied multiple times over spaced intervals.\n\nThe forgetting curve, first described by Hermann Ebbinghaus, shows how information is lost over time when there is no attempt to retain it. The curve is steep, with significant information loss occurring within the first few days after learning.\n\nMemory consolidation occurs during sleep, making adequate rest essential for effective learning. During deep sleep, the brain processes and strengthens neural connections formed during waking hours.\n\nFlashcards are particularly effective for learning because they utilize active recall, which strengthens memory pathways more effectively than passive review methods like rereading.',
      tags: ['Learning', 'Memory', 'Science'],
      createdAt: new Date().toISOString(),
      category: 'Science'
    },
    {
      id: '4',
      title: 'Advanced AI Concepts in Education',
      content: 'Adaptive learning systems use AI to customize educational content based on individual student needs. These systems analyze performance data and learning patterns to deliver personalized learning experiences that address specific strengths and weaknesses.\n\nNatural Language Processing (NLP) enables educational platforms to understand and respond to student questions, provide feedback on written assignments, and generate summaries of complex texts.\n\nKnowledge graphs can represent relationships between concepts, helping students understand how ideas connect across different subjects and domains.\n\nPredictive analytics can identify students at risk of falling behind, allowing for early intervention and support.\n\nAI-powered assessment tools can evaluate not just factual knowledge but also higher-order thinking skills like critical analysis, problem-solving, and creativity.',
      tags: ['AI', 'Education', 'Technology'],
      createdAt: new Date().toISOString(),
      category: 'Technology'
    }
  ]);
  
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);
  
  const categories = Array.from(new Set(notes.map(note => note.category)));
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === null || note.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleCreateNote = () => {
    const tagArray = newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const category = categorizeText(newNote.content);
    
    const createdNote: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: tagArray,
      createdAt: new Date().toISOString(),
      category
    };
    
    setNotes(prev => [createdNote, ...prev]);
    setNewNote({ title: '', content: '', tags: '' });
    setIsNewNoteDialogOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
            <p className="text-muted-foreground">Manage and organize your knowledge</p>
          </div>
          
          <Dialog open={isNewNoteDialogOpen} onOpenChange={setIsNewNoteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
                <DialogDescription>
                  Add a new note to your knowledge base. AI will automatically categorize it.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Enter note title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Enter note content"
                    rows={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags (comma separated)
                  </label>
                  <Input
                    id="tags"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                    placeholder="e.g. AI, Learning, Technology"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewNoteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNote} disabled={!newNote.title || !newNote.content}>
                  Create Note
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
          <Select value={categoryFilter || ''} onValueChange={(value) => setCategoryFilter(value || null)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="x">All Categories</SelectItem>
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
              {searchQuery || categoryFilter
                ? "Try adjusting your filters"
                : "Create your first note to get started"}
            </p>
            <Button
              className="mt-4"
              onClick={() => setIsNewNoteDialogOpen(true)}
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
                className="h-full"
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notes;
