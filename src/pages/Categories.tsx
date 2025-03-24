
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Tag, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const Categories = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categories, setCategories] = React.useState([
    { id: '1', name: 'Technology', color: '#3b82f6', noteCount: 8, flashcardCount: 12 },
    { id: '2', name: 'Science', color: '#10b981', noteCount: 5, flashcardCount: 7 },
    { id: '3', name: 'Productivity', color: '#f59e0b', noteCount: 4, flashcardCount: 6 },
    { id: '4', name: 'Personal', color: '#ef4444', noteCount: 3, flashcardCount: 0 },
    { id: '5', name: 'Education', color: '#8b5cf6', noteCount: 7, flashcardCount: 15 }
  ]);
  const [newCategory, setNewCategory] = React.useState({ name: '', color: '#3b82f6' });
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategory.name,
          color: newCategory.color,
          noteCount: 0,
          flashcardCount: 0
        }
      ]);
      setNewCategory({ name: '', color: '#3b82f6' });
    }
  };
  
  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">Organize your notes and flashcards</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogDescription>
                  Add a new category to organize your notes and flashcards.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    placeholder="Category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="color" className="text-sm font-medium">Color</label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="color"
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <div className="h-10 flex-1 rounded-md" style={{ backgroundColor: newCategory.color }}></div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCategory} disabled={!newCategory.name.trim()}>
                  Create Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden animate-scale-in">
              <div className="h-2" style={{ backgroundColor: category.color }}></div>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Tag size={16} style={{ color: category.color }} />
                    {category.name}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <CardDescription>
                  {category.noteCount} notes, {category.flashcardCount} flashcards
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <Switch id={`auto-flashcards-${category.id}`} />
                      <label htmlFor={`auto-flashcards-${category.id}`} className="text-xs">
                        Auto-generate flashcards
                      </label>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
