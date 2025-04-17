
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import ContentCard, { Content } from '@/components/ContentCard';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

// Mock data - in a real app, you would fetch this from your API
import { mockArticles } from '@/data/mockArticles';
import { mockCourses } from '@/data/mockCourses';
// Import the recommended content from RecommendedFeed
import { mockRecommendedContent } from '@/components/RecommendedFeed';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const tagFilter = searchParams.get('tag') || '';
  const categoryFilter = searchParams.get('category') || '';
  const [filteredArticles, setFilteredArticles] = useState<Content[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Content[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Set active tag from URL
    if (tagFilter) {
      setActiveTag(tagFilter);
      setActiveCategory(null);
    } else if (categoryFilter) {
      setActiveCategory(categoryFilter);
      setActiveTag(null);
    } else {
      setActiveTag(null);
      setActiveCategory(null);
    }
    
    // Combine mockArticles and recommended articles for a comprehensive search
    const allArticles = [...mockArticles];
    
    // Add recommended content if not already in the articles list
    mockRecommendedContent.forEach(item => {
      if (!allArticles.some(article => article.id === item.id)) {
        allArticles.push(item);
      }
    });
    
    // Filter based on category if present
    if (categoryFilter) {
      const normalizedCategory = categoryFilter.toLowerCase().trim();
      
      const articlesResults = allArticles.filter(article => 
        article.category.toLowerCase().includes(normalizedCategory)
      );
      
      const coursesResults = mockCourses.filter(course => 
        course.category.toLowerCase().includes(normalizedCategory)
      );
      
      setFilteredArticles(articlesResults);
      setFilteredCourses(coursesResults);
    }
    // Filter based on tag if present
    else if (tagFilter) {
      const normalizedTag = tagFilter.toLowerCase().trim();
      
      const articlesResults = allArticles.filter(article => 
        article.tags && article.tags.some(tag => 
          tag.toLowerCase() === normalizedTag
        )
      );
      
      const coursesResults = mockCourses.filter(course => 
        course.tags && course.tags.some(tag => 
          tag.toLowerCase() === normalizedTag
        )
      );
      
      setFilteredArticles(articlesResults);
      setFilteredCourses(coursesResults);
    }
    // Filter based on search query if present
    else if (query) {
      const normalizedQuery = query.toLowerCase().trim();
      
      // Enhanced filtering for articles
      const articlesResults = allArticles.filter(article => 
        // Title match
        article.title.toLowerCase().includes(normalizedQuery) || 
        // Summary/content match
        article.summary.toLowerCase().includes(normalizedQuery) ||
        // Tag match
        (article.tags && article.tags.some(tag => 
          tag.toLowerCase().includes(normalizedQuery)
        )) ||
        // Author match
        article.authors.some(author => 
          author.toLowerCase().includes(normalizedQuery)
        ) ||
        // Category match (treating as a tag)
        article.category.toLowerCase().includes(normalizedQuery)
      );
      
      // Enhanced filtering for courses with the same logic
      const coursesResults = mockCourses.filter(course => 
        course.title.toLowerCase().includes(normalizedQuery) || 
        course.summary.toLowerCase().includes(normalizedQuery) ||
        (course.tags && course.tags.some(tag => 
          tag.toLowerCase().includes(normalizedQuery)
        )) ||
        course.authors.some(author => 
          author.toLowerCase().includes(normalizedQuery)
        ) ||
        course.category.toLowerCase().includes(normalizedQuery)
      );
      
      setFilteredArticles(articlesResults);
      setFilteredCourses(coursesResults);
    } else {
      // If no query or tag, show all content
      setFilteredArticles(allArticles);
      setFilteredCourses(mockCourses);
    }
  }, [query, tagFilter, categoryFilter]);

  // Get all unique tags from articles and courses
  const getAllTags = () => {
    const tagSet = new Set<string>();
    
    // Add tags from articles
    filteredArticles.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => tagSet.add(tag));
      }
    });
    
    // Add tags from courses
    filteredCourses.forEach(course => {
      if (course.tags) {
        course.tags.forEach(tag => tagSet.add(tag));
      }
    });
    
    return Array.from(tagSet);
  };

  const allTags = getAllTags();
  const totalResults = filteredArticles.length + filteredCourses.length;
  
  // Function to get the page title based on filters
  const getPageTitle = () => {
    if (categoryFilter) {
      const categoryMap: Record<string, string> = {
        'ai': '人工智能研究',
        'ml': '机器学习',
        'nlp': '自然语言处理',
        'cv': '计算机视觉',
        'robotics': '机器人学',
        'ethics': '人工智能伦理'
      };
      return `分类: "${categoryMap[categoryFilter] || categoryFilter}"`;
    } else if (tagFilter) {
      return `标签: "${tagFilter}"`;
    } else if (query) {
      return `搜索结果: "${query}"`;
    }
    return '全部内容';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center">
              <div className="relative mr-2">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur"></span>
                <h1 className="relative text-2xl font-bold text-white mr-2">灵境AI-lab</h1>
              </div>
              <span className="text-sm text-blue-400">前沿知识与AI研究分享</span>
            </a>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{getPageTitle()}</h2>
          <p className="text-gray-400">找到 {totalResults} 个相关结果</p>
        </div>
        
        {/* Tags filter bar */}
        {allTags.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <div className="flex flex-wrap gap-2 py-2">
              <Link 
                to="/search" 
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${!activeTag && !activeCategory ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                全部
              </Link>
              {allTags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/search?tag=${encodeURIComponent(tag)}`}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${activeTag === tag ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  <Tag size={14} className="mr-1.5" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {totalResults > 0 ? (
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">全部 ({totalResults})</TabsTrigger>
              <TabsTrigger value="articles">文章 ({filteredArticles.length})</TabsTrigger>
              <TabsTrigger value="courses">课程 ({filteredCourses.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredArticles.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">相关文章</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredArticles.slice(0, 4).map(article => (
                      <ContentCard key={article.id} content={article} />
                    ))}
                  </div>
                  {filteredArticles.length > 4 && (
                    <button 
                      className="mt-4 text-blue-400 hover:text-blue-300"
                      onClick={() => setActiveTab('articles')}
                    >
                      查看全部 {filteredArticles.length} 个文章结果 →
                    </button>
                  )}
                </div>
              )}
              
              {filteredCourses.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">相关课程</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCourses.slice(0, 4).map(course => (
                      <ContentCard key={course.id} content={course} />
                    ))}
                  </div>
                  {filteredCourses.length > 4 && (
                    <button 
                      className="mt-4 text-blue-400 hover:text-blue-300"
                      onClick={() => setActiveTab('courses')}
                    >
                      查看全部 {filteredCourses.length} 个课程结果 →
                    </button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="articles" className="space-y-4">
              <h3 className="text-xl font-bold mb-4">文章结果</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map(article => (
                  <ContentCard key={article.id} content={article} />
                ))}
              </div>
              {filteredArticles.length === 0 && (
                <p className="text-gray-400">没有找到相关文章</p>
              )}
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-4">
              <h3 className="text-xl font-bold mb-4">课程结果</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map(course => (
                  <ContentCard key={course.id} content={course} />
                ))}
              </div>
              {filteredCourses.length === 0 && (
                <p className="text-gray-400">没有找到相关课程</p>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">没有找到相关内容</h3>
              <p className="text-gray-400 mb-4">尝试使用不同的关键词或者更简短的搜索词</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Search;
