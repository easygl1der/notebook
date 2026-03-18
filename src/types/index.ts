export interface Notebook {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  emoji?: string;
  color?: string;
  sources: Source[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isFeatured?: boolean;
}

export interface Source {
  id: string;
  name: string;
  type: 'pdf' | 'website' | 'text' | 'video' | 'audio';
  size?: string;
  url?: string;
  content?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

export interface StudioTool {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export type ViewMode = 'home' | 'notebook';

export interface AppState {
  currentView: ViewMode;
  selectedNotebookId: string | null;
  notebooks: Notebook[];
}
