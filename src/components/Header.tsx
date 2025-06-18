
import { Cloud, Brain, Activity } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Cloud className="h-8 w-8 text-emerald-400" />
                <Brain className="h-4 w-4 text-orange-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Synkron
                </h1>
                <p className="text-xs text-slate-400">Multi-Agent AI Orchestration Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">System Active</span>
            </div>
            <Activity className="h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
