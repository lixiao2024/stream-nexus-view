
import { Content } from '@/components/ContentCard';

export const mockArticles: Content[] = [
  {
    id: 'article-1',
    title: 'GPT-5模型架构详解',
    summary: '深入分析GPT-5的多模态处理能力、上下文窗口扩展及推理性能提升的技术原理',
    category: '技术解析',
    date: '2025-03-12',
    authors: ['李明', '张三'],
    citations: 45,
    tags: ['GPT模型', '大语言模型', '人工智能', '多模态'],
    isHighlighted: true
  },
  {
    id: 'article-2',
    title: '量子计算与大模型训练的交叉应用',
    summary: '探索量子计算如何加速大模型训练过程，以及在高维特征空间中的优化方法',
    category: '前沿研究',
    date: '2025-02-28',
    authors: ['王教授', '陈研究员'],
    citations: 23,
    tags: ['量子计算', '机器学习', '模型训练', '优化算法']
  },
  {
    id: 'article-3',
    title: 'AI安全研究：对抗样本与模型鲁棒性',
    summary: '分析最新对抗样本攻击方法及大模型安全防护策略的研究进展',
    category: '安全研究',
    date: '2025-01-15',
    authors: ['张安全', '李防护'],
    citations: 19,
    tags: ['AI安全', '对抗样本', '模型鲁棒性', '防御策略']
  },
  {
    id: 'article-4',
    title: '多模态融合：视觉-语言模型最新进展',
    summary: '综述视觉与语言信息融合的技术路线，以及在理解和生成任务中的应用',
    category: '综述',
    date: '2025-02-05',
    authors: ['周多模', '吴融合'],
    citations: 36,
    tags: ['多模态', '视觉语言', 'CLIP', '跨模态']
  },
  {
    id: 'article-5',
    title: '分布式训练系统架构设计',
    summary: '从工程实践角度探讨支持千亿参数模型训练的分布式系统架构设计',
    category: '工程实践',
    date: '2025-01-28',
    authors: ['刘工程', '孙架构'],
    citations: 14,
    tags: ['分布式系统', '大规模训练', '系统架构', '工程优化'],
    isHighlighted: true
  },
  {
    id: 'article-6',
    title: '神经网络压缩技术综述',
    summary: '全面分析模型量化、知识蒸馏、剪枝等神经网络压缩技术的最新研究',
    category: '综述',
    date: '2025-03-02',
    authors: ['林压缩', '黄蒸馏'],
    citations: 29,
    tags: ['模型压缩', '知识蒸馏', '量化技术', '模型剪枝']
  },
  {
    id: 'article-7',
    title: '自监督学习在医学影像中的应用',
    summary: '探讨自监督学习范式如何解决医学影像数据标注少的问题及其实际效果',
    category: '应用研究',
    date: '2025-02-18',
    authors: ['张医学', '王影像'],
    citations: 32,
    tags: ['自监督学习', '医学影像', '数据标注', '应用研究']
  },
  {
    id: 'article-8',
    title: '强化学习算法在机器人控制中的应用进展',
    summary: '分析强化学习最新算法在复杂机器人控制任务中的应用效果与挑战',
    category: '技术应用',
    date: '2025-01-10',
    authors: ['李强化', '陈机器人'],
    citations: 21,
    tags: ['强化学习', '机器人控制', '决策系统', 'RL算法']
  }
];
