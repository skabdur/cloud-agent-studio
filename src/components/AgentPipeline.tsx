
import { useState, useEffect } from 'react';
import { Database, BarChart3, Zap, FileText, PenTool, Settings, ArrowRight } from 'lucide-react';

const agents = [
  { id: 'ingestion', name: 'Ingestion Agent', icon: Database, color: '#4caf50' },
  { id: 'exploration', name: 'Exploration Agent', icon: BarChart3, color: '#2196f3' },
  { id: 'analysis', name: 'Analysis Agent', icon: Zap, color: '#ff9800' },
  { id: 'insight', name: 'Insight Composer', icon: FileText, color: '#9c27b0' },
  { id: 'content', name: 'Content Generator', icon: PenTool, color: '#f44336' },
  { id: 'tuner', name: 'Language Tuner', icon: Settings, color: '#607d8b' }
];

type AgentStatus = 'Idle' | 'Running' | 'Complete';

export const AgentPipeline = () => {
  const [activeAgent, setActiveAgent] = useState(0);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>(
    agents.map(() => 'Idle' as AgentStatus)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
      setAgentStatuses(prev => prev.map((status, index) => {
        if (index === activeAgent) return 'Running';
        if (index < activeAgent) return 'Complete';
        return 'Idle';
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [activeAgent]);

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'Running': return 'bg-blue-100 text-blue-700';
      case 'Complete': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#2e2e2e] mb-2">Agent Pipeline</h2>
        <p className="text-gray-600">Multi-agent workflow orchestration</p>
      </div>

      <div className="flex items-center justify-between overflow-x-auto pb-4">
        {agents.map((agent, index) => {
          const IconComponent = agent.icon;
          const isActive = index === activeAgent;
          const status = agentStatuses[index];
          
          return (
            <div key={agent.id} className="flex items-center">
              <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 min-w-[200px] ${
                isActive 
                  ? 'border-indigo-200 bg-indigo-50 shadow-lg shadow-indigo-100' 
                  : status === 'Complete'
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-white hover:shadow-md'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className={`p-3 rounded-xl transition-colors duration-300`}
                    style={{ 
                      backgroundColor: isActive || status === 'Complete' ? `${agent.color}20` : '#f5f5f5',
                    }}
                  >
                    <IconComponent 
                      className="h-6 w-6 transition-colors duration-300" 
                      style={{ color: isActive || status === 'Complete' ? agent.color : '#9e9e9e' }}
                    />
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-[#2e2e2e] mb-1">{agent.name}</h3>
                <p className="text-xs text-gray-500">Processing data pipeline</p>
                
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" 
                       style={{ backgroundColor: agent.color }}></div>
                )}
              </div>
              
              {index < agents.length - 1 && (
                <div className="mx-4 flex items-center">
                  <ArrowRight className={`h-5 w-5 transition-colors duration-500 ${
                    index < activeAgent ? 'text-green-500' : 'text-gray-300'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
