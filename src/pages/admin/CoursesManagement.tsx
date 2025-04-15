
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
import { Plus, MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  },
  {
    id: '2',
    title: '大模型提示工程高级技巧',
    description: '掌握大型语言模型的提示工程技术，学习如何设计有效提示以获得最佳生成结果。',
    category: '提示工程',
    instructor: 'Prof. 李楠',
    students: 156,
    status: 'published',
    tags: ['LLM', '提示工程', 'AI应用'],
  },
  {
    id: '3',
    title: '多模态AI系统架构设计',
    description: '学习如何设计和实现处理文本、图像和音频的多模态AI系统架构。',
    category: '系统架构',
    instructor: 'Dr. 王强',
    students: 73,
    status: 'published',
    tags: ['多模态', '系统架构', 'AI设计'],
  },
  {
    id: '4',
    title: '下一代AI模型预测与展望',
    description: '分析人工智能领域的发展趋势，预测下一代模型的能力和应用场景。',
    category: 'AI研究',
    instructor: '研究团队',
    students: 0,
    status: 'draft',
    tags: ['AI未来', '前沿研究', '技术展望'],
  },
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
    tags: ''
  });

  const handleOpenNewCourse = () => {
    setIsEditing(false);
    setFormData({
      title: '',
      description: '',
      category: '',
      instructor: '',
      content: '',
      tags: ''
    });
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
      tags: course.tags ? course.tags.join(', ') : ''
    });
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
      tags: course.tags ? course.tags.join(', ') : ''
    });
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      tags: formData.tags.split(',').map(tag => tag.trim())
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
            <TableHead>课程名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>讲师</TableHead>
            <TableHead>学生数</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.category}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>{course.students}</TableCell>
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
        <DialogContent className={previewMode ? "sm:max-w-[800px]" : "sm:max-w-[725px]"}>
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
                <div 
                  className="prose max-w-none mt-6" 
                  dangerouslySetInnerHTML={{ __html: formData.content }} 
                />
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
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
                <div className="grid gap-2">
                  <Label htmlFor="content">课程内容 (支持HTML/Markdown格式)</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="min-h-[200px] font-mono"
                  />
                </div>
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
              </div>
              <DialogFooter>
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
