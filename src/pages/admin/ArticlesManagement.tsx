
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
import { Plus, MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  authors: string[];
  status: 'published' | 'draft';
  fullText?: string;
  tags?: string[];
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Anthropic发布Claude 3.5：创建新的性能基准',
    summary: 'Anthropic公司推出了Claude 3.5，该版本在推理、编码和多模态理解方面有了显著的改进。',
    category: '人工智能研究',
    date: '2025-04-12',
    authors: ['Anthropic研究团队'],
    status: 'published',
    fullText: `
    <p class="mb-4">Anthropic公司推出了Claude 3.5，该版本在推理、编码和多模态理解方面有了显著的改进。该模型在所有基准测试中都优于以前的版本。</p>
    
    <h2 class="text-xl font-bold mt-6 mb-3">关键改进</h2>
    <p class="mb-4">Claude 3.5在复杂推理任务方面比Claude 3提高了30%，在数学、编码和多步推理挑战方面表现尤为突出。该模型展示了在遵循细微指令和维持长交互上下文方面的卓越能力。</p>
    
    <h2 class="text-xl font-bold mt-6 mb-3">技术规格</h2>
    <p class="mb-4">Claude 3.5基于经过改进的架构构建，具有扩展到150,000个标记的上下文窗口，允许它在单个提示中处理约300页文本。该模型采用新的训练方法，注重一致性和减少幻觉。</p>
    
    <h2 class="text-xl font-bold mt-6 mb-3">基准结果</h2>
    <p class="mb-4">在标准评估中，Claude 3.5在多个基准测试中取得了最先进的结果：</p>
    <ul class="list-disc ml-6 mb-4">
      <li>MMLU：92.3%（Claude 3为89.1%）</li>
      <li>GSM8K：97.8%（Claude 3为94.2%）</li>
      <li>HumanEval：90.5%（Claude 3为84.7%）</li>
      <li>MATH：71.2%（Claude 3为63.5%）</li>
    </ul>
    
    <h2 class="text-xl font-bold mt-6 mb-3">可用性</h2>
    <p class="mb-4">Claude 3.5最初将向企业客户推出，计划在下个月内普遍可用。API访问将以与现有模型具有竞争力的价格提供，具体费率将很快公布。</p>
  `,
    tags: ['LLM', 'Claude', 'AI模型', 'Anthropic'],
  },
  {
    id: '2',
    title: '在Google Gemini代码生成中发现安全漏洞',
    summary: '研究人员已确定Google的Gemini模型生成的代码中存在潜在的安全漏洞。',
    category: '安全',
    date: '2025-04-11',
    authors: ['安全研究小组'],
    status: 'published',
    tags: ['安全', 'Gemini', 'Google', '代码生成'],
  },
  {
    id: '3',
    title: '使用合成数据训练大型语言模型：比较研究',
    summary: '本文探讨了合成数据在训练LLM中的有效性，比较了在不同比例的合成数据与真实数据上训练的模型的性能指标。',
    category: '自然语言处理',
    date: '2025-04-10',
    authors: ['张, L.', '约翰逊, K.', '帕特尔, S.'],
    status: 'published',
    tags: ['LLM', '合成数据', '训练', 'NLP'],
  },
  {
    id: '4',
    title: 'AI辅助医疗诊断最新进展',
    summary: '研究新的AI模型如何协助医生进行更准确的医疗诊断。',
    category: '医疗AI',
    date: '2025-04-08',
    authors: ['医疗研究团队'],
    status: 'draft',
    tags: ['医疗', 'AI诊断', '健康科技'],
  }
];

const ArticlesManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: '',
    authors: '',
    fullText: '',
    tags: ''
  });

  const handleOpenNewArticle = () => {
    setIsEditing(false);
    setFormData({
      title: '',
      summary: '',
      category: '',
      authors: '',
      fullText: '',
      tags: ''
    });
    setPreviewMode(false);
    setOpenDialog(true);
  };

  const handleEditArticle = (article: Article) => {
    setIsEditing(true);
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      summary: article.summary,
      category: article.category,
      authors: article.authors.join(', '),
      fullText: article.fullText || '',
      tags: article.tags ? article.tags.join(', ') : ''
    });
    setPreviewMode(false);
    setOpenDialog(true);
  };

  const handlePreviewArticle = (article: Article) => {
    setIsEditing(false);
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      summary: article.summary,
      category: article.category,
      authors: article.authors.join(', '),
      fullText: article.fullText || '',
      tags: article.tags ? article.tags.join(', ') : ''
    });
    setPreviewMode(true);
    setOpenDialog(true);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "删除成功",
      description: "文章已成功删除",
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
    
    const articleData: Article = {
      id: isEditing && currentArticle ? currentArticle.id : Date.now().toString(),
      title: formData.title,
      summary: formData.summary,
      category: formData.category,
      date: new Date().toISOString().split('T')[0],
      authors: formData.authors.split(',').map(author => author.trim()),
      status: 'draft',
      fullText: formData.fullText,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    if (isEditing && currentArticle) {
      setArticles(articles.map(article => 
        article.id === currentArticle.id ? { ...articleData, status: article.status } : article
      ));
      toast({
        title: "更新成功",
        description: "文章信息已更新",
      });
    } else {
      setArticles([...articles, articleData]);
      toast({
        title: "添加成功",
        description: "新文章已添加",
      });
    }

    setOpenDialog(false);
  };

  const handlePublishToggle = (id: string) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, status: article.status === 'published' ? 'draft' : 'published' } 
        : article
    ));
    
    const article = articles.find(a => a.id === id);
    const newStatus = article?.status === 'published' ? '草稿' : '已发布';
    
    toast({
      title: "状态已更改",
      description: `文章已更改为${newStatus}状态`,
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">文章管理</h1>
          <p className="text-gray-500">管理所有文章内容</p>
        </div>
        <Button onClick={handleOpenNewArticle}>
          <Plus className="mr-2 h-4 w-4" />
          添加文章
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>标题</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>作者</TableHead>
            <TableHead>发布日期</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>{article.authors.join(', ')}</TableCell>
              <TableCell>{article.date}</TableCell>
              <TableCell>
                <Badge 
                  variant={article.status === 'published' ? 'default' : 'outline'}
                  className={article.status === 'published' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                >
                  {article.status === 'published' ? '已发布' : '草稿'}
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
                    <DropdownMenuItem onClick={() => handlePreviewArticle(article)}>
                      <Eye className="mr-2 h-4 w-4" />
                      预览
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditArticle(article)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePublishToggle(article.id)}>
                      {article.status === 'published' ? '设为草稿' : '发布'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteArticle(article.id)}
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
                ? "预览文章" 
                : (isEditing ? "编辑文章" : "添加新文章")}
            </DialogTitle>
            <DialogDescription>
              {previewMode 
                ? "查看文章在前台的显示效果" 
                : (isEditing 
                  ? "修改文章的信息并保存更改。" 
                  : "添加新文章的详细信息。保存后，文章将以草稿状态创建。")}
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
                    {currentArticle?.date || new Date().toISOString().split('T')[0]}
                  </div>
                  <div className="flex items-center">
                    {formData.authors}
                  </div>
                </div>
                
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
              
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: formData.fullText }} 
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic">
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">基本信息</TabsTrigger>
                  <TabsTrigger value="content">文章内容</TabsTrigger>
                  <TabsTrigger value="tags">标签</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">标题</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="summary">摘要</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
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
                    <Label htmlFor="authors">作者 (用逗号分隔多个作者)</Label>
                    <Input
                      id="authors"
                      name="authors"
                      value={formData.authors}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullText">文章内容 (支持HTML/Markdown格式)</Label>
                    <Textarea
                      id="fullText"
                      name="fullText"
                      value={formData.fullText}
                      onChange={handleInputChange}
                      className="min-h-[300px] font-mono"
                    />
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
                    <div className="mt-4">
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
                <Button type="submit">{isEditing ? '保存更改' : '添加文章'}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ArticlesManagement;
