
import { useState, useEffect } from 'react';
import { Database, BarChart3, FileText, Zap, Settings, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const agents = [
  {
    id: 'ingestion',
    name: 'Ingestion Agent',
    icon: Database,
    status: 'active',
    description: 'Validates and preprocesses incoming data',
    lastActivity: '2 minutes ago',
    color: 'emerald'
  },
  {
    id: 'exploration',
    name: 'Exploration Agent',
    icon: BarChart3,
    status: 'processing',
    description: 'Discovers patterns and correlations',
    lastActivity: '1 minute ago',
    color: 'blue'
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    icon: Zap,
    status: 'idle',
    description: 'Performs statistical analysis and trend detection',
    lastActivity: '5 minutes ago',
    color: 'orange'
  },
  {
    id: 'content',
    name: 'Content Agent',
    icon: FileText,
    status: 'active',
    description: 'Generates personalized reports',
    lastActivity: '30 seconds ago',
    color: 'purple'
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator Agent',
    icon: Settings,
    status: 'monitoring',
    description: 'Oversees workflow and dependencies',
    lastActivity: 'Just now',
    color: 'red'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
    case 'processing':
      return <CheckCircle className="h-5 w-5 text-emerald-400" />;
    case 'idle':
      return <Clock className="h-5 w-5 text-slate-400" />;
    case 'monitoring':
      return <AlertCircle className="h-5 w-5 text-orange-400" />;
    default:
      return <Clock className="h-5 w-5 text-slate-400" />;
  }
};

const getColorClasses = (color: string, status: string) => {
  const isActive = status === 'active' || status === 'processing';
  const baseClasses = {
    emerald: isActive ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700/50 bg-slate-800/50',
    blue: isActive ? 'border-blue-500/50 bg-blue-500/5' : 'border-slate-700/50 bg-slate-800/50',
    orange: isActive ? 'border-orange-500/50 bg-orange-500/5' : 'border-slate-700/50 bg-slate-800/50',
    purple: isActive ? 'border-purple-500/50 bg-purple-500/5' : 'border-slate-700/50 bg-slate-800/50',
    red: isActive ? 'border-red-500/50 bg-red-500/5' : 'border-slate-700/50 bg-slate-800/50'
  };
  return baseClasses[color as keyof typeof baseClasses] || baseClasses.emerald;
};

export const AgentDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Agent Dashboard</h2>
          <p className="text-slate-400 mt-1">Monitor your AI agents in real-time</p>
        </div>
        <div className="text-right">
          <p className="text-slate-300 font-mono text-sm">
            {currentTime.toLocaleTimeString()}
          </p>
          <p className="text-slate-500 text-xs">System Time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <div
              key={agent.id}
              className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl ${getColorClasses(agent.color, agent.status)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${agent.status === 'active' || agent.status === 'processing' ? `bg-${agent.color}-500/20` : 'bg-slate-700/50'}`}>
                  <IconComponent className={`h-6 w-6 ${agent.status === 'active' || agent.status === 'processing' ? `text-${agent.color}-400` : 'text-slate-400'}`} />
                </div>
                {getStatusIcon(agent.status)}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{agent.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  agent.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' :
                  agent.status === 'processing' ? 'bg-blue-500/20 text-blue-300' :
                  agent.status === 'monitoring' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-slate-600/20 text-slate-400'
                }`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
                <span className="text-xs text-slate-500">{agent.lastActivity}</span>
              </div>
              
              {(agent.status === 'active' || agent.status === 'processing') && (
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
