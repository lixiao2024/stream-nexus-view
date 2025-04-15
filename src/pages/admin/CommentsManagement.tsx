
import React from 'react';
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
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommentsManagement: React.FC = () => {
  const comments = [
    {
      id: '1',
      user: '张三',
      content: '这个课程非常有用，特别是第三章的内容深入浅出，让我对量子计算有了更深入的理解。',
      contentTitle: '量子计算与AI交叉应用',
      contentType: 'course',
      date: '2025-04-10',
      status: 'approved',
    },
    {
      id: '2',
      user: '李四',
      content: '论文中的方法创新性强，但在实际应用中可能会遇到计算资源的限制。',
      contentTitle: '使用合成数据训练大型语言模型：比较研究',
      contentType: 'article',
      date: '2025-04-11',
      status: 'pending',
    },
    {
      id: '3',
      user: '王五',
      content: '这个安全漏洞确实很严重，希望Google能尽快修复。',
      contentTitle: '在Google Gemini代码生成中发现安全漏洞',
      contentType: 'article',
      date: '2025-04-12',
      status: 'approved',
    },
    {
      id: '4',
      user: '赵六',
      content: '这个内容太基础了，浪费我的时间。',
      contentTitle: '大模型提示工程高级技巧',
      contentType: 'course',
      date: '2025-04-13',
      status: 'rejected',
    },
  ];

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
            <TableHead>状态</TableHead>
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
              <TableCell>
                <Badge 
                  variant={comment.status === 'pending' ? 'outline' : 'default'}
                  className={
                    comment.status === 'approved' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : comment.status === 'rejected'
                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                      : ''
                  }
                >
                  {comment.status === 'approved' 
                    ? '已通过' 
                    : comment.status === 'rejected' 
                    ? '已拒绝' 
                    : '待审核'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {comment.status === 'pending' && (
                  <>
                    <Button variant="ghost" size="icon" className="text-green-600">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {comment.status !== 'pending' && (
                  <Button variant="ghost" size="sm" className="text-red-600">
                    删除
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default CommentsManagement;
