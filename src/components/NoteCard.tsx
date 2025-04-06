
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, truncateText } from '@/lib/utils';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

export interface NoteData {
  id: string; // Changed from string to number to match the JSON
  user: string;
  title: string;
  content: string; // Aligned with the desired output name
  isFile: boolean; // Aligned with the desired output name 'is_file'
  fileUrl: string; // Aligned with the desired output name 'file_url'
  createdAt: string; // Aligned with the desired output name 'created_at'
  updatedAt: string; // Aligned with the desired output name 'updated_at'
  category: string | null; // Allowed for null as per the JSON
}

export interface DashBoard {
  recent_notes: NoteData[];
  note_count: number;
  category_count: number;
}

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
  className?: string;
}

export const NoteCard = ({ note, onClick, className }: NoteCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer animate-scale-in",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex items-start justify-between">
          {note.category ? (
          <Badge variant="outline" className="bg-primary/5 text-xs font-normal">
            {note.category}
          </Badge>
          ): (
            <div className='h-fit w-fit'></div>
          )}
          <div className='flex items-center gap-1'>
  <span className="text-xs text-muted-foreground">
    {new Date(note.createdAt).toLocaleDateString()}
  </span>
  <Clock size={14} className="text-muted-foreground" />
</div>
          
        </div>
        <CardTitle className="text-base line-clamp-1">{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {truncateText(note?.content, 150)}
        </p>
      </CardContent>
      {/* <CardFooter className="p-4 pt-2">
        
      </CardFooter> */}
    </Card>
  );
};
