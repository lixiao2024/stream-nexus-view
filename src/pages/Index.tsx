
import React from 'react';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';
import RecommendedFeed from '../components/RecommendedFeed';
import AuthButtons from '../components/AuthButtons';
import CourseCarousel from '../components/CourseCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="relative mr-2">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur"></span>
                <h1 className="relative text-2xl font-bold text-white mr-2">灵境AI-lab</h1>
              </div>
              <span className="text-sm text-blue-400">前沿知识与AI研究分享</span>
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
        {/* Course Carousel */}
        <div className="mb-10 mt-4">
          <h2 className="text-xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">探索前沿课程</h2>
          <CourseCarousel />
        </div>
        
        <NavigationBar className="mb-6" />
        
        <div className="space-y-8">
          <RecommendedFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 灵境AI-lab - 人工智能前沿研究与知识分享平台</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
