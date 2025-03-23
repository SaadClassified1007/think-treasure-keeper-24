
import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast({
            title: "Files uploaded successfully",
            description: `${files.length} files have been processed and added to your notes.`,
          });
          setFiles([]);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div
        className={`border-2 border-dashed rounded-lg p-10 text-center transition-all duration-200 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted hover:border-muted-foreground/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-secondary">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Drag files here or click to upload</h3>
            <p className="text-sm text-muted-foreground">
              Support for PDF, Word documents, and text files
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            Select Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileInputChange}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4 glass-card p-4 rounded-lg animate-slide-in">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Selected Files</h3>
            <Button 
              variant="default" 
              size="sm"
              onClick={simulateUpload}
              disabled={uploading}
            >
              {uploading ? 'Processing...' : 'Process Files'}
            </Button>
          </div>
          
          {uploading && (
            <Progress value={uploadProgress} className="h-2 animate-pulse" />
          )}
          
          <div className="divide-y">
            {files.map((file, index) => (
              <div key={index} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[300px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
