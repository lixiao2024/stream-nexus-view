
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BookOpen, Calendar, Users } from 'lucide-react';

export interface Content {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  authors: string[];
  citations?: number;
  tags?: string[];
  isHighlighted?: boolean;
}

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  return (
    <Link to={`/content/${content.id}`} className="block">
      <Card className={`feed-card h-full ${content.isHighlighted ? 'border-l-4 border-l-primary' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className={`font-bold text-lg ${content.isHighlighted ? 'text-primary' : ''}`}>
              {content.title}
            </h3>
            <Badge variant="outline" className="text-xs">
              {content.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {content.summary}
          </p>
        </CardContent>
        <CardFooter className="text-xs text-gray-500 pt-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {content.date}
            </div>
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              {content.authors.slice(0, 2).join(', ')}
              {content.authors.length > 2 && ' 等'}
            </div>
            {content.citations !== undefined && (
              <div className="flex items-center">
                <BookOpen size={14} className="mr-1" />
                {content.citations} 引用
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ContentCard;
