
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BookOpen, MessageSquare } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: '用户总数', value: '1,254', icon: <Users className="h-8 w-8 text-blue-500" /> },
    { title: '文章总数', value: '523', icon: <FileText className="h-8 w-8 text-purple-500" /> },
    { title: '课程总数', value: '48', icon: <BookOpen className="h-8 w-8 text-green-500" /> },
    { title: '评论总数', value: '3,782', icon: <MessageSquare className="h-8 w-8 text-yellow-500" /> },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">欢迎回来，管理员</h1>
        <p className="text-gray-500">管理您的平台内容和用户</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近发布的文章</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="border-b pb-3">
                <div className="font-medium">Anthropic发布Claude 3.5：创建新的性能基准</div>
                <div className="text-sm text-gray-500">发布于 2025-04-12</div>
              </li>
              <li className="border-b pb-3">
                <div className="font-medium">在Google Gemini代码生成中发现安全漏洞</div>
                <div className="text-sm text-gray-500">发布于 2025-04-11</div>
              </li>
              <li>
                <div className="font-medium">使用合成数据训练大型语言模型：比较研究</div>
                <div className="text-sm text-gray-500">发布于 2025-04-10</div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近注册的用户</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="border-b pb-3">
                <div className="font-medium">张三</div>
                <div className="text-sm text-gray-500">注册于 2025-04-12</div>
              </li>
              <li className="border-b pb-3">
                <div className="font-medium">李四</div>
                <div className="text-sm text-gray-500">注册于 2025-04-11</div>
              </li>
              <li>
                <div className="font-medium">王五</div>
                <div className="text-sm text-gray-500">注册于 2025-04-10</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
