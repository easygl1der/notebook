import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Grid3X3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onCreateNotebook: () => void;
}

export function Navbar({ onCreateNotebook }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-400 ${
        scrolled
          ? 'glass-effect border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">NotebookLM</span>
        </motion.div>

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <Button
            onClick={onCreateNotebook}
            className="bg-black text-white hover:bg-black/90 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            + Create notebook
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
            <Settings className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
            <Grid3X3 className="w-5 h-5" />
          </Button>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium ml-2">
            U
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
