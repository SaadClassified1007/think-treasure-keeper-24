import React from 'react';
import { Layout } from '@/components/Layout';
import { NoteCard, Note } from '@/components/NoteCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderKanban, Tag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data
  const recentNotes: Note[] = [
    {
      id: '1',
      title: 'Introduction to AI Knowledge Management',
      content: 'AI-powered knowledge management systems can help organize and retrieve information more efficiently. These systems use natural language processing and machine learning algorithms to categorize and connect related information.',
      createdAt: new Date().toISOString(),
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Effective Note-Taking Strategies',
      content: 'Research shows that effective note-taking involves active engagement with the material, not just passive recording. This includes summarizing concepts in your own words, asking questions, and making connections to existing knowledge.',
      createdAt: new Date().toISOString(),
      category: 'Productivity'
    }
  ];
  
  const stats = [
    { label: 'Total Notes', value: 24, icon: FileText },
    { label: 'Categories', value: 8, icon: Tag },
    { label: 'Collections', value: 4, icon: FolderKanban }
  ];

  const recentActivity = [
    { type: 'note', action: 'created', title: 'Advanced AI Concepts in Education', time: '2 hours ago' },
    { type: 'category', action: 'added', title: 'Education', time: '1 day ago' },
    { type: 'file', action: 'uploaded', title: 'Research-Paper-AI.pdf', time: '2 days ago' },
  ];

  const handleNoteClick = (id: string) => {
    navigate(`/notes/${id}`);
  };

  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to NOTEIT, your AI-powered knowledge management system
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
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-4">
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
                  onClick={() => handleNoteClick(note.id)}
                />
              ))}
            </div>
            
            <Card className="mt-4 animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {activity.type === 'note' && <FileText size={16} className="text-blue-500" />}
                        {activity.type === 'category' && <Tag size={16} className="text-yellow-500" />}
                        {activity.type === 'file' && <Upload size={16} className="text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          You {activity.action} {activity.type === 'category' ? 'a new' : 'the'} {activity.type} <span className="font-medium">{activity.title}</span>
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock size={12} className="mr-1" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-4 space-y-4">
            <Card className="animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common tasks you might want to do</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/notes')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Create a new note
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/flashcards')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Add flashcards
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/upload')}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/categories')}>
                    <Tag className="mr-2 h-4 w-4" />
                    Manage categories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
