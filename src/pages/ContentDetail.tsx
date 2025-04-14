
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import InteractionToolbar from '../components/InteractionToolbar';
import ContentCard, { Content } from '../components/ContentCard';

// 模拟单个内容项的数据
const mockContentDetail = {
  id: '1',
  title: 'Anthropic发布Claude 3.5：创建新的性能基准',
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
  summary: 'Anthropic公司推出了Claude 3.5，该版本在推理、编码和多模态理解方面有了显著的改进。该模型在所有基准测试中都优于以前的版本。',
  category: '人工智能研究',
  date: '2025年4月12日',
  authors: ['Anthropic研究团队'],
  citations: 0,
  tags: ['LLM', 'Claude', 'AI模型', 'Anthropic'],
};

// 模拟相关内容
const mockRelatedContent: Content[] = [
  {
    id: '7',
    title: '比较Claude 3.5和GPT-5：综合分析',
    summary: '这项分析提供了Anthropic和OpenAI最新模型在各种性能指标和用例方面的详细比较。',
    category: '人工智能研究',
    date: '2025年4月13日',
    authors: ['比较AI研究小组'],
    citations: 5
  },
  {
    id: '8',
    title: '为专业行业应用微调Claude模型',
    summary: '一份关于优化Claude模型用于特定领域任务的实用指南，包括来自医疗保健、金融和法律部门的案例研究。',
    category: '实施应用',
    date: '2025年4月9日',
    authors: ['马丁内斯, E.', '汤普森, J.'],
    citations: 12
  },
  {
    id: '9',
    title: 'Anthropic的Claude演变：从1.0到3.5',
    summary: '追踪Claude模型的发展历程，重点介绍各世代间的关键架构变化和性能改进。',
    category: 'AI历史',
    date: '2025年4月7日',
    authors: ['技术历史研究所'],
    citations: 18
  }
];

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const content = mockContentDetail; // 在实际应用中，我们会根据ID获取内容
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary">
              <ArrowLeft size={20} className="mr-2" />
              <span>返回首页</span>
            </Link>
            <h1 className="text-xl font-bold text-primary hidden md:block">技术视界</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <article className="max-w-3xl mx-auto">
          {/* Content Header */}
          <div className="mb-6">
            <div className="mb-2">
              <Badge variant="outline" className="mb-2">
                {content.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
            </div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {content.date}
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                {content.authors.join(', ')}
              </div>
              {content.citations !== undefined && (
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  {content.citations} 引用
                </div>
              )}
            </div>
            
            {content.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {content.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          {/* Content Body */}
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: content.fullText }} 
          />
          
          <Separator className="my-6" />
          
          {/* Interaction Toolbar */}
          <InteractionToolbar contentId={content.id} />
          
          {/* Related Content */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">相关内容</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mockRelatedContent.map(item => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 技术视界 - 人工智能研究与技术新闻平台</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContentDetail;
