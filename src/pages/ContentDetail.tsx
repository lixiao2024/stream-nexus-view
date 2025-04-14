
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import InteractionToolbar from '../components/InteractionToolbar';
import ContentCard, { Content } from '../components/ContentCard';

// Mock data for a single content item
const mockContentDetail = {
  id: '1',
  title: 'Anthropic Releases Claude 3.5: Sets New Performance Benchmarks',
  fullText: `
    <p class="mb-4">Anthropic has unveiled Claude 3.5, featuring significant improvements in reasoning, coding, and multimodal understanding. The model outperforms previous versions across all benchmark tests.</p>
    
    <h2 class="text-xl font-bold mt-6 mb-3">Key Improvements</h2>
    <p class="mb-4">Claude 3.5 demonstrates a 30% improvement in complex reasoning tasks compared to Claude 3, with particularly strong results in mathematics, coding, and multi-step reasoning challenges. The model shows remarkable ability to follow nuanced instructions and maintain context across long interactions.</p>
    
    <h2 class="text-xl font-bold mt-6 mb-3">Technical Specifications</h2>
    <p class="mb-4">Built on a refined architecture, Claude 3.5 features an expanded context window of 150,000 tokens, allowing it to process approximately 300 pages of text in a single prompt. The model incorporates a new training methodology focusing on consistency and reduced hallucinations.</p>
    
    <h2 class="text-xl font-bold mt-6 mb-3">Benchmark Results</h2>
    <p class="mb-4">In standardized evaluations, Claude 3.5 achieved state-of-the-art results on multiple benchmarks:</p>
    <ul class="list-disc ml-6 mb-4">
      <li>MMLU: 92.3% (vs. 89.1% for Claude 3)</li>
      <li>GSM8K: 97.8% (vs. 94.2% for Claude 3)</li>
      <li>HumanEval: 90.5% (vs. 84.7% for Claude 3)</li>
      <li>MATH: 71.2% (vs. 63.5% for Claude 3)</li>
    </ul>
    
    <h2 class="text-xl font-bold mt-6 mb-3">Availability</h2>
    <p class="mb-4">Claude 3.5 is being rolled out initially to enterprise customers with general availability planned within the next month. API access will be priced competitively with existing models, with specific rates to be announced shortly.</p>
  `,
  summary: 'Anthropic has unveiled Claude 3.5, featuring significant improvements in reasoning, coding, and multimodal understanding. The model outperforms previous versions across all benchmark tests.',
  category: 'AI Research',
  date: 'April 12, 2025',
  authors: ['Anthropic Research Team'],
  citations: 0,
  tags: ['LLM', 'Claude', 'AI Model', 'Anthropic'],
};

// Mock related content
const mockRelatedContent: Content[] = [
  {
    id: '7',
    title: 'Comparing Claude 3.5 and GPT-5: A Comprehensive Analysis',
    summary: 'This analysis provides a detailed comparison between the latest models from Anthropic and OpenAI across various performance metrics and use cases.',
    category: 'AI Research',
    date: 'April 13, 2025',
    authors: ['Comparative AI Research Group'],
    citations: 5
  },
  {
    id: '8',
    title: 'Fine-tuning Claude Models for Specialized Industry Applications',
    summary: 'A practical guide to optimizing Claude models for domain-specific tasks, with case studies from healthcare, finance, and legal sectors.',
    category: 'Implementation',
    date: 'April 9, 2025',
    authors: ['Martinez, E.', 'Thompson, J.'],
    citations: 12
  },
  {
    id: '9',
    title: 'The Evolution of Anthropic\'s Claude: From 1.0 to 3.5',
    summary: 'Tracing the development journey of Claude models, highlighting key architectural changes and performance improvements across generations.',
    category: 'AI History',
    date: 'April 7, 2025',
    authors: ['Technical History Institute'],
    citations: 18
  }
];

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const content = mockContentDetail; // In a real app, we would fetch the content based on the ID
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to home</span>
            </Link>
            <h1 className="text-xl font-bold text-primary hidden md:block">TechNexus</h1>
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
                  {content.citations} citations
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
            <h2 className="text-xl font-bold mb-4">Related Content</h2>
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
            <p>© 2025 TechNexus - AI Research & Technology News Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContentDetail;
