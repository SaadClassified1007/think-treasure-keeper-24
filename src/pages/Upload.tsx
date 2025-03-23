
import React from 'react';
import { Layout } from '@/components/Layout';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, Upload as UploadIcon, Info } from 'lucide-react';

const Upload = () => {
  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Upload Files</h1>
          <p className="text-muted-foreground">
            Import documents and convert them to notes and flashcards
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <FileUpload />
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Supported File Types</CardTitle>
                <CardDescription>
                  ThoughtKeeper can process these formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-secondary">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Documents</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, TXT</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-secondary">
                    <BookOpen size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">E-Books</p>
                    <p className="text-xs text-muted-foreground">EPUB, MOBI</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-secondary">
                    <UploadIcon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Web Content</p>
                    <p className="text-xs text-muted-foreground">HTML, Markdown</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    1
                  </div>
                  <p className="text-sm">Upload your documents</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    2
                  </div>
                  <p className="text-sm">AI processes and extracts key information</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    3
                  </div>
                  <p className="text-sm">Content is organized into notes with proper categories</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    4
                  </div>
                  <p className="text-sm">Flashcards are automatically generated</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center justify-center gap-2 p-4 glass-card rounded-lg animate-fade-in">
              <Info size={16} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Files larger than 50MB may take longer to process
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
