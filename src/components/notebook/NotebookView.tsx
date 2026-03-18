import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Edit2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { SourcesPanel } from './SourcesPanel';
import { ChatPanel } from './ChatPanel';
import { StudioPanel } from './StudioPanel';
import { AddSourceDialog } from './AddSourceDialog';
import { RenameDialog } from '@/components/common/RenameDialog';
import { Button } from '@/components/ui/button';

interface NotebookViewProps {
  notebookId: string;
  onBack: () => void;
}

export function NotebookView({ notebookId, onBack }: NotebookViewProps) {
  const notebook = useAppStore((state) =>
    state.notebooks.find((n) => n.id === notebookId)
  );
  const addSource = useAppStore((state) => state.addSource);
  const addMessage = useAppStore((state) => state.addMessage);
  const updateNotebook = useAppStore((state) => state.updateNotebook);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  if (!notebook) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Notebook not found</p>
      </div>
    );
  }

  const handleAddSource = (source: {
    name: string;
    type: 'pdf' | 'website' | 'text' | 'video' | 'audio';
    size?: string;
  }) => {
    addSource(notebookId, source);
  };

  const handleSendMessage = (content: string) => {
    addMessage(notebookId, { role: 'user', content });
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on your sources, I can see several key insights that relate to your question. Let me analyze the main points...',
        'This is an interesting question! From the documents you\'ve uploaded, there are a few relevant sections that address this topic...',
        'Looking at your research materials, I found some connections that might help answer your question...',
        'According to the sources you\'ve provided, here\'s what I found relevant to your inquiry...',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(notebookId, { role: 'assistant', content: randomResponse });
    }, 1000);
  };

  const handleRename = (newName: string) => {
    updateNotebook(notebookId, { title: newName });
    setIsRenameOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex flex-col pt-16"
    >
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {/* Editable Title */}
            <button
              onClick={() => setIsRenameOpen(true)}
              className="group flex items-center gap-2 font-semibold text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>{notebook.title}</span>
              <Edit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsAddSourceOpen(true)}
            className="bg-black text-white hover:bg-black/90 rounded-full px-4 py-2 text-sm font-medium"
          >
            + Create notebook
          </Button>
          <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
            Analytics
          </Button>
          <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
            Share
          </Button>
          <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
            Settings
          </Button>
          <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
            PRO
          </span>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Sources Panel */}
        <div className="w-80 flex-shrink-0">
          <SourcesPanel
            notebook={notebook}
            onAddSource={() => setIsAddSourceOpen(true)}
          />
        </div>

        {/* Middle: Chat Panel */}
        <div className="flex-1 min-w-0">
          <ChatPanel notebook={notebook} onSendMessage={handleSendMessage} />
        </div>

        {/* Right: Studio Panel */}
        <div className="w-80 flex-shrink-0">
          <StudioPanel notebook={notebook} />
        </div>
      </div>

      {/* Add Source Dialog */}
      <AddSourceDialog
        isOpen={isAddSourceOpen}
        onClose={() => setIsAddSourceOpen(false)}
        onAddSource={handleAddSource}
      />

      {/* Rename Dialog */}
      <RenameDialog
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        onConfirm={handleRename}
        currentName={notebook.title}
      />
    </motion.div>
  );
}
