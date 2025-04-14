
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  path: string;
}

const categories: Category[] = [
  { id: 'ai', name: '人工智能研究', path: '/category/ai' },
  { id: 'ml', name: '机器学习', path: '/category/ml' },
  { id: 'nlp', name: '自然语言处理', path: '/category/nlp' },
  { id: 'cv', name: '计算机视觉', path: '/category/cv' },
  { id: 'robotics', name: '机器人学', path: '/category/robotics' },
  { id: 'ethics', name: '人工智能伦理', path: '/category/ethics' },
];

interface NavigationBarProps {
  className?: string;
  activeCategory?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  className,
  activeCategory
}) => {
  return (
    <nav className={cn("flex overflow-x-auto py-3 px-1 no-scrollbar", className)}>
      <div className="flex space-x-1 min-w-full">
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
          <Link 
            key={category.id}
            to={category.path} 
            className={cn(
              "nav-link",
              activeCategory === category.id && "nav-link-active"
            )}
          >
            {category.name}
          </Link>
        ))}
        
        <button className="ml-2 p-1 rounded-full hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
