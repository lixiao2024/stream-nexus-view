
import React from 'react';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';
import RecommendedFeed from '../components/RecommendedFeed';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary mr-2">TechNexus</h1>
              <span className="text-sm text-gray-500">Research & AI News</span>
            </div>
            <SearchBar />
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
            <p>© 2025 TechNexus - AI Research & Technology News Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
