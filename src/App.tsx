import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Navbar } from '@/components/common/Navbar';
import { HomeView } from '@/components/home/HomeView';
import { NotebookView } from '@/components/notebook/NotebookView';

function App() {
  const currentView = useAppStore((state) => state.currentView);
  const selectedNotebookId = useAppStore((state) => state.selectedNotebookId);
  const createNotebook = useAppStore((state) => state.createNotebook);
  const selectNotebook = useAppStore((state) => state.selectNotebook);

  const handleCreateNotebook = () => {
    const id = createNotebook();
    selectNotebook(id);
  };

  const handleBackToHome = () => {
    selectNotebook(null);
  };

  return (
    <div className="min-h-screen bg-[#f2f1ee]">
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <div key="home">
            <Navbar onCreateNotebook={handleCreateNotebook} />
            <HomeView onCreateNotebook={handleCreateNotebook} />
          </div>
        ) : selectedNotebookId ? (
          <NotebookView
            key="notebook"
            notebookId={selectedNotebookId}
            onBack={handleBackToHome}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
