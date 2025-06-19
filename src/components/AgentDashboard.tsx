
import { useState, useEffect } from 'react';
import { Database, BarChart3, FileText, Zap, Settings, CheckCircle, Clock, AlertCircle, Upload } from 'lucide-react';

interface AgentDashboardProps {
  hasData: boolean;
  uploadedFile: File | null;
  processingStatus: 'idle' | 'processing' | 'complete';
}

const agents = [
  {
    id: 'ingestion',
    name: 'Ingestion Agent',
    icon: Database,
    description: 'Validates and preprocesses incoming data',
    color: 'emerald'
  },
  {
    id: 'exploration',
    name: 'Exploration Agent',
    icon: BarChart3,
    description: 'Discovers patterns and correlations',
    color: 'blue'
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    icon: Zap,
    description: 'Performs statistical analysis and trend detection',
    color: 'orange'
  },
  {
    id: 'insight',
    name: 'Insight Composer',
    icon: FileText,
    description: 'Synthesizes findings into actionable insights',
    color: 'purple'
  },
  {
    id: 'content',
    name: 'Content Generator',
    icon: FileText,
    description: 'Creates comprehensive reports and summaries',
    color: 'indigo'
  },
  {
    id: 'orchestrator',
    name: 'Language Tuner',
    icon: Settings,
    description: 'Refines output tone and presentation',
    color: 'red'
  }
];

export const AgentDashboard = ({ hasData, uploadedFile, processingStatus }: AgentDashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Show welcome state when no data is uploaded
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Agent Dashboard</h2>
          <p className="text-slate-400 mt-1">Your AI agents are ready to process data</p>
        </div>

        <div className="text-center py-16">
          <Upload className="h-24 w-24 text-slate-500 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">Upload a file to begin</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            Once you upload your data, you'll see all six specialized agents spring into action, 
            working collaboratively to analyze and transform your information.
          </p>
          
          {/* Preview of Available Agents */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div
                  key={agent.id}
                  className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg"
                >
                  <div className="p-3 bg-slate-700/50 rounded-lg mb-3 w-fit mx-auto">
                    <IconComponent className="h-6 w-6 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{agent.name}</h4>
                  <p className="text-xs text-slate-500">{agent.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Show active dashboard when data is available
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Agent Dashboard</h2>
          <p className="text-slate-400 mt-1">
            Processing: {uploadedFile?.name} • Status: {processingStatus}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-300 font-mono text-sm">
            {currentTime.toLocaleTimeString()}
          </p>
          <p className="text-slate-500 text-xs">System Time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => {
          const IconComponent = agent.icon;
          const isActive = processingStatus === 'processing' && index <= 2;
          const isComplete = processingStatus === 'complete';
          
          return (
            <div
              key={agent.id}
              className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isActive || isComplete
                  ? `border-${agent.color}-500/50 bg-${agent.color}-500/5`
                  : 'border-slate-700/50 bg-slate-800/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  isActive || isComplete ? `bg-${agent.color}-500/20` : 'bg-slate-700/50'
                }`}>
                  <IconComponent className={`h-6 w-6 ${
                    isActive || isComplete ? `text-${agent.color}-400` : 'text-slate-400'
                  }`} />
                </div>
                {isComplete && <CheckCircle className="h-5 w-5 text-emerald-400" />}
                {isActive && <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>}
                {!isActive && !isComplete && <Clock className="h-5 w-5 text-slate-400" />}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{agent.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isComplete ? 'bg-emerald-500/20 text-emerald-300' :
                  isActive ? 'bg-blue-500/20 text-blue-300' :
                  'bg-slate-600/20 text-slate-400'
                }`}>
                  {isComplete ? 'Complete' : isActive ? 'Processing' : 'Waiting'}
                </span>
                <span className="text-xs text-slate-500">
                  {isComplete ? 'Just completed' : isActive ? 'Active now' : 'Ready'}
                </span>
              </div>
              
              {isActive && (
                <div className="mt-4">
                  <div className="w-full bg-slate-700/50 rounded-full h-1">
                    <div className={`h-1 rounded-full animate-pulse bg-${agent.color}-400`} style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
