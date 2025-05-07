
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
        title: "内容已点赞",
        description: "我们将向您推荐更多类似内容",
      });
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "已从收藏中移除" : "已添加到收藏",
      description: saved ? "该项目已从您的收藏库中移除" : "您可以在收藏库中找到此内容",
    });
  };

  const handleShare = () => {
    // 在实际应用中，我们会实现适当的共享功能
    navigator.clipboard.writeText(`https://example.com/content/${contentId}`);
    toast({
      title: "链接已复制到剪贴板",
      description: "您现在可以与他人分享此内容",
    });
  };

  return (
    <div className="flex items-center space-x-4 py-2">
      <Button
        variant={liked ? "default" : "outline"} 
        size="sm"
        onClick={handleLike}
        className={cn("flex items-center gap-2", 
          liked ? "bg-black text-white hover:bg-black/90" : "border-gray-200 hover:bg-gray-100"
        )}
      >
        <ThumbsUp size={18} className={liked ? "fill-current" : ""} />
        <span>{likeCount}</span>
      </Button>
      
      <Button
        variant={saved ? "default" : "outline"}
        size="sm"
        onClick={handleSave}
        className={cn(
          saved ? "bg-black text-white hover:bg-black/90" : "border-gray-200 hover:bg-gray-100"
        )}
      >
        <Bookmark size={18} className={saved ? "fill-current" : ""} />
        <span className="ml-2">{saved ? "已收藏" : "收藏"}</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="border-gray-200 hover:bg-gray-100"
      >
        <Share2 size={18} />
        <span className="ml-2">分享</span>
      </Button>
    </div>
  );
};

export default InteractionToolbar;
