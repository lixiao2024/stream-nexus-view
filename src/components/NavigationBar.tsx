
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
  { id: 'ai', name: 'AI Research', path: '/category/ai' },
  { id: 'ml', name: 'Machine Learning', path: '/category/ml' },
  { id: 'nlp', name: 'NLP', path: '/category/nlp' },
  { id: 'cv', name: 'Computer Vision', path: '/category/cv' },
  { id: 'robotics', name: 'Robotics', path: '/category/robotics' },
  { id: 'ethics', name: 'AI Ethics', path: '/category/ethics' },
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
          All
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
