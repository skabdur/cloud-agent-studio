
import { Cloud, Database, Brain, Zap, Shield, BarChart3 } from 'lucide-react';

export const SystemOverview = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">System Overview</h2>
        <p className="text-slate-400 mt-1">Architecture and technical details of the Cloud Agent Studio</p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-8">
        <h3 className="text-xl font-semibold text-white mb-6">System Architecture</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Frontend Layer */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mt-3">Frontend Layer</h4>
              <p className="text-slate-400 text-sm">React + TypeScript Interface</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Real-time dashboards</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Agent visualization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Data upload interface</span>
              </div>
            </div>
          </div>

          {/* Agent Layer */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex p-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                <Zap className="h-8 w-8 text-emerald-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mt-3">Agent Layer</h4>
              <p className="text-slate-400 text-sm">Multi-Agent Orchestration</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-slate-300">5 Specialized agents</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-slate-300">Autonomous workflow</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-slate-300">Inter-agent communication</span>
              </div>
            </div>
          </div>

          {/* Cloud Infrastructure */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex p-4 bg-orange-500/20 rounded-xl border border-orange-500/30">
                <Cloud className="h-8 w-8 text-orange-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mt-3">Cloud Infrastructure</h4>
              <p className="text-slate-400 text-sm">Google Cloud Platform</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-slate-300">Cloud Run deployment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-slate-300">BigQuery analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-slate-300">Firestore persistence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-6 w-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Data Pipeline</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Data Ingestion</span>
              <span className="text-emerald-400 text-sm">CSV, JSON, Excel</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Validation</span>
              <span className="text-emerald-400 text-sm">99.2% success rate</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Storage</span>
              <span className="text-emerald-400 text-sm">BigQuery</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Processing</span>
              <span className="text-emerald-400 text-sm">Real-time</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Security & Scalability</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Authentication</span>
              <span className="text-blue-400 text-sm">OAuth 2.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">API Security</span>
              <span className="text-blue-400 text-sm">Secret Manager</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Scalability</span>
              <span className="text-blue-400 text-sm">Auto-scaling</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Monitoring</span>
              <span className="text-blue-400 text-sm">Real-time logs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Specifications */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Agent Specifications</h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {[
            { name: 'Ingestion', role: 'Data validation & preprocessing', model: 'ADK Core', color: 'emerald' },
            { name: 'Exploration', role: 'Pattern discovery & correlation analysis', model: 'ADK Analytics', color: 'blue' },
            { name: 'Analysis', role: 'Statistical modeling & trend detection', model: 'ADK ML', color: 'orange' },
            { name: 'Content', role: 'Report generation & NLG', model: 'ADK Language', color: 'purple' },
            { name: 'Orchestrator', role: 'Workflow management & coordination', model: 'ADK Control', color: 'red' }
          ].map((agent) => (
            <div key={agent.name} className={`p-4 bg-${agent.color}-500/10 border border-${agent.color}-500/30 rounded-lg`}>
              <h4 className="font-semibold text-white text-sm">{agent.name} Agent</h4>
              <p className="text-slate-400 text-xs mt-1">{agent.role}</p>
              <div className="mt-2">
                <span className={`text-xs px-2 py-0.5 bg-${agent.color}-500/20 text-${agent.color}-300 rounded-full`}>
                  {agent.model}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
