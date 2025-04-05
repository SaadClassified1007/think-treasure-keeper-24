import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Trash2, ArrowLeft, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useToast } from '@/components/ui/use-toast';
import { Note } from '@/components/NoteCard';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import NoteEditor from '@/components/NoteEditor';

const NoteView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [note, setNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Mock data for demonstration
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'Introduction to AI Knowledge Management',
      content: 'AI-powered knowledge management systems can help organize and retrieve information more efficiently. These systems use natural language processing and machine learning algorithms to categorize and connect related information.\n\n## Key benefits include:\n- Automated tagging and categorization\n- Improved search and discovery\n- Content summarization\n- Relationship mapping between pieces of information\n- Personalized content delivery based on user interests\n\nImplementing an effective AI-powered knowledge management system requires careful attention to data quality, algorithm selection, and user experience design.',
      tags: ['AI', 'Knowledge Management'],
      createdAt: new Date().toISOString(),
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Effective Note-Taking Strategies',
      content: 'Research shows that effective note-taking involves active engagement with the material, not just passive recording. This includes summarizing concepts in your own words, asking questions, and making connections to existing knowledge.\n\n## Recommended techniques:\n1. Cornell Method: Divide your page into sections for notes, cues, and summary\n2. Mind Mapping: Create visual connections between ideas\n3. Outlining: Organize information hierarchically\n4. Charting: Use tables to compare and contrast concepts\n5. Sentence Method: Write complete sentences for each point\n\nDigital tools like NOTEIT can enhance these methods with features like tagging, search, and integration with other resources.',
      tags: ['Productivity', 'Learning'],
      createdAt: new Date().toISOString(),
      category: 'Productivity'
    },
    {
      id: '3',
      title: 'The Science of Memory and Learning',
      content: '# Memory Formation\n\nSpaced repetition is a learning technique that involves reviewing information at increasing intervals. This approach leverages the psychological spacing effect, which demonstrates that information is more effectively stored in long-term memory when it\'s studied multiple times over spaced intervals.\n\n## The Forgetting Curve\n\nThe forgetting curve, first described by Hermann Ebbinghaus, shows how information is lost over time when there is no attempt to retain it. The curve is steep, with significant information loss occurring within the first few days after learning.\n\n## Sleep and Memory\n\nMemory consolidation occurs during sleep, making adequate rest essential for effective learning. During deep sleep, the brain processes and strengthens neural connections formed during waking hours.\n\n## Active Recall\n\nFlashcards are particularly effective for learning because they utilize active recall, which strengthens memory pathways more effectively than passive review methods like rereading.',
      tags: ['Learning', 'Memory', 'Science'],
      createdAt: new Date().toISOString(),
      category: 'Science'
    },
    {
      id: '4',
      title: 'Advanced AI Concepts in Education',
      content: '# AI in Education\n\n## Adaptive Learning\n\nAdaptive learning systems use AI to customize educational content based on individual student needs. These systems analyze performance data and learning patterns to deliver personalized learning experiences that address specific strengths and weaknesses.\n\n## Natural Language Processing\n\nNatural Language Processing (NLP) enables educational platforms to understand and respond to student questions, provide feedback on written assignments, and generate summaries of complex texts.\n\n## Knowledge Representation\n\nKnowledge graphs can represent relationships between concepts, helping students understand how ideas connect across different subjects and domains.\n\n## Predictive Analytics\n\nPredictive analytics can identify students at risk of falling behind, allowing for early intervention and support.\n\n## Assessment Innovation\n\nAI-powered assessment tools can evaluate not just factual knowledge but also higher-order thinking skills like critical analysis, problem-solving, and creativity.',
      tags: ['AI', 'Education', 'Technology'],
      createdAt: new Date().toISOString(),
      category: 'Technology'
    }
  ];

  useEffect(() => {
    if (id) {
      // In a real app, this would fetch data from an API or database
      const foundNote = mockNotes.find(n => n.id === id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        navigate('/notes');
        toast({
          title: "Note not found",
          description: "The note you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
    }
  }, [id, navigate, toast]);

  const handleSaveEdit = (title: string, content: string, attachedFiles: File[]) => {
    if (note) {
      // In a real app, this would update the database and handle file uploads
      setNote({
        ...note,
        title: title,
        content: content
      });
      setIsEditing(false);
      toast({
        title: "Note updated",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleDelete = () => {
    // In a real app, this would delete from the database
    setIsDeleteDialogOpen(false);
    toast({
      title: "Note deleted",
      description: "The note has been removed.",
    });
    navigate('/notes');
  };

  if (!note) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading note...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/notes')}
              className="mr-4"
              size="sm"
            >
              <ArrowLeft size={18} />
              <span className="ml-2">Back</span>
            </Button>
            <Badge variant="outline" className="bg-primary/5 text-xs font-normal">
              {note.category}
            </Badge>
            <span className="ml-4 text-xs text-muted-foreground flex items-center">
              <Clock size={14} className="mr-1" />
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>

          {!isEditing && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                size="sm"
              >
                <Edit2 size={16} className="mr-2" />
                Edit
              </Button>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your note.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {isEditing ? (
          <NoteEditor 
            initialTitle={note.title}
            initialContent={note.content}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
            isEditing={true}
          />
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-6">{note.title}</h1>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default NoteView;
