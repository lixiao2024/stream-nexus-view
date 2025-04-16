
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Download,
  MessageSquare,
  ThumbsUp,
  BookOpen,
  FileText,
  Users,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
}

interface Lesson {
  title: string;
  videoUrl: string;
  materials?: string[];
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  instructor: string;
  chapters: Chapter[];
  coverImage: string;
}

// Mock course data
const coursesData: Record<string, Course> = {
  '1': {
    id: '1',
    title: '量子计算与AI交叉应用',
    description: '探索量子计算在人工智能领域的最新突破与应用前景',
    content: '本课程深入探讨量子计算与人工智能的交叉领域，包括量子机器学习算法、量子神经网络以及量子启发式优化方法。学员将掌握量子计算的基本原理，以及如何利用量子计算加速AI模型训练和推理过程。课程包含多个实际案例研究和动手实验。',
    instructor: '张量教授',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
    chapters: [
      {
        title: '量子计算基础',
        lessons: [
          {
            title: '量子比特与量子门',
            videoUrl: 'https://example.com/videos/quantum-bits.mp4',
            materials: ['https://example.com/materials/quantum-bits.pdf', 'https://example.com/materials/quantum-gates.pptx']
          },
          {
            title: '量子电路模型',
            videoUrl: 'https://example.com/videos/quantum-circuits.mp4',
            materials: ['https://example.com/materials/quantum-circuits.pdf']
          },
          {
            title: '量子算法概述',
            videoUrl: 'https://example.com/videos/quantum-algorithms.mp4',
            materials: ['https://example.com/materials/quantum-algorithms.pdf']
          }
        ]
      },
      {
        title: '量子机器学习',
        lessons: [
          {
            title: '量子支持向量机',
            videoUrl: 'https://example.com/videos/quantum-svm.mp4',
            materials: ['https://example.com/materials/quantum-svm.pdf']
          },
          {
            title: '量子神经网络',
            videoUrl: 'https://example.com/videos/quantum-nn.mp4',
            materials: ['https://example.com/materials/quantum-nn.pdf']
          }
        ]
      },
      {
        title: 'AI优化问题的量子方法',
        lessons: [
          {
            title: '量子退火算法',
            videoUrl: 'https://example.com/videos/quantum-annealing.mp4',
            materials: ['https://example.com/materials/quantum-annealing.pdf']
          },
          {
            title: '量子近似优化',
            videoUrl: 'https://example.com/videos/quantum-approximate.mp4',
            materials: ['https://example.com/materials/quantum-approximate.pdf']
          }
        ]
      }
    ]
  },
  // Add more courses as needed
  '5': {
    id: '5',
    title: '大规模分布式AI训练系统',
    description: '构建支持千亿参数模型训练的高效分布式系统',
    content: '这门课程专注于大规模分布式AI训练系统的设计与实现。您将学习如何搭建能够支持千亿参数级模型训练的高效基础设施，掌握数据并行、模型并行、流水线并行等先进技术。课程还涵盖分布式训练中的关键挑战，如通信优化、内存管理、故障恢复等。',
    instructor: '刘分布教授',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    chapters: [
      {
        title: '分布式训练基础',
        lessons: [
          {
            title: '分布式系统架构',
            videoUrl: 'https://example.com/videos/distributed-arch.mp4',
            materials: ['https://example.com/materials/distributed-arch.pdf']
          },
          {
            title: '并行训练策略',
            videoUrl: 'https://example.com/videos/parallel-training.mp4',
            materials: ['https://example.com/materials/parallel-training.pdf', 'https://example.com/materials/parallel-strategies.pptx']
          }
        ]
      },
      {
        title: '高级并行技术',
        lessons: [
          {
            title: '数据并行优化',
            videoUrl: 'https://example.com/videos/data-parallel.mp4',
            materials: ['https://example.com/materials/data-parallel.pdf']
          },
          {
            title: '模型并行实现',
            videoUrl: 'https://example.com/videos/model-parallel.mp4',
            materials: ['https://example.com/materials/model-parallel.pdf']
          },
          {
            title: '流水线并行设计',
            videoUrl: 'https://example.com/videos/pipeline-parallel.mp4',
            materials: ['https://example.com/materials/pipeline-parallel.pdf']
          }
        ]
      },
      {
        title: '系统优化与监控',
        lessons: [
          {
            title: '内存管理技术',
            videoUrl: 'https://example.com/videos/memory-management.mp4',
            materials: ['https://example.com/materials/memory-management.pdf']
          },
          {
            title: '通信优化方法',
            videoUrl: 'https://example.com/videos/communication-optimization.mp4',
            materials: ['https://example.com/materials/communication-optimization.pdf']
          }
        ]
      }
    ]
  }
};

// Mock comments
const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      name: '李明',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    content: '这个课程非常实用，特别是关于模型并行实现的部分，解决了我在工作中遇到的很多问题。',
    date: '2025-04-10',
    likes: 12
  },
  {
    id: '2',
    user: {
      name: '张华',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    content: '讲师讲解得非常清晰，内容深入浅出。不过我觉得关于故障恢复的内容可以再详细一些。',
    date: '2025-04-09',
    likes: 8
  },
  {
    id: '3',
    user: {
      name: '王芳',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    content: '课程材料质量很高，但是视频有时候加载比较慢，希望能够改进。',
    date: '2025-04-08',
    likes: 5
  }
];

const CourseEnrollment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch the course data based on ID
    if (id && coursesData[id]) {
      setCourse(coursesData[id]);
      if (coursesData[id].chapters.length > 0) {
        setActiveChapter(coursesData[id].chapters[0].title);
        if (coursesData[id].chapters[0].lessons.length > 0) {
          setActiveLesson(coursesData[id].chapters[0].lessons[0]);
        }
      }
    }
  }, [id]);

  const handleLessonSelect = (chapter: string, lesson: Lesson) => {
    setActiveChapter(chapter);
    setActiveLesson(lesson);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: '当前用户',
        avatar: 'https://i.pravatar.cc/150?img=8'
      },
      content: commentText,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
    
    toast({
      title: "评论已发布",
      description: "您的评论已成功添加",
    });
  };

  const handleLikeComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
  };

  const handleDownloadMaterial = (url: string) => {
    // In a real app, this would trigger a download
    const filename = url.split('/').pop() || 'material';
    toast({
      title: "开始下载",
      description: `正在下载 ${filename}`,
    });
  };

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
      {/* Top navigation */}
      <div className="bg-gray-950/70 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={`/course/${course.id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold truncate">{course.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-1 text-gray-400" />
              <span>已有 345 人学习</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Course chapters */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                课程大纲
              </h2>
              
              <Accordion 
                type="single" 
                collapsible 
                defaultValue={activeChapter || undefined}
                value={activeChapter || undefined}
                onValueChange={(value) => setActiveChapter(value)}
              >
                {course.chapters.map((chapter, chapterIdx) => (
                  <AccordionItem key={chapterIdx} value={chapter.title}>
                    <AccordionTrigger className="hover:text-blue-400">
                      <span className="flex items-center">
                        <Badge className="mr-2 bg-blue-900/50 text-blue-300 hover:bg-blue-900/70">
                          {chapterIdx + 1}
                        </Badge>
                        {chapter.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-2">
                        {chapter.lessons.map((lesson, lessonIdx) => (
                          <li key={lessonIdx}>
                            <button
                              className={`flex items-start w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                activeLesson?.title === lesson.title
                                  ? 'bg-blue-900/30 text-blue-300'
                                  : 'hover:bg-gray-700/50'
                              }`}
                              onClick={() => handleLessonSelect(chapter.title, lesson)}
                            >
                              <span className="w-5 h-5 rounded-full bg-gray-700 text-gray-300 text-xs flex items-center justify-center mr-2 mt-0.5">
                                {lessonIdx + 1}
                              </span>
                              <span className="flex-1 text-sm">{lesson.title}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Course materials section */}
            {activeLesson && activeLesson.materials && activeLesson.materials.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-400" />
                  课件资料
                </h2>
                
                <ul className="space-y-3">
                  {activeLesson.materials.map((material, idx) => (
                    <li key={idx} className="border border-gray-700 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-gray-400" />
                          <span className="text-sm">{material.split('/').pop()}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() => handleDownloadMaterial(material)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Main content - Video player and tabs */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            {/* Video player */}
            {activeLesson && (
              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
                <div className="aspect-video bg-black relative flex items-center justify-center">
                  {/* In a real app, this would be a video player */}
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">{activeLesson.title}</p>
                    <p className="text-sm text-gray-400">视频播放器</p>
                    <p className="text-xs text-gray-500 mt-2">视频URL: {activeLesson.videoUrl}</p>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-800">
                  <h2 className="text-lg font-bold">{activeLesson.title}</h2>
                  <div className="flex items-center mt-2 text-sm text-gray-400">
                    <p>所属章节: {activeChapter}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tabs for Description and Comments */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="description">课程简介</TabsTrigger>
                <TabsTrigger value="comments">学员评论</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">课程详情</h2>
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{course.content}</ReactMarkdown>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="text-lg font-medium mb-2">讲师信息</h3>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="https://i.pravatar.cc/150?img=50" alt={course.instructor} />
                        <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-medium">{course.instructor}</p>
                        <p className="text-sm text-gray-400">资深教授 | 研究员</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="comments" className="mt-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                    学员评论 ({comments.length})
                  </h2>
                  
                  {/* Comment form */}
                  <div className="mb-6">
                    <Textarea
                      placeholder="分享您的学习体验和问题..."
                      className="bg-gray-700/50 border-gray-600 min-h-24 mb-2"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleCommentSubmit}>
                        提交评论
                      </Button>
                    </div>
                  </div>
                  
                  {/* Comments list */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-b border-gray-700 pb-4 last:border-0">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">{comment.user.name}</p>
                              <p className="text-xs text-gray-400">{comment.date}</p>
                            </div>
                            <p className="mt-2 text-gray-300">{comment.content}</p>
                            <div className="mt-3 flex items-center">
                              <button 
                                className="flex items-center text-gray-400 hover:text-blue-400 text-xs"
                                onClick={() => handleLikeComment(comment.id)}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>{comment.likes > 0 ? comment.likes : '赞同'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;
