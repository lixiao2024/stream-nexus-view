
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, Bar, Line, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { Users, FileText, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';

// 模拟数据
const userActivityData = [
  { date: '2025-03-15', 访客: 145, 新注册: 18 },
  { date: '2025-03-16', 访客: 132, 新注册: 14 },
  { date: '2025-03-17', 访客: 159, 新注册: 21 },
  { date: '2025-03-18', 访客: 187, 新注册: 25 },
  { date: '2025-03-19', 访客: 262, 新注册: 32 },
  { date: '2025-03-20', 访客: 214, 新注册: 28 },
  { date: '2025-03-21', 访客: 193, 新注册: 20 },
  { date: '2025-03-22', 访客: 208, 新注册: 24 },
  { date: '2025-03-23', 访客: 229, 新注册: 27 },
  { date: '2025-03-24', 访客: 251, 新注册: 29 },
  { date: '2025-03-25', 访客: 267, 新注册: 31 },
  { date: '2025-03-26', 访客: 282, 新注册: 35 },
  { date: '2025-03-27', 访客: 315, 新注册: 42 },
  { date: '2025-03-28', 访客: 345, 新注册: 47 },
  { date: '2025-03-29', 访客: 369, 新注册: 53 },
  { date: '2025-03-30', 访客: 392, 新注册: 56 },
  { date: '2025-03-31', 访客: 408, 新注册: 62 },
  { date: '2025-04-01', 访客: 429, 新注册: 67 },
  { date: '2025-04-02', 访客: 462, 新注册: 71 },
  { date: '2025-04-03', 访客: 475, 新注册: 75 },
  { date: '2025-04-04', 访客: 498, 新注册: 82 },
  { date: '2025-04-05', 访客: 512, 新注册: 89 },
  { date: '2025-04-06', 访客: 546, 新注册: 94 },
  { date: '2025-04-07', 访客: 583, 新注册: 102 },
  { date: '2025-04-08', 访客: 621, 新注册: 110 },
  { date: '2025-04-09', 访客: 654, 新注册: 115 },
  { date: '2025-04-10', 访客: 687, 新注册: 123 },
  { date: '2025-04-11', 访客: 721, 新注册: 128 },
  { date: '2025-04-12', 访客: 756, 新注册: 132 },
  { date: '2025-04-13', 访客: 798, 新注册: 137 },
  { date: '2025-04-14', 访客: 856, 新注册: 142 },
  { date: '2025-04-15', 访客: 892, 新注册: 149 },
];

const contentCategories = [
  { name: '人工智能研究', 文章数: 28, 访问量: 12650 },
  { name: '自然语言处理', 文章数: 23, 访问量: 10980 },
  { name: '计算机视觉', 文章数: 16, 访问量: 8320 },
  { name: '机器学习', 文章数: 21, 访问量: 9780 },
  { name: '安全', 文章数: 14, 访问量: 6520 },
  { name: '医疗AI', 文章数: 9, 访问量: 4120 },
  { name: '机器人学', 文章数: 7, 访问量: 3250 },
];

const courseEnrollmentData = [
  { name: '量子计算与AI交叉应用', 学生数: 89 },
  { name: '大模型提示工程高级技巧', 学生数: 156 },
  { name: '多模态AI系统架构设计', 学生数: 73 },
  { name: '下一代AI模型预测与展望', 学生数: 0 },
];

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">控制台</h1>
          <p className="text-gray-500">网站数据概览</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">访客总数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">今日新增 +42</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">文章总数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">118</div>
            <p className="text-xs text-muted-foreground">本周新增 +8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">课程总数</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">本月新增 +1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">评论总数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,578</div>
            <p className="text-xs text-muted-foreground">今日新增 +29</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visitors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="visitors">访客数据</TabsTrigger>
          <TabsTrigger value="content">内容分析</TabsTrigger>
          <TabsTrigger value="courses">课程数据</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visitors">
          <Card>
            <CardHeader>
              <CardTitle>网站访客与用户增长</CardTitle>
              <CardDescription>过去30天的访客数量和新注册用户趋势</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  "访客": {
                    color: "#8884d8"
                  },
                  "新注册": {
                    color: "#82ca9d"
                  }
                }}
              >
                <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="访客" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisits)" />
                  <Area type="monotone" dataKey="新注册" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRegistrations)" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>内容分类统计</CardTitle>
              <CardDescription>各分类的文章数量与访问量对比</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  "文章数": {
                    color: "#8884d8"
                  },
                  "访问量": {
                    color: "#82ca9d"
                  }
                }}
              >
                <BarChart data={contentCategories} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="文章数" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="访问量" fill="#82ca9d" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>课程学生数据</CardTitle>
              <CardDescription>各课程的学生注册数量</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  "学生数": {
                    color: "#8884d8"
                  }
                }}
              >
                <BarChart layout="vertical" data={courseEnrollmentData} margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" width={150} dataKey="name" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="学生数" fill="#8884d8" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
