
import React from 'react';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';
import RecommendedFeed from '../components/RecommendedFeed';
import AuthButtons from '../components/AuthButtons';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary mr-2">技术视界</h1>
              <span className="text-sm text-gray-500">研究与人工智能新闻</span>
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-auto gap-4 items-center">
              <SearchBar />
              <AuthButtons />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <NavigationBar className="mb-6" />
        
        <div className="space-y-8">
          <RecommendedFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 技术视界 - 人工智能研究与技术新闻平台</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
