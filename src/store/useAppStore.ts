import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notebook, Source, Message, ViewMode } from '@/types';

interface AppState {
  currentView: ViewMode;
  selectedNotebookId: string | null;
  notebooks: Notebook[];
  
  // Actions
  setView: (view: ViewMode) => void;
  selectNotebook: (id: string | null) => void;
  createNotebook: (title?: string) => string;
  deleteNotebook: (id: string) => void;
  updateNotebook: (id: string, updates: Partial<Notebook>) => void;
  addSource: (notebookId: string, source: Omit<Source, 'id' | 'createdAt'>) => void;
  removeSource: (notebookId: string, sourceId: string) => void;
  addMessage: (notebookId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const getRandomEmoji = () => {
  const emojis = ['📚', '📖', '📝', '🔬', '🧬', '💻', '🤖', '🧠', '📊', '🎯', '💡', '🔍', '📈', '🎓', '🔬', '🧪'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const getRandomColor = () => {
  const colors = [
    'bg-gradient-to-br from-amber-100 to-orange-50',
    'bg-gradient-to-br from-blue-100 to-cyan-50',
    'bg-gradient-to-br from-green-100 to-emerald-50',
    'bg-gradient-to-br from-purple-100 to-violet-50',
    'bg-gradient-to-br from-pink-100 to-rose-50',
    'bg-gradient-to-br from-indigo-100 to-blue-50',
    'bg-gradient-to-br from-teal-100 to-cyan-50',
    'bg-gradient-to-br from-red-100 to-pink-50',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const initialNotebooks: Notebook[] = [
  {
    id: '1',
    title: 'Secrets of the Super Agers',
    description: 'Research on longevity and aging',
    emoji: '🧬',
    color: 'bg-gradient-to-br from-green-100 to-emerald-50',
    sources: [
      { id: 's1', name: 'SuperAgers_Study.pdf', type: 'pdf', size: '2.4 MB', createdAt: new Date('2025-05-06') },
      { id: 's2', name: 'Longevity_Research.pdf', type: 'pdf', size: '1.8 MB', createdAt: new Date('2025-05-06') },
    ],
    messages: [],
    createdAt: new Date('2025-05-06'),
    updatedAt: new Date('2025-05-06'),
    isFeatured: true,
  },
  {
    id: '2',
    title: '三重舒伯特演算的格雷厄姆正定性',
    description: 'Mathematics research on Schubert calculus',
    emoji: '📐',
    color: 'bg-gradient-to-br from-blue-100 to-cyan-50',
    sources: [
      { id: 's3', name: '0106268v2.pdf', type: 'pdf', size: '1.2 MB', createdAt: new Date('2026-03-09') },
      { id: 's4', name: '2309.00467v1.pdf', type: 'pdf', size: '890 KB', createdAt: new Date('2026-03-09') },
      { id: 's5', name: '2401.11060v1.pdf', type: 'pdf', size: '1.5 MB', createdAt: new Date('2026-03-09') },
    ],
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '首先你跟我讲一讲一般的schubert版本的该怎么证明',
        timestamp: new Date('2026-03-17'),
      },
      {
        id: 'm2',
        role: 'assistant',
        content: '证明一般的经典双舒伯特多项式乘积的正性（例如 Fan, Guo, Xiong 以及 Samuel 等人的工作），在组合层面上主要是通过**递推关系**与**可积格点模型（Integrable Lattice Models）**来完成的。\n\n整个证明的核心逻辑可以高度概括为以下三步：\n\n1. **建立代数递推**：首先，利用代数上的降阶差分算子（Demazure operators），证明目标系数满足一套严格的递推关系...',
        timestamp: new Date('2026-03-17'),
      },
    ],
    createdAt: new Date('2026-03-09'),
    updatedAt: new Date('2026-03-17'),
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Graph Networks and Quasi-Likelihood',
    description: 'Machine learning research',
    emoji: '📊',
    color: 'bg-gradient-to-br from-purple-100 to-violet-50',
    sources: [
      { id: 's6', name: 'Graph_Networks.pdf', type: 'pdf', size: '3.1 MB', createdAt: new Date('2025-11-26') },
    ],
    messages: [],
    createdAt: new Date('2025-11-26'),
    updatedAt: new Date('2025-11-26'),
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Munkres《拓扑学》: 集合论与逻辑',
    description: 'Topology study notes',
    emoji: '📖',
    color: 'bg-gradient-to-br from-amber-100 to-orange-50',
    sources: [
      { id: 's7', name: 'Topology_Ch1.pdf', type: 'pdf', size: '2.0 MB', createdAt: new Date('2026-03-12') },
    ],
    messages: [],
    createdAt: new Date('2026-03-12'),
    updatedAt: new Date('2026-03-12'),
    isFeatured: false,
  },
  {
    id: '5',
    title: '科技论文写作',
    description: 'Academic writing guide',
    emoji: '✍️',
    color: 'bg-gradient-to-br from-pink-100 to-rose-50',
    sources: [
      { id: 's8', name: 'Writing_Guide.pdf', type: 'pdf', size: '1.6 MB', createdAt: new Date('2026-03-09') },
    ],
    messages: [],
    createdAt: new Date('2026-03-09'),
    updatedAt: new Date('2026-03-09'),
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Bayesian Inference',
    description: 'Statistical methods',
    emoji: '📈',
    color: 'bg-gradient-to-br from-indigo-100 to-blue-50',
    sources: [
      { id: 's9', name: 'Bayesian_Methods.pdf', type: 'pdf', size: '2.8 MB', createdAt: new Date('2026-03-02') },
    ],
    messages: [],
    createdAt: new Date('2026-03-02'),
    updatedAt: new Date('2026-03-02'),
    isFeatured: false,
  },
  {
    id: '7',
    title: 'openai',
    description: 'OpenAI research papers',
    emoji: '🤖',
    color: 'bg-gradient-to-br from-teal-100 to-cyan-50',
    sources: [
      { id: 's10', name: 'GPT4_Paper.pdf', type: 'pdf', size: '4.2 MB', createdAt: new Date('2026-03-08') },
    ],
    messages: [],
    createdAt: new Date('2026-03-08'),
    updatedAt: new Date('2026-03-08'),
    isFeatured: false,
  },
  {
    id: '8',
    title: 'Claude 智能代理集群',
    description: 'AI agent systems',
    emoji: '🧠',
    color: 'bg-gradient-to-br from-red-100 to-pink-50',
    sources: [
      { id: 's11', name: 'Claude_Agents.pdf', type: 'pdf', size: '1.9 MB', createdAt: new Date('2026-03-05') },
    ],
    messages: [],
    createdAt: new Date('2026-03-05'),
    updatedAt: new Date('2026-03-05'),
    isFeatured: false,
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, _get) => ({
      currentView: 'home',
      selectedNotebookId: null,
      notebooks: initialNotebooks,

      setView: (view) => set({ currentView: view }),

      selectNotebook: (id) => {
        set({ 
          selectedNotebookId: id,
          currentView: id ? 'notebook' : 'home'
        });
      },

      createNotebook: (title = 'Untitled notebook') => {
        const id = generateId();
        const newNotebook: Notebook = {
          id,
          title,
          emoji: getRandomEmoji(),
          color: getRandomColor(),
          sources: [],
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          notebooks: [newNotebook, ...state.notebooks],
        }));
        return id;
      },

      deleteNotebook: (id) => {
        set((state) => ({
          notebooks: state.notebooks.filter((n) => n.id !== id),
          selectedNotebookId: state.selectedNotebookId === id ? null : state.selectedNotebookId,
          currentView: state.selectedNotebookId === id ? 'home' : state.currentView,
        }));
      },

      updateNotebook: (id, updates) => {
        set((state) => ({
          notebooks: state.notebooks.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date() } : n
          ),
        }));
      },

      addSource: (notebookId, source) => {
        const newSource: Source = {
          ...source,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          notebooks: state.notebooks.map((n) =>
            n.id === notebookId
              ? { ...n, sources: [...n.sources, newSource], updatedAt: new Date() }
              : n
          ),
        }));
      },

      removeSource: (notebookId, sourceId) => {
        set((state) => ({
          notebooks: state.notebooks.map((n) =>
            n.id === notebookId
              ? { ...n, sources: n.sources.filter((s) => s.id !== sourceId), updatedAt: new Date() }
              : n
          ),
        }));
      },

      addMessage: (notebookId, message) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          timestamp: new Date(),
        };
        set((state) => ({
          notebooks: state.notebooks.map((n) =>
            n.id === notebookId
              ? { ...n, messages: [...n.messages, newMessage], updatedAt: new Date() }
              : n
          ),
        }));
      },
    }),
    {
      name: 'notebooklm-storage',
    }
  )
);
