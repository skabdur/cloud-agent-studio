
import { Brain, User, Settings } from 'lucide-react';

interface SynkronHeaderProps {
  onArchitectureClick: () => void;
}

export const SynkronHeader = ({ onArchitectureClick }: SynkronHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-8 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Brain className="h-8 w-8 text-[#3f51b5]" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#2e2e2e]">Synkron</h1>
                <p className="text-sm text-gray-500">AI Agent Orchestration Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={onArchitectureClick}
              className="text-gray-600 hover:text-[#3f51b5] text-sm font-medium transition-colors duration-200"
            >
              Architecture
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
