
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  user: string;
  content: string;
  contentTitle: string;
  contentType: 'course' | 'article';
  date: string;
}

const CommentsManagement: React.FC = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: '张三',
      content: '这个课程非常有用，特别是第三章的内容深入浅出，让我对量子计算有了更深入的理解。',
      contentTitle: '量子计算与AI交叉应用',
      contentType: 'course',
      date: '2025-04-10',
    },
    {
      id: '2',
      user: '李四',
      content: '论文中的方法创新性强，但在实际应用中可能会遇到计算资源的限制。',
      contentTitle: '使用合成数据训练大型语言模型：比较研究',
      contentType: 'article',
      date: '2025-04-11',
    },
    {
      id: '3',
      user: '王五',
      content: '这个安全漏洞确实很严重，希望Google能尽快修复。',
      contentTitle: '在Google Gemini代码生成中发现安全漏洞',
      contentType: 'article',
      date: '2025-04-12',
    },
    {
      id: '4',
      user: '赵六',
      content: '这个内容太基础了，浪费我的时间。',
      contentTitle: '大模型提示工程高级技巧',
      contentType: 'course',
      date: '2025-04-13',
    },
  ]);

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
    toast({
      title: "删除成功",
      description: "评论已成功删除",
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">评论管理</h1>
        <p className="text-gray-500">管理用户评论</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>用户</TableHead>
            <TableHead>评论内容</TableHead>
            <TableHead>关联内容</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>日期</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell className="font-medium">{comment.user}</TableCell>
              <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
              <TableCell className="truncate max-w-[150px]">{comment.contentTitle}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {comment.contentType === 'course' ? '课程' : '文章'}
                </Badge>
              </TableCell>
              <TableCell>{comment.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="text-red-600"
                  onClick={() => handleDeleteComment(comment.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  删除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default CommentsManagement;
