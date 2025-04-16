
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Upload, Save, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  userName: z.string().min(2, {
    message: '用户名至少需要2个字符',
  }),
  email: z.string().email({
    message: '请输入有效的电子邮件地址',
  }),
  bio: z.string().optional(),
});

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      email: '',
      bio: '',
    },
  });

  useEffect(() => {
    // 检查用户是否登录
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);
    
    // 获取用户信息
    const storedAvatar = localStorage.getItem('userAvatar');
    const storedName = localStorage.getItem('userName') || '用户';
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedBio = localStorage.getItem('userBio') || '';
    
    setAvatar(storedAvatar);
    setUserName(storedName);
    setEmail(storedEmail);
    setBio(storedBio);
    
    form.reset({
      userName: storedName,
      email: storedEmail,
      bio: storedBio,
    });
  }, [navigate, form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAvatar(result);
        
        // 立即保存头像到 localStorage
        localStorage.setItem('userAvatar', result);
        
        toast({
          title: "头像已更新",
          description: "您的头像已成功上传并保存",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // 保存用户信息到 localStorage
    localStorage.setItem('userName', values.userName);
    localStorage.setItem('userEmail', values.email);
    localStorage.setItem('userBio', values.bio || '');
    
    if (avatar) {
      localStorage.setItem('userAvatar', avatar);
    }
    
    toast({
      title: "个人资料已更新",
      description: "您的个人资料已成功保存",
    });
  };

  if (!isLoggedIn) {
    return null; // 如果未登录，渲染为空，防止在跳转前闪烁
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Header - 复用首页样式 */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <div className="relative mr-2">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur"></span>
                <h1 className="relative text-2xl font-bold text-white mr-2">灵境AI-lab</h1>
              </div>
              <span className="text-sm text-blue-400">前沿知识与AI研究分享</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">个人中心</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">个人资料</TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-blue-600">我的课程</TabsTrigger>
              <TabsTrigger value="comments" className="data-[state=active]:bg-blue-600">我的评论</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <CardTitle>头像</CardTitle>
                    <CardDescription className="text-gray-400">上传或更改您的个人头像</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      {avatar ? (
                        <AvatarImage src={avatar} alt={userName} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                          {userName.substring(0, 1).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <label htmlFor="avatar-upload">
                      <div className="flex items-center cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                        <Upload className="h-4 w-4 mr-2" />
                        <span>上传头像</span>
                      </div>
                      <input 
                        type="file" 
                        id="avatar-upload" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2 bg-gray-800/60 border-gray-700">
                  <CardHeader>
                    <CardTitle>个人信息</CardTitle>
                    <CardDescription className="text-gray-400">更新您的个人资料信息</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="userName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>用户名</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="请输入用户名" 
                                  className="bg-gray-700 border-gray-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>电子邮件</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="请输入电子邮件" 
                                  className="bg-gray-700 border-gray-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>个人简介</FormLabel>
                              <FormControl>
                                <textarea 
                                  className="w-full rounded-md p-2 bg-gray-700 border border-gray-600 text-gray-100"
                                  rows={4}
                                  placeholder="简单介绍一下自己..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          <Save className="h-4 w-4 mr-2" />
                          保存资料
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card className="bg-gray-800/60 border-gray-700">
                <CardHeader>
                  <CardTitle>我的课程</CardTitle>
                  <CardDescription className="text-gray-400">查看您已报名的课程</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6 text-gray-400">
                    <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>您尚未报名任何课程</p>
                    <Button variant="outline" className="mt-4 border-gray-600 hover:bg-gray-700" asChild>
                      <Link to="/">浏览课程</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comments">
              <Card className="bg-gray-800/60 border-gray-700">
                <CardHeader>
                  <CardTitle>我的评论</CardTitle>
                  <CardDescription className="text-gray-400">查看您发表的所有评论</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6 text-gray-400">
                    <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>您尚未发表任何评论</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 灵境AI-lab - 人工智能前沿研究与知识分享平台</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
