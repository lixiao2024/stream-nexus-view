import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MoreVertical, Pencil, Trash2, Eye, FileImage, Video, File } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ReactMarkdown from 'react-markdown';

interface CourseChapter {
  title: string;
  lessons: {
    title: string;
    videoUrl?: string;
    materials?: string[];
  }[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  students: number;
  status: 'published' | 'draft';
  content?: string;
  tags?: string[];
  coverImage?: string;
  price?: number;
  isFree?: boolean;
  chapters?: CourseChapter[];
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: '量子计算与AI交叉应用',
    description: '探索量子计算与人工智能的交叉领域，了解量子算法如何加速机器学习任务。',
    category: '量子计算',
    instructor: 'Dr. 张明',
    students: 89,
    status: 'published',
    tags: ['量子计算', 'AI应用', '前沿技术'],
    coverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    price: 0,
    isFree: true,
    chapters: [
      {
        title: '量子计算基础',
        lessons: [
          {
            title: '量子比特与量子门',
            videoUrl: 'https://example.com/video1.mp4',
            materials: ['https://example.com/pdf1.pdf', 'https://example.com/slides1.pptx']
          },
          {
            title: '量子电路模型',
            videoUrl: 'https://example.com/video2.mp4',
            materials: ['https://example.com/pdf2.pdf']
          },
          {
            title: '量子算法概述',
            videoUrl: 'https://example.com/video3.mp4',
            materials: ['https://example.com/pdf3.pdf']
          }
        ]
      },
      {
        title: '量子机器学习',
        lessons: [
          {
            title: '量子支持向量机',
            videoUrl: 'https://example.com/video4.mp4',
            materials: ['https://example.com/pdf4.pdf']
          },
          {
            title: '量子神经网络',
            videoUrl: 'https://example.com/video5.mp4',
            materials: ['https://example.com/pdf5.pdf']
          }
        ]
      }
    ]
  },
  // ... keep existing code (other course data)
];

const placeholderImages = [
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
];

const CoursesManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    instructor: '',
    content: '',
    tags: '',
    coverImage: '',
    price: '0',
    isFree: true
  });
  
  const [chapters, setChapters] = useState<CourseChapter[]>([]);

  const handleOpenNewCourse = () => {
    setIsEditing(false);
    setFormData({
      title: '',
      description: '',
      category: '',
      instructor: '',
      content: '',
      tags: '',
      coverImage: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
      price: '0',
      isFree: true
    });
    setChapters([]);
    setPreviewMode(false);
    setOpenDialog(true);
  };

  const handleEditCourse = (course: Course) => {
    setIsEditing(true);
    setCurrentCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      instructor: course.instructor,
      content: course.content || '',
      tags: course.tags ? course.tags.join(', ') : '',
      coverImage: course.coverImage || '',
      price: course.price?.toString() || '0',
      isFree: course.isFree !== undefined ? course.isFree : true
    });
    setChapters(course.chapters || []);
    setPreviewMode(false);
    setOpenDialog(true);
  };

  const handlePreviewCourse = (course: Course) => {
    setIsEditing(false);
    setCurrentCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      instructor: course.instructor,
      content: course.content || '',
      tags: course.tags ? course.tags.join(', ') : '',
      coverImage: course.coverImage || '',
      price: course.price?.toString() || '0',
      isFree: course.isFree !== undefined ? course.isFree : true
    });
    setChapters(course.chapters || []);
    setPreviewMode(true);
    setOpenDialog(true);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    toast({
      title: "删除成功",
      description: "课程已成功删除",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'isFree') {
      setFormData({
        ...formData,
        isFree: (e.target as HTMLInputElement).checked,
        ...(!(e.target as HTMLInputElement).checked ? {} : { price: '0' })
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleCoverImageSelect = (imageUrl: string) => {
    setFormData({
      ...formData,
      coverImage: imageUrl
    });
  };

  const addChapter = () => {
    setChapters([...chapters, { title: `章节 ${chapters.length + 1}`, lessons: [] }]);
  };

  const updateChapterTitle = (index: number, title: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].title = title;
    setChapters(updatedChapters);
  };

  const addLesson = (chapterIndex: number) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons.push({
      title: `课时 ${updatedChapters[chapterIndex].lessons.length + 1}`,
      videoUrl: '',
      materials: []
    });
    setChapters(updatedChapters);
  };

  const updateLessonTitle = (chapterIndex: number, lessonIndex: number, title: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex].title = title;
    setChapters(updatedChapters);
  };

  const updateLessonVideo = (chapterIndex: number, lessonIndex: number, videoUrl: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex].videoUrl = videoUrl;
    setChapters(updatedChapters);
  };

  const addLessonMaterial = (chapterIndex: number, lessonIndex: number, materialUrl: string) => {
    const updatedChapters = [...chapters];
    const materials = updatedChapters[chapterIndex].lessons[lessonIndex].materials || [];
    updatedChapters[chapterIndex].lessons[lessonIndex].materials = [...materials, materialUrl];
    setChapters(updatedChapters);
  };

  const removeLessonMaterial = (chapterIndex: number, lessonIndex: number, materialIndex: number) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex].materials = 
      updatedChapters[chapterIndex].lessons[lessonIndex].materials?.filter((_, idx) => idx !== materialIndex);
    setChapters(updatedChapters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const courseData: Course = {
      id: isEditing && currentCourse ? currentCourse.id : Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      instructor: formData.instructor,
      students: isEditing && currentCourse ? currentCourse.students : 0,
      status: 'draft',
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      coverImage: formData.coverImage,
      price: formData.isFree ? 0 : parseInt(formData.price, 10),
      isFree: formData.isFree,
      chapters: chapters
    };

    if (isEditing && currentCourse) {
      setCourses(courses.map(course => 
        course.id === currentCourse.id ? { ...courseData, status: course.status } : course
      ));
      toast({
        title: "更新成功",
        description: "课程信息已更新",
      });
    } else {
      setCourses([...courses, courseData]);
      toast({
        title: "添加成功",
        description: "新课程已添加",
      });
    }

    setOpenDialog(false);
  };

  const handlePublishToggle = (id: string) => {
    setCourses(courses.map(course => 
      course.id === id 
        ? { ...course, status: course.status === 'published' ? 'draft' : 'published' } 
        : course
    ));
    
    const course = courses.find(c => c.id === id);
    const newStatus = course?.status === 'published' ? '草稿' : '已发布';
    
    toast({
      title: "状态已更改",
      description: `课程已更改为${newStatus}状态`,
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">课程管理</h1>
          <p className="text-gray-500">管理所有课程内容</p>
        </div>
        <Button onClick={handleOpenNewCourse}>
          <Plus className="mr-2 h-4 w-4" />
          添加课程
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>封面</TableHead>
            <TableHead>课程名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>讲师</TableHead>
            <TableHead>学生数</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                {course.coverImage ? (
                  <div className="w-16 h-12 rounded overflow-hidden">
                    <img 
                      src={`${course.coverImage}?w=120&h=90&fit=crop`} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <FileImage className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.category}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>{course.students}</TableCell>
              <TableCell>
                {course.isFree ? (
                  <span className="text-green-600">免费</span>
                ) : (
                  <span>¥{course.price}</span>
                )}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={course.status === 'published' ? 'default' : 'outline'}
                  className={course.status === 'published' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                >
                  {course.status === 'published' ? '已发布' : '草稿'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handlePreviewCourse(course)}>
                      <Eye className="mr-2 h-4 w-4" />
                      预览
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePublishToggle(course.id)}>
                      {course.status === 'published' ? '设为草稿' : '发布'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className={previewMode ? "sm:max-w-[800px]" : "sm:max-w-[725px] max-h-[90vh] overflow-y-auto"}>
          <DialogHeader>
            <DialogTitle>
              {previewMode 
                ? "预览课程" 
                : (isEditing ? "编辑课程" : "添加新课程")}
            </DialogTitle>
            <DialogDescription>
              {previewMode 
                ? "查看课程在前台的显示效果" 
                : (isEditing 
                  ? "修改课程的信息并保存更改。" 
                  : "添加新课程的详细信息。保存后，课程将以草稿状态创建。")}
            </DialogDescription>
          </DialogHeader>
          
          {previewMode ? (
            <div className="border rounded-md p-6 max-h-[600px] overflow-auto">
              {formData.coverImage && (
                <div className="mb-6 w-full h-64 rounded-lg overflow-hidden">
                  <img 
                    src={`${formData.coverImage}?w=800&h=400&fit=crop`} 
                    alt={formData.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="mb-6">
                <div className="mb-2">
                  <Badge variant="outline" className="mb-2">
                    {formData.category}
                  </Badge>
                  <h1 className="text-3xl font-bold text-gray-900">{formData.title}</h1>
                </div>
                
                <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-4">
                  <div className="flex items-center">
                    讲师: {formData.instructor}
                  </div>
                  <div className="flex items-center">
                    学生数: {currentCourse?.students || 0}
                  </div>
                  <div className="flex items-center">
                    价格: {formData.isFree ? "免费" : `¥${formData.price}`}
                  </div>
                </div>
                
                <p className="mt-4 text-gray-600">{formData.description}</p>
                
                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags.split(',').map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {formData.content && (
                <div className="prose max-w-none mt-6">
                  <ReactMarkdown>{formData.content}</ReactMarkdown>
                </div>
              )}

              {chapters.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">课程大纲</h2>
                  <div className="space-y-4">
                    {chapters.map((chapter, chapterIdx) => (
                      <div key={chapterIdx} className="border rounded-md p-4">
                        <h3 className="text-lg font-semibold mb-2">{chapter.title}</h3>
                        <ul className="space-y-2">
                          {chapter.lessons.map((lesson, lessonIdx) => (
                            <li key={lessonIdx} className="flex items-center gap-2">
                              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs">
                                {lessonIdx + 1}
                              </span>
                              <span>{lesson.title}</span>
                              {lesson.videoUrl && <Video className="h-4 w-4 text-gray-400" />}
                              {lesson.materials && lesson.materials.length > 0 && 
                                <File className="h-4 w-4 text-gray-400" />}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic">
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">基本信息</TabsTrigger>
                  <TabsTrigger value="content">课程介绍</TabsTrigger>
                  <TabsTrigger value="curriculum">课程大纲</TabsTrigger>
                  <TabsTrigger value="cover">封面图片</TabsTrigger>
                  <TabsTrigger value="pricing">定价</TabsTrigger>
                  <TabsTrigger value="tags">标签</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">课程名称</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">课程简介</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">分类</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instructor">讲师</Label>
                    <Input
                      id="instructor"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="content">课程介绍内容 (Markdown格式)</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="min-h-[200px] font-mono"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="curriculum" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">课程大纲</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addChapter}>
                      添加章节
                    </Button>
                  </div>

                  {chapters.length === 0 ? (
                    <div className="text-center py-8 border rounded-lg border-dashed">
                      <p className="text-gray-500">点击"添加章节"开始创建课程大纲</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {chapters.map((chapter, chapterIdx) => (
                        <div key={chapterIdx} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-4">
                            <div className="w-full">
                              <Input
                                value={chapter.title}
                                onChange={(e) => updateChapterTitle(chapterIdx, e.target.value)}
                                placeholder="章节标题"
                                className="font-medium"
                              />
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => addLesson(chapterIdx)}
                              className="ml-2"
                            >
                              添加课时
                            </Button>
                          </div>

                          {chapter.lessons.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">点击"添加课时"创建本章节的内容</p>
                          ) : (
                            <div className="space-y-4 pl-4">
                              {chapter.lessons.map((lesson, lessonIdx) => (
                                <div key={lessonIdx} className="border-l-2 pl-4 pb-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs">
                                        {lessonIdx + 1}
                                      </span>
                                      <Input
                                        value={lesson.title}
                                        onChange={(e) => updateLessonTitle(chapterIdx, lessonIdx, e.target.value)}
                                        placeholder="课时标题"
                                        className="w-full"
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="mt-2 space-y-2">
                                    <div>
                                      <Label className="text-xs">视频链接</Label>
                                      <div className="flex gap-2">
                                        <Input
                                          value={lesson.videoUrl || ''}
                                          onChange={(e) => updateLessonVideo(chapterIdx, lessonIdx, e.target.value)}
                                          placeholder="输入视频URL或上传视频"
                                          className="flex-1"
                                        />
                                        <Button type="button" variant="outline" size="sm">
                                          <Video className="h-4 w-4 mr-1" />
                                          上传
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <Label className="text-xs">课件资料</Label>
                                      <div className="flex gap-2 mb-2">
                                        <Input
                                          placeholder="输入课件URL或上传文件"
                                          className="flex-1"
                                          id={`material-${chapterIdx}-${lessonIdx}`}
                                        />
                                        <Button 
                                          type="button" 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => {
                                            const input = document.getElementById(`material-${chapterIdx}-${lessonIdx}`) as HTMLInputElement;
                                            if (input.value) {
                                              addLessonMaterial(chapterIdx, lessonIdx, input.value);
                                              input.value = '';
                                            }
                                          }}
                                        >
                                          <File className="h-4 w-4 mr-1" />
                                          添加
                                        </Button>
                                      </div>
                                      
                                      {lesson.materials && lesson.materials.length > 0 && (
                                        <div className="pl-2 space-y-1">
                                          {lesson.materials.map((material, materialIdx) => (
                                            <div key={materialIdx} className="flex items-center text-sm">
                                              <File className="h-3 w-3 mr-1 text-gray-400" />
                                              <span className="truncate flex-1">{material.split('/').pop()}</span>
                                              <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm"
                                                className="h-6 w-6 p-0 text-red-500"
                                                onClick={() => removeLessonMaterial(chapterIdx, lessonIdx, materialIdx)}
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="cover" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>选择封面图片</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {placeholderImages.map((img) => (
                        <div 
                          key={img}
                          className={`relative rounded-lg overflow-hidden cursor-pointer h-40 border-2 ${
                            formData.coverImage === img ? 'border-primary' : 'border-transparent'
                          }`}
                          onClick={() => handleCoverImageSelect(img)}
                        >
                          <img
                            src={`${img}?w=300&h=200&fit=crop`}
                            alt="封面选项"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    
                    {formData.coverImage && (
                      <div className="mt-4">
                        <Label>当前选择的封面</Label>
                        <div className="mt-2 rounded-lg overflow-hidden h-40">
                          <img
                            src={`${formData.coverImage}?w=600&h=300&fit=crop`}
                            alt="当前封面"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <Label htmlFor="customCoverUrl">或输入自定义图片URL</Label>
                      <Input
                        id="customCoverUrl"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="pricing" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isFree"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={(e) => handleInputChange(e)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="isFree">免费课程</Label>
                    </div>
                    
                    {!formData.isFree && (
                      <div className="grid gap-2">
                        <Label htmlFor="price">价格（人民币）</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            ¥
                          </span>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="pl-8"
                            min="0"
                            required={!formData.isFree}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="tags" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tags">标签 (用逗号分隔多个标签)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  {formData.tags && (
                    <div className="mt-2">
                      <Label>预览标签</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                {!isEditing && (
                  <Button type="button" variant="outline" className="mr-2" onClick={() => setPreviewMode(true)}>
                    预览
                  </Button>
                )}
                <Button type="submit">{isEditing ? '保存更改' : '添加课程'}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CoursesManagement;
