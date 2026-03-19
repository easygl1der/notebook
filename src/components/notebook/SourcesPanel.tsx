import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Globe, 
  Zap, 
  FileText, 
  ExternalLink, 
  MoreVertical,
  Check,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Notebook } from '@/types';

interface SourcesPanelProps {
  notebook: Notebook;
  onAddSource: () => void;
}

const sourceIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-4 h-4 text-red-500" />,
  website: <Globe className="w-4 h-4 text-blue-500" />,
  text: <FileText className="w-4 h-4 text-gray-500" />,
  video: <ExternalLink className="w-4 h-4 text-purple-500" />,
  audio: <ExternalLink className="w-4 h-4 text-green-500" />,
};

export function SourcesPanel({ notebook, onAddSource }: SourcesPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const filteredSources = notebook.sources.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedSources(new Set());
    } else {
      setSelectedSources(new Set(notebook.sources.map((s) => s.id)));
    }
    setSelectAll(!selectAll);
  };

  const toggleSource = (id: string) => {
    const newSelected = new Set(selectedSources);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSources(newSelected);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white/50 border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Sources</h2>
          <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
            <ExternalLink className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Add Source Button */}
        <Button
          onClick={onAddSource}
          variant="outline"
          className="w-full justify-center gap-2 border-gray-300 hover:bg-gray-50 text-sm font-medium"
        >
          + Add sources
        </Button>

        {/* Search */}
        <div className="mt-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search the web for new sources"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 py-2 text-sm border-gray-200 focus:border-gray-400 w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white">
              <Globe className="w-3.5 h-3.5" />
              <span>Web</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white">
              <Zap className="w-3.5 h-3.5" />
              <span>Fast Research</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Source List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {notebook.sources.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Saved sources will appear here</p>
            <p className="text-xs text-gray-400">
              Click Add source above to add PDFs, websites, text, videos, or audio files.
            </p>
          </div>
        ) : (
          <>
            {/* Select All */}
            {notebook.sources.length > 0 && (
              <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                <button
                  onClick={toggleSelectAll}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    selectAll ? 'bg-black border-black' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {selectAll && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className="text-xs text-gray-500">Select all sources</span>
              </div>
            )}

            {/* Sources */}
            <AnimatePresence>
              {filteredSources.map((source, index) => (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="group px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSource(source.id)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                        selectedSources.has(source.id)
                          ? 'bg-black border-black'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {selectedSources.has(source.id) && <Check className="w-3 h-3 text-white" />}
                    </button>

                    <div className="flex-shrink-0">{sourceIcons[source.type]}</div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{source.name}</p>
                      {source.size && (
                        <p className="text-xs text-gray-400">{source.size}</p>
                      )}
                    </div>

                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-all">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
