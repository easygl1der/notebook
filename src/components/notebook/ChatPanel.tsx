import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Pin, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Notebook, Message } from '@/types';

interface ChatPanelProps {
  notebook: Notebook;
  onSendMessage: (content: string) => void;
}

function ChatMessage({ message, index }: { message: Message; index: number }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`py-4 ${isUser ? 'bg-white' : 'bg-gray-50/50'}`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-gradient-to-br from-purple-400 to-pink-400' : 'bg-black'
          }`}>
            {isUser ? (
              <span className="text-white text-sm font-medium">U</span>
            ) : (
              <Sparkles className="w-4 h-4 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-gray-900">
                {isUser ? 'You' : 'NotebookLM'}
              </span>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>

            {/* Actions */}
            {!isUser && (
              <div className="flex items-center gap-2 pt-2">
                <button className="p-1.5 rounded hover:bg-gray-200 transition-colors">
                  <Pin className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-200 transition-colors">
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-200 transition-colors">
                  <ThumbsDown className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-200 transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ChatPanel({ notebook, onSendMessage }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [notebook.messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700">Chat</h2>
        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {notebook.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="text-6xl mb-4">📓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{notebook.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{notebook.sources.length} sources</p>
              <p className="text-xs text-gray-400 mt-4 max-w-sm">
                Start typing to ask questions about your sources
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {notebook.messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2 bg-gray-50 rounded-2xl border border-gray-200 p-3 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0">
              <Sparkles className="w-5 h-5 text-gray-500" />
            </button>

            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Start typing..."
              className="flex-1 min-h-[24px] max-h-[200px] bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 text-sm"
              rows={1}
            />

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-gray-400">{notebook.sources.length} sources</span>
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                size="icon"
                className="w-8 h-8 rounded-full bg-black hover:bg-black/90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            NotebookLM can be inaccurate; please double check its responses.
          </p>
        </div>
      </div>
    </div>
  );
}
