
import React, { useState } from 'react';
import { Bookmark, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface InteractionToolbarProps {
  contentId: string;
}

const InteractionToolbar: React.FC<InteractionToolbarProps> = ({ contentId }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 5);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
      toast({
        title: "Content liked",
        description: "We'll show you more content like this",
      });
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Removed from saved items" : "Added to saved items",
      description: saved ? "The item has been removed from your library" : "You can find this in your library",
    });
  };

  const handleShare = () => {
    // In a real app, we would implement proper sharing functionality
    navigator.clipboard.writeText(`https://example.com/content/${contentId}`);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this content with others",
    });
  };

  return (
    <div className="flex items-center space-x-4 py-2">
      <Button
        variant={liked ? "default" : "outline"} 
        size="sm"
        onClick={handleLike}
        className="flex items-center gap-2"
      >
        <ThumbsUp size={18} className={liked ? "fill-current" : ""} />
        <span>{likeCount}</span>
      </Button>
      
      <Button
        variant={saved ? "default" : "outline"}
        size="sm"
        onClick={handleSave}
      >
        <Bookmark size={18} className={saved ? "fill-current" : ""} />
        <span className="ml-2">{saved ? "Saved" : "Save"}</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
      >
        <Share2 size={18} />
        <span className="ml-2">Share</span>
      </Button>
    </div>
  );
};

export default InteractionToolbar;
