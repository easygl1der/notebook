import { motion } from 'framer-motion';
import { Check, LayoutGrid, List } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { NotebookCard, CreateCard } from './NotebookCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HomeViewProps {
  onCreateNotebook: () => void;
}

export function HomeView({ onCreateNotebook }: HomeViewProps) {
  const notebooks = useAppStore((state) => state.notebooks);
  const selectNotebook = useAppStore((state) => state.selectNotebook);
  const updateNotebook = useAppStore((state) => state.updateNotebook);
  const deleteNotebook = useAppStore((state) => state.deleteNotebook);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const featuredNotebooks = notebooks.filter((n) => n.isFeatured);
  const recentNotebooks = notebooks.filter((n) => !n.isFeatured);

  const handleRename = (id: string, newName: string) => {
    updateNotebook(id, { title: newName });
  };

  const handleDelete = (id: string) => {
    deleteNotebook(id);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <button className="px-4 py-2 rounded-full bg-black/5 text-sm font-medium text-gray-700 hover:bg-black/10 transition-colors">
                All
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:bg-black/5 transition-colors">
                My notebooks
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:bg-black/5 transition-colors">
                Featured notebooks
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-gray-500">Most recent</span>
              <Check className="w-4 h-4 text-gray-400" />
            </div>

            <Button
              onClick={onCreateNotebook}
              className="ml-4 bg-black text-white hover:bg-black/90 rounded-full px-4 py-2 text-sm font-medium"
            >
              + Create new
            </Button>
          </div>
        </motion.div>

        {/* Featured Notebooks */}
        {featuredNotebooks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured notebooks</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {featuredNotebooks.map((notebook, index) => (
                <NotebookCard
                  key={notebook.id}
                  notebook={notebook}
                  onClick={() => selectNotebook(notebook.id)}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Recent Notebooks */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent notebooks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <CreateCard onClick={onCreateNotebook} index={0} />
            {recentNotebooks.map((notebook, index) => (
              <NotebookCard
                key={notebook.id}
                notebook={notebook}
                onClick={() => selectNotebook(notebook.id)}
                onRename={handleRename}
                onDelete={handleDelete}
                index={index + 1}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
