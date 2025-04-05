
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUpload } from '@/components/FileUpload';
import { Card, CardContent } from '@/components/ui/card';
import { Save, Eye, Edit2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NoteEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string, attachedFiles: File[]) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  initialTitle = '',
  initialContent = '',
  onSave,
  onCancel,
  isEditing = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    onSave(title, content, attachedFiles);
  };

  const handleFilesUploaded = (files: File[]) => {
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const insertFileReference = (file: File) => {
    // Check if it's an image file
    const isImage = file.type.startsWith('image/');
    
    // Insert markdown for the file at cursor position
    const insertion = isImage
      ? `\n![${file.name}](${URL.createObjectURL(file)})\n`
      : `\n[${file.name}](${file.name})\n`;
    
    setContent(prev => prev + insertion);
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Input
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-medium h-12"
          />

          <div className="flex items-center justify-between my-4">
            <div className="flex space-x-2">
              <Button
                variant={previewMode === 'edit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('edit')}
                className="flex items-center"
              >
                <Edit2 size={16} className="mr-1" />
                Edit
              </Button>
              <Button
                variant={previewMode === 'preview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('preview')}
                className="flex items-center"
              >
                <Eye size={16} className="mr-1" />
                Preview
              </Button>
            </div>
          </div>

          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            height={400}
            preview={previewMode}
            className="rounded-md overflow-hidden border border-border"
          />

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Attachments</h3>
            <FileUpload 
              onFilesUploaded={handleFilesUploaded} 
              compact={true}
              className="mt-2"
            />
          </div>

          {attachedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">File References</h4>
              <div className="flex flex-wrap gap-2">
                {attachedFiles.map((file, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    onClick={() => insertFileReference(file)}
                    className="flex items-center gap-1 text-xs"
                  >
                    {file.name.length > 20 
                      ? `${file.name.substring(0, 20)}...` 
                      : file.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button onClick={handleSave} className="flex items-center">
              <Save size={16} className="mr-2" />
              {isEditing ? 'Update Note' : 'Create Note'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteEditor;
