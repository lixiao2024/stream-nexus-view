
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { 
  Atom, 
  BrainCircuit, 
  Code, 
  Bot, 
  Database 
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
}

const courses: Course[] = [
  {
    id: '1',
    title: '量子计算与AI交叉应用',
    description: '探索量子计算在人工智能领域的最新突破与应用前景',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
    icon: <Atom className="h-8 w-8 text-blue-400" />
  },
  {
    id: '2',
    title: '大模型提示工程高级技巧',
    description: '系统学习Claude 3.5和GPT-5的高级提示技术与应用开发',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
    icon: <BrainCircuit className="h-8 w-8 text-purple-400" />
  },
  {
    id: '3',
    title: '多模态AI系统架构设计',
    description: '从零构建支持文本、图像、语音和视频的综合AI架构',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
    icon: <Code className="h-8 w-8 text-green-400" />
  },
  {
    id: '4',
    title: 'AGI研究前沿与伦理思考',
    description: '深入探讨通用人工智能的技术路径与社会伦理问题',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop',
    icon: <Bot className="h-8 w-8 text-yellow-400" />
  },
  {
    id: '5',
    title: '大规模分布式AI训练系统',
    description: '构建支持千亿参数模型训练的高效分布式系统',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    icon: <Database className="h-8 w-8 text-red-400" />
  }
];

const CourseCarousel = () => {
  return (
    <div className="relative overflow-hidden rounded-xl p-1">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl backdrop-blur-sm"></div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {courses.map((course) => (
            <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
              <Link to={`/course/${course.id}`}>
                <div className="relative group h-[300px] rounded-lg overflow-hidden border border-gray-800 bg-black/50 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-700 group-hover:border-blue-500 transition-all duration-300">
                      {course.icon}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold mb-2 text-white">{course.title}</h3>
                    <p className="text-sm text-gray-300 line-clamp-2">{course.description}</p>
                    
                    <div className="mt-4 inline-flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-all">
                      查看详情
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 border-gray-700 text-white hover:bg-black/80 hover:border-blue-500" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 border-gray-700 text-white hover:bg-black/80 hover:border-blue-500" />
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
