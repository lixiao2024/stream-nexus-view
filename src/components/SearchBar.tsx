
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="搜索论文、新闻、教程..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-20 py-2 w-full rounded-lg border border-gray-200 focus:border-primary focus:ring-primary text-white" 
        />
        <Search className="absolute left-3 text-gray-400" size={18} />
        <Button 
          type="submit" 
          size="sm"
          className="absolute right-1 my-1"
        >
          搜索
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
