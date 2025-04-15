
import React, { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';

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

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

const CourseCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play effect
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTO_PLAY_INTERVAL);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-gray-800 p-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {courses.map((course) => (
            <CarouselItem key={course.id} className="basis-full">
              <Link to={`/course/${course.id}`}>
                <div className="relative group h-[350px] rounded-lg overflow-hidden transition-all duration-300">
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-700 group-hover:border-blue-500 transition-all duration-300">
                      {course.icon}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-3 text-white">{course.title}</h3>
                    <p className="text-md text-gray-300 mb-4">{course.description}</p>
                    
                    <Button 
                      variant="default" 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      了解详情
                    </Button>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
          <div className="text-sm text-white/70">
            {current} / {count}
          </div>
          <CarouselPrevious className="static h-8 w-8 bg-black/50 border-gray-700 text-white hover:bg-black/80 hover:border-blue-500 translate-y-0" />
          <CarouselNext className="static h-8 w-8 bg-black/50 border-gray-700 text-white hover:bg-black/80 hover:border-blue-500 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
