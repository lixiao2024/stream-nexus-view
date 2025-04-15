
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Atom, 
  BrainCircuit, 
  Code, 
  Bot, 
  Database,
  ArrowLeft,
  CalendarDays,
  Users,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  icon: React.ReactNode;
  instructor: string;
  duration: string;
  level: string;
  startDate: string;
  students: number;
  chapters: {
    title: string;
    lessons: string[];
  }[];
}

// 模拟课程数据
const coursesData: Record<string, Course> = {
  '1': {
    id: '1',
    title: '量子计算与AI交叉应用',
    description: '探索量子计算在人工智能领域的最新突破与应用前景',
    fullDescription: '本课程深入探讨量子计算与人工智能的交叉领域，包括量子机器学习算法、量子神经网络以及量子启发式优化方法。学员将掌握量子计算的基本原理，以及如何利用量子计算加速AI模型训练和推理过程。课程包含多个实际案例研究和动手实验。',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
    icon: <Atom className="h-10 w-10 text-blue-400" />,
    instructor: '张量教授',
    duration: '8周',
    level: '高级',
    startDate: '2025年5月15日',
    students: 345,
    chapters: [
      {
        title: '量子计算基础',
        lessons: ['量子比特与量子门', '量子电路模型', '量子算法概述']
      },
      {
        title: '量子机器学习',
        lessons: ['量子支持向量机', '量子神经网络', '量子变分电路']
      },
      {
        title: 'AI优化问题的量子方法',
        lessons: ['量子退火算法', '量子近似优化', '混合量子-经典方法']
      }
    ]
  },
  '2': {
    id: '2',
    title: '大模型提示工程高级技巧',
    description: '系统学习Claude 3.5和GPT-5的高级提示技术与应用开发',
    fullDescription: '这门课程将帮助您掌握最新一代大型语言模型的高级提示工程技术。从基础原理到复杂应用，您将学习如何设计精确、高效的提示以实现各种任务。课程涵盖了提示优化、上下文学习、思维链技术、多轮对话设计等关键主题，并提供大量实际案例。',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
    icon: <BrainCircuit className="h-10 w-10 text-purple-400" />,
    instructor: '李智博士',
    duration: '6周',
    level: '中级到高级',
    startDate: '2025年4月25日',
    students: 512,
    chapters: [
      {
        title: '提示工程基础与原理',
        lessons: ['大模型工作机制解析', '提示设计的关键元素', '上下文窗口优化']
      },
      {
        title: '高级提示技术',
        lessons: ['思维链(CoT)方法', '自洽性增强', '多模态提示设计']
      },
      {
        title: '应用系统开发',
        lessons: ['构建对话代理', '知识密集型应用', '领域专家系统开发']
      }
    ]
  },
  '3': {
    id: '3',
    title: '多模态AI系统架构设计',
    description: '从零构建支持文本、图像、语音和视频的综合AI架构',
    fullDescription: '本课程将带您深入了解如何设计和实现先进的多模态AI系统。您将学习如何整合不同的感知模态（文本、图像、音频和视频），构建能够理解和生成跨模态内容的强大系统。课程包括架构设计原则、模态融合技术、跨模态表示学习等内容。',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
    icon: <Code className="h-10 w-10 text-green-400" />,
    instructor: '陈架构教授',
    duration: '10周',
    level: '高级',
    startDate: '2025年6月1日',
    students: 298,
    chapters: [
      {
        title: '多模态系统基础',
        lessons: ['模态特性与挑战', '多模态表示学习', '模态对齐技术']
      },
      {
        title: '架构设计与实现',
        lessons: ['编码器-解码器架构', '注意力机制设计', '跨模态Transformer']
      },
      {
        title: '系统集成与优化',
        lessons: ['分布式训练策略', '推理优化技术', '部署与扩展']
      }
    ]
  },
  '4': {
    id: '4',
    title: 'AGI研究前沿与伦理思考',
    description: '深入探讨通用人工智能的技术路径与社会伦理问题',
    fullDescription: '本课程探索通用人工智能(AGI)研究的最前沿，包括现有方法的局限性、突破性研究方向以及社会伦理问题。学员将深入了解AGI的理论基础、评估框架、安全对齐技术，以及如何应对AGI带来的社会经济变革。课程融合技术与人文视角，鼓励批判性思考。',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop',
    icon: <Bot className="h-10 w-10 text-yellow-400" />,
    instructor: '王通博士',
    duration: '12周',
    level: '高级',
    startDate: '2025年5月10日',
    students: 186,
    chapters: [
      {
        title: 'AGI理论基础',
        lessons: ['智能本质探讨', '从狭义AI到通用AI', '意识与涌现智能']
      },
      {
        title: '前沿研究方向',
        lessons: ['多智能体系统', '自主学习架构', '神经符号整合']
      },
      {
        title: '伦理与社会影响',
        lessons: ['价值对齐问题', 'AGI治理框架', '社会经济转型']
      }
    ]
  },
  '5': {
    id: '5',
    title: '大规模分布式AI训练系统',
    description: '构建支持千亿参数模型训练的高效分布式系统',
    fullDescription: '这门课程专注于大规模分布式AI训练系统的设计与实现。您将学习如何搭建能够支持千亿参数级模型训练的高效基础设施，掌握数据并行、模型并行、流水线并行等先进技术。课程还涵盖分布式训练中的关键挑战，如通信优化、内存管理、故障恢复等。',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    icon: <Database className="h-10 w-10 text-red-400" />,
    instructor: '刘分布教授',
    duration: '8周',
    level: '高级',
    startDate: '2025年6月15日',
    students: 245,
    chapters: [
      {
        title: '分布式训练基础',
        lessons: ['分布式系统架构', '并行训练策略', '通信模式设计']
      },
      {
        title: '高级并行技术',
        lessons: ['数据并行优化', '模型并行实现', '流水线并行设计']
      },
      {
        title: '系统优化与监控',
        lessons: ['内存管理技术', '通信优化方法', '故障恢复机制']
      }
    ]
  }
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const course = id ? coursesData[id] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">课程未找到</h2>
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* 顶部图片和标题区 */}
      <div className="relative h-[40vh] min-h-[300px]">
        <div className="absolute inset-0">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center text-blue-400 mb-4 hover:text-blue-300 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回首页
            </Link>
            
            <div className="flex items-center mb-2">
              {course.icon}
              <span className="ml-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">高级课程</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">{course.description}</p>
          </div>
        </div>
      </div>
      
      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* 左侧内容信息 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 课程介绍 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">课程介绍</h2>
              <p className="text-gray-300 leading-relaxed">{course.fullDescription}</p>
            </div>
            
            {/* 课程章节 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">课程大纲</h2>
              
              <div className="space-y-6">
                {course.chapters.map((chapter, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-0">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 mr-2 text-blue-400 text-sm">
                        {index + 1}
                      </span>
                      {chapter.title}
                    </h3>
                    
                    <ul className="space-y-2 pl-10">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="text-gray-300 flex items-start">
                          <span className="inline-block w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-xs flex items-center justify-center mr-2 mt-0.5">
                            {lessonIndex + 1}
                          </span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 右侧信息卡片 */}
          <div className="space-y-6">
            {/* 报名卡片 */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 sticky top-24">
              <div className="pb-4 mb-4 border-b border-gray-700">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  免费
                </div>
                <p className="text-gray-400 text-sm mt-1">开放注册中</p>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 mb-4">
                立即报名
              </Button>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <CalendarDays className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-400">开课时间</p>
                    <p className="text-white">{course.startDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-400">课程时长</p>
                    <p className="text-white">{course.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-400">难度级别</p>
                    <p className="text-white">{course.level}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Award className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-400">课程讲师</p>
                    <p className="text-white">{course.instructor}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-gray-400">已报名学员</p>
                    <p className="text-white">{course.students} 人</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
