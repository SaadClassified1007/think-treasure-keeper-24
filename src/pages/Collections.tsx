
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FolderKanban, Plus, Search, FileText, BookOpen, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  notesCount: number;
  flashcardsCount: number;
  color: string;
}

const Collections = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [collections, setCollections] = React.useState<Collection[]>([
    {
      id: '1',
      name: 'AI Research',
      description: 'Collection of AI research papers and notes',
      itemCount: 12,
      notesCount: 8,
      flashcardsCount: 4,
      color: '#3b82f6'
    },
    {
      id: '2',
      name: 'Web Development',
      description: 'Notes and resources for web development',
      itemCount: 8,
      notesCount: 5,
      flashcardsCount: 3,
      color: '#10b981'
    },
    {
      id: '3',
      name: 'Study Materials',
      description: 'All my study materials and notes',
      itemCount: 15,
      notesCount: 10,
      flashcardsCount: 5,
      color: '#f59e0b'
    }
  ]);
  const [newCollection, setNewCollection] = React.useState({
    name: '',
    description: '',
    color: '#3b82f6'
  });
  
  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCollection = () => {
    if (newCollection.name.trim()) {
      setCollections([
        ...collections,
        {
          id: Date.now().toString(),
          name: newCollection.name,
          description: newCollection.description,
          itemCount: 0,
          notesCount: 0,
          flashcardsCount: 0,
          color: newCollection.color
        }
      ]);
      setNewCollection({ name: '', description: '', color: '#3b82f6' });
    }
  };
  
  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter(collection => collection.id !== id));
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Collections</h1>
            <p className="text-muted-foreground">Group related notes and flashcards together</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Collection</DialogTitle>
                <DialogDescription>
                  Create a new collection to group related content together.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    placeholder="Collection name"
                    value={newCollection.name}
                    onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Input
                    id="description"
                    placeholder="Brief description"
                    value={newCollection.description}
                    onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="color" className="text-sm font-medium">Color</label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="color"
                      type="color"
                      value={newCollection.color}
                      onChange={(e) => setNewCollection({ ...newCollection, color: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <div className="h-10 flex-1 rounded-md" style={{ backgroundColor: newCollection.color }}></div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCollection} disabled={!newCollection.name.trim()}>
                  Create Collection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden animate-scale-in">
              <div className="h-2" style={{ backgroundColor: collection.color }}></div>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FolderKanban size={16} style={{ color: collection.color }} />
                    {collection.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteCollection(collection.id)} className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  {collection.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText size={14} />
                    <span>{collection.notesCount} Notes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>{collection.flashcardsCount} Flashcards</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-2 flex justify-end">
                <Button variant="outline" size="sm">
                  View Collection
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Collections;
