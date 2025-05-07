
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'ai', name: '人工智能研究' },
  { id: 'ml', name: '机器学习' },
  { id: 'nlp', name: '自然语言处理' },
  { id: 'cv', name: '计算机视觉' },
  { id: 'robotics', name: '机器人学' },
  { id: 'ethics', name: '人工智能伦理' },
  { id: 'ai-resume', name: 'AI简历' },
];

interface NavigationBarProps {
  className?: string;
  activeCategory?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  className,
  activeCategory
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/search?category=${categoryId}`);
  };

  return (
    <nav className={cn("flex overflow-x-auto py-3 px-1 no-scrollbar border-b border-gray-200", className)}>
      <div className="flex space-x-2 min-w-full">
        <Link 
          to="/" 
          className={cn(
            "nav-link", 
            !activeCategory && "nav-link-active"
          )}
        >
          全部
        </Link>

        {categories.map((category) => (
          <button 
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              "nav-link",
              activeCategory === category.id && "nav-link-active",
              category.id === 'ai-resume' && "bg-black text-white hover:bg-black/90"
            )}
          >
            {category.name}
          </button>
        ))}
        
        <button className="ml-2 p-1 rounded-full hover:bg-secondary/80">
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
