import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Globe, Zap, Upload, Link, Database, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Tabs component imported for future use

interface AddSourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSource: (source: { name: string; type: 'pdf' | 'website' | 'text' | 'video' | 'audio'; size?: string }) => void;
}

export function AddSourceDialog({ isOpen, onClose, onAddSource }: AddSourceDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  // Tab state for future use
  const [_activeTab, _setActiveTab] = useState('upload');

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sampleSources = [
    { name: 'Research_Paper_2024.pdf', type: 'pdf' as const, size: '2.4 MB' },
    { name: 'Machine_Learning_Guide.pdf', type: 'pdf' as const, size: '5.1 MB' },
    { name: 'Data_Analysis_Report.pdf', type: 'pdf' as const, size: '1.8 MB' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex-1 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Create Audio and Video Overviews from
                </h2>
                <p className="text-sm text-gray-500">your documents</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search the web for new sources"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base border-gray-200 rounded-xl focus:border-gray-400"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200">
                    <Globe className="w-4 h-4" />
                    Web
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200">
                    <Zap className="w-4 h-4" />
                    Fast Research
                  </button>
                </div>
              </div>

              {/* Drop Zone */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-gray-400 transition-colors">
                <p className="text-lg font-medium text-gray-700 mb-1">or drop your files</p>
                <p className="text-sm text-gray-500 mb-4">pdf, images, docs, audio, and more</p>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => {
                      const randomSource = sampleSources[Math.floor(Math.random() * sampleSources.length)];
                      onAddSource(randomSource);
                      onClose();
                    }}
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-300 hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4" />
                    Upload files
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-300 hover:bg-gray-50"
                  >
                    <Link className="w-4 h-4" />
                    Websites
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-300 hover:bg-gray-50"
                  >
                    <Database className="w-4 h-4" />
                    Drive
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-gray-300 hover:bg-gray-50"
                  >
                    <FileText className="w-4 h-4" />
                    Copied text
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
