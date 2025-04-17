
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, BookOpen } from 'lucide-react';

export interface Content {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  authors: string[];
  citations?: number;
  tags?: string[];
  isHighlighted?: boolean;
  coverImage?: string;
}

// 为推荐内容的模拟数据
export const mockRecommendedContent: Content[] = [
  {
    id: '1',
    title: 'Anthropic发布Claude 3.5：创建新的性能基准',
    summary: 'Anthropic公司推出了Claude 3.5，该版本在推理、编码和多模态理解方面有了显著的改进。该模型在所有基准测试中都优于以前的版本。',
    category: '人工智能研究',
    date: '2025年4月12日',
    authors: ['Anthropic研究团队'],
    isHighlighted: true,
    coverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    tags: ['Claude', 'AI', 'LLM', 'Anthropic']
  },
  {
    id: '2',
    title: '在Google Gemini代码生成中发现安全漏洞',
    summary: '研究人员已确定Google的Gemini模型生成的代码中存在潜在的安全漏洞。如果在没有审查的情况下实施，该漏洞可能导致系统意外访问。',
    category: '安全',
    date: '2025年4月11日',
    authors: ['安全研究小组'],
    isHighlighted: true,
    coverImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
    tags: ['Gemini', 'Google', '安全', '代码生成']
  },
  {
    id: '3',
    title: '使用合成数据训练大型语言模型：比较研究',
    summary: '本文探讨了合成数据在训练LLM中的有效性，比较了在不同比例的合成数据与真实数据上训练的模型的性能指标。',
    category: '自然语言处理',
    date: '2025年4月10日',
    authors: ['张, L.', '约翰逊, K.', '帕特尔, S.'],
    citations: 42,
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    tags: ['LLM', '合成数据', '训练']
  },
  {
    id: '4',
    title: '用于自动驾驶车辆实时物体检测的视觉Transformer',
    summary: '一种实现视觉Transformer (ViT)用于高速、低延迟物体检测的新方法，专为自动驾驶系统优化。',
    category: '计算机视觉',
    date: '2025年4月8日',
    authors: ['李, J.', '加西亚, M.', '金, H.'],
    citations: 37,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    tags: ['ViT', '自动驾驶', '物体检测']
  },
  {
    id: '5',
    title: '面向特定领域应用的高效提示工程技术',
    summary: '这份全面指南提供了系统的提示工程方法，适用于医疗保健、金融和法律应用等专业领域。',
    category: '自然语言处理',
    date: '2025年4月7日',
    authors: ['罗德里格斯, A.', '史密斯, T.'],
    citations: 19,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    tags: ['提示工程', '领域特定', 'AI应用']
  },
  {
    id: '6',
    title: '用于机器人协调的多代理强化学习',
    summary: '一个通过分布式强化学习算法训练多个机器人代理在复杂物理任务上高效协作的框架。',
    category: '机器人学',
    date: '2025年4月6日',
    authors: ['王, R.', '伊万诺夫, A.', '穆勒, K.'],
    citations: 28,
    coverImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    tags: ['强化学习', '机器人协作', '多代理']
  }
];

const ContentRow: React.FC<{ content: Content }> = ({ content }) => {
  // Function to get badge color based on category
  const getBadgeStyle = (category: string) => {
    const categories: Record<string, string> = {
      '人工智能研究': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      '安全': 'bg-red-100 text-red-800 hover:bg-red-200',
      '自然语言处理': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      '计算机视觉': 'bg-green-100 text-green-800 hover:bg-green-200',
      '机器人学': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    };
    
    return categories[category] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  return (
    <Link to={`/content/${content.id}`}>
      <div className={`flex gap-4 p-4 rounded-lg border ${content.isHighlighted ? 'border-blue-500 bg-blue-500/5' : 'border-gray-800 hover:border-gray-700'} transition-all duration-300 hover:bg-black/20`}>
        {/* 封面图 */}
        <div className="shrink-0">
          <div className="w-[120px] h-[80px] rounded-lg overflow-hidden bg-gray-800">
            {content.coverImage && (
              <img 
                src={`${content.coverImage}?w=240&auto=format&fit=crop`} 
                alt={content.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        
        {/* 内容 */}
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className={`font-bold ${content.isHighlighted ? 'text-blue-400' : 'text-gray-100'}`}>
              {content.title}
            </h3>
            <Badge variant="outline" className={`text-xs shrink-0 ${getBadgeStyle(content.category)}`}>
              {content.category}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-400 line-clamp-1 mb-2">
            {content.summary}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {content.date}
            </div>
            <div className="flex items-center">
              <Users size={12} className="mr-1" />
              {content.authors.slice(0, 2).join(', ')}
              {content.authors.length > 2 && ' 等'}
            </div>
            {content.citations !== undefined && (
              <div className="flex items-center">
                <BookOpen size={12} className="mr-1" />
                {content.citations} 引用
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const RecommendedFeed: React.FC = () => {
  // 前两个是突出显示的（今日头条）
  const headlines = mockRecommendedContent.slice(0, 2);
  const regularContent = mockRecommendedContent.slice(2);

  return (
    <div className="space-y-6">
      {headlines.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3">今日头条</h2>
          <div className="space-y-3">
            {headlines.map(content => (
              <ContentRow key={content.id} content={content} />
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-bold mb-3">为您推荐</h2>
        <div className="space-y-3">
          {regularContent.map(content => (
            <ContentRow key={content.id} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedFeed;
