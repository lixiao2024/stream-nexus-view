
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Content } from './RecommendedFeed';
import { PinContainer } from './ui/3d-pin';

interface ArticleCardProps {
  content: Content;
  className?: string;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  content, 
  className,
  featured = false 
}) => {
  return (
    <Link 
      to={`/content/${content.id}`} 
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg h-full",
        className
      )}
    >
      {/* Image container with PinContainer wrapper */}
      <PinContainer 
        href={`/content/${content.id}`}
        title="查看详情"
        containerClassName="relative aspect-[16/9] w-full overflow-hidden bg-gray-100"
      >
        {content.coverImage ? (
          <img
            src={`${content.coverImage}?w=600&auto=format&fit=crop`}
            alt={content.title}
            className="h-full w-full object-cover transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200 text-gray-500">
            暂无图片
          </div>
        )}
        
        {/* Category badge */}
        <Badge 
          variant="outline" 
          className="absolute left-3 top-3 bg-white/80 backdrop-blur-sm z-10"
        >
          {content.category}
        </Badge>
      </PinContainer>
      
      {/* Content */}
      <div className="flex flex-col gap-2 p-4 bg-white flex-grow">
        <h3 className="line-clamp-2 font-semibold text-gray-900 text-base">
          {content.title}
        </h3>
        
        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {content.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </Badge>
            ))}
            {content.tags.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
              >
                +{content.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
