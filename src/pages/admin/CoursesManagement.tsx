
import React from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

const CoursesManagement: React.FC = () => {
  const courses = [
    {
      id: '1',
      title: '量子计算与AI交叉应用',
      category: '量子计算',
      instructor: 'Dr. 张明',
      students: 89,
      status: 'published',
    },
    {
      id: '2',
      title: '大模型提示工程高级技巧',
      category: '提示工程',
      instructor: 'Prof. 李楠',
      students: 156,
      status: 'published',
    },
    {
      id: '3',
      title: '多模态AI系统架构设计',
      category: '系统架构',
      instructor: 'Dr. 王强',
      students: 73,
      status: 'published',
    },
    {
      id: '4',
      title: '下一代AI模型预测与展望',
      category: 'AI研究',
      instructor: '研究团队',
      students: 0,
      status: 'draft',
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">课程管理</h1>
          <p className="text-gray-500">管理所有课程内容</p>
        </div>
        <Button>
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
                <Button variant="ghost" size="sm">编辑</Button>
                <Button variant="ghost" size="sm" className="text-red-600">删除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default CoursesManagement;
