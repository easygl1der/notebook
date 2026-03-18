import { motion } from 'framer-motion';
import { 
  Headphones, 
  Presentation, 
  Video, 
  GitGraph, 
  FileBarChart, 
  Layers,
  HelpCircle,
  Info,
  Table,
  MoreVertical,
  Sparkles
} from 'lucide-react';
import type { Notebook } from '@/types';

interface StudioPanelProps {
  notebook: Notebook;
}

const studioTools = [
  {
    id: 'audio-overview',
    name: 'Audio Overview',
    icon: Headphones,
    description: 'Convert docs to podcast',
    color: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
  },
  {
    id: 'slide-deck',
    name: 'Slide Deck',
    icon: Presentation,
    description: 'Generate presentation',
    color: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
  },
  {
    id: 'video-overview',
    name: 'Video Overview',
    icon: Video,
    description: 'Create video summary',
    color: 'bg-green-50 hover:bg-green-100 text-green-600',
  },
  {
    id: 'mind-map',
    name: 'Mind Map',
    icon: GitGraph,
    description: 'Visualize connections',
    color: 'bg-amber-50 hover:bg-amber-100 text-amber-600',
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: FileBarChart,
    description: 'Generate reports',
    color: 'bg-rose-50 hover:bg-rose-100 text-rose-600',
  },
  {
    id: 'flashcards',
    name: 'Flashcards',
    icon: Layers,
    description: 'Study materials',
    color: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-600',
  },
  {
    id: 'quiz',
    name: 'Quiz',
    icon: HelpCircle,
    description: 'Test your knowledge',
    color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600',
  },
  {
    id: 'infographic',
    name: 'Infographic',
    icon: Info,
    description: 'Visual summary',
    color: 'bg-pink-50 hover:bg-pink-100 text-pink-600',
  },
  {
    id: 'data-table',
    name: 'Data Table',
    icon: Table,
    description: 'Organize data',
    color: 'bg-teal-50 hover:bg-teal-100 text-teal-600',
  },
];

interface StudioOutput {
  id: string;
  title: string;
  type: string;
  sources: number;
  timeAgo: string;
}

const sampleOutputs: StudioOutput[] = [
  {
    id: '1',
    title: '关于"等变上同调与舒伯特演算"系列文献的学术汇报大纲',
    type: 'Create Your Own',
    sources: 9,
    timeAgo: '8d ago',
  },
  {
    id: '2',
    title: '模空间与枚举几何中的定位技术：跨越拓扑基础与代数应用的研究战略框架',
    type: 'Research Strategy Paper',
    sources: 9,
    timeAgo: '8d ago',
  },
  {
    id: '3',
    title: '代数几何等变上同调理论大纲',
    type: '',
    sources: 9,
    timeAgo: '8d ago',
  },
];

export function StudioPanel({ notebook: _notebook }: StudioPanelProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white/50 border-l border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Studio</h2>
        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Tools Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {studioTools.map((tool, index) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${tool.color}`}
            >
              <tool.icon className="w-5 h-5 mb-1.5" />
              <span className="text-xs font-medium text-center leading-tight">{tool.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Outputs Section */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 pb-4">
        <div className="space-y-3">
          {sampleOutputs.map((output, index) => (
            <motion.div
              key={output.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="group p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
                    {output.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    {output.type && (
                      <span className="text-xs text-gray-500">{output.type}</span>
                    )}
                    <span className="text-xs text-gray-400">
                      {output.sources} sources · {output.timeAgo}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-all">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sampleOutputs.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gray-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Studio output will be saved here.</p>
            <p className="text-xs text-gray-400 mt-1">
              After adding sources, click to add Audio Overview, Study Guide, Mind Map, and more!
            </p>
          </div>
        )}
      </div>

      {/* Add Note Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
          <span className="text-lg">+</span>
          Add note
        </button>
      </div>
    </div>
  );
}
