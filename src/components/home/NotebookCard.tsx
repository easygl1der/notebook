import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Edit3, Trash2 } from 'lucide-react';
import type { Notebook } from '@/types';
import { RenameDialog } from '@/components/common/RenameDialog';

interface NotebookCardProps {
  notebook: Notebook;
  onClick: () => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function NotebookCard({ notebook, onClick, onRename, onDelete, index }: NotebookCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const formattedDate = new Date(notebook.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRename = (newName: string) => {
    onRename(notebook.id, newName);
    setIsRenameOpen(false);
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this notebook?')) {
      onDelete(notebook.id);
    }
    setShowMenu(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{ 
          y: -8, 
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        }}
        onClick={() => !showMenu && onClick()}
        className="group cursor-pointer relative"
      >
        <div className={`relative aspect-square rounded-2xl ${notebook.color} p-6 flex flex-col justify-between overflow-hidden transition-shadow duration-300 group-hover:shadow-xl`}>
          {/* Menu button */}
          <div className="absolute top-3 right-3 z-10" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRenameOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Rename
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </div>

          {/* Emoji */}
          <div className="text-5xl select-none">{notebook.emoji}</div>

          {/* Content */}
          <div className="space-y-1">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
              {notebook.title}
            </h3>
            <p className="text-xs text-gray-500">
              {formattedDate} · {notebook.sources.length} {notebook.sources.length === 1 ? 'source' : 'sources'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Rename Dialog */}
      <RenameDialog
        isOpen={isRenameOpen}
        onClose={() => {
          setIsRenameOpen(false);
          setShowMenu(false);
        }}
        onConfirm={handleRename}
        currentName={notebook.title}
      />
    </>
  );
}

interface CreateCardProps {
  onClick: () => void;
  index: number;
}

export function CreateCard({ onClick, index }: CreateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-gray-400 group-hover:bg-gray-100/50">
        <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl text-gray-400 group-hover:text-gray-600">+</span>
        </div>
        <span className="text-sm text-gray-500 font-medium">Create new notebook</span>
      </div>
    </motion.div>
  );
}
