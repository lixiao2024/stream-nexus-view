
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
          className="pl-10 pr-20 py-2 w-full rounded-md border border-border/80 focus:border-primary focus:ring-primary text-black" 
          style={{ color: 'black' }}
        />
        <Search className="absolute left-3 text-muted-foreground" size={18} />
        <Button 
          type="submit" 
          size="sm"
          variant="default"
          className="absolute right-1 my-1"
        >
          搜索
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
