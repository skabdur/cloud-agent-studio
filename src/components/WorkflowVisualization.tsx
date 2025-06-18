
import { useState, useEffect } from 'react';
import { ArrowRight, Database, BarChart3, Zap, FileText, Settings } from 'lucide-react';

const workflowSteps = [
  { id: 'ingestion', name: 'Data Ingestion', icon: Database, color: 'emerald', active: true },
  { id: 'exploration', name: 'Data Exploration', icon: BarChart3, color: 'blue', active: true },
  { id: 'analysis', name: 'Statistical Analysis', icon: Zap, color: 'orange', active: false },
  { id: 'content', name: 'Content Generation', icon: FileText, color: 'purple', active: false },
  { id: 'orchestrator', name: 'Final Review', icon: Settings, color: 'red', active: false }
];

export const WorkflowVisualization = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Workflow Visualization</h2>
        <p className="text-slate-400 mt-1">Watch your agents collaborate in real-time</p>
      </div>

      {/* Workflow Steps */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = index <= animationStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`relative p-6 rounded-xl border-2 transition-all duration-500 ${
                  isActive 
                    ? `border-${step.color}-500 bg-${step.color}-500/10 shadow-lg shadow-${step.color}-500/25` 
                    : 'border-slate-700 bg-slate-800/50'
                }`}>
                  <IconComponent className={`h-8 w-8 transition-colors duration-500 ${
                    isActive ? `text-${step.color}-400` : 'text-slate-500'
                  }`} />
                  {isActive && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${step.color}-400 rounded-full animate-pulse`}></div>
                  )}
                </div>
                
                {index < workflowSteps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="relative h-0.5 bg-slate-700">
                      <div 
                        className={`absolute h-full bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-1000 ${
                          index < animationStep ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                    <ArrowRight className={`h-4 w-4 mx-auto -mt-2 transition-colors duration-500 ${
                      index < animationStep ? 'text-emerald-400' : 'text-slate-600'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mt-6">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="text-center max-w-[120px]">
              <h4 className={`text-sm font-semibold transition-colors duration-500 ${
                index <= animationStep ? 'text-white' : 'text-slate-500'
              }`}>
                {step.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Data Flow Visualization */}
      <div className="mt-12 p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Current Data Flow</h3>
        <div className="space-y-3">
          {[
            'Dataset uploaded: customer_analytics.csv (2.3MB)',
            'Validation complete: 15,847 rows processed',
            'BigQuery storage: table created successfully',
            'Pattern analysis: 12 correlations discovered',
            'Statistical model: confidence score 94.2%'
          ].map((message, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 transition-all duration-500 ${
                index <= animationStep ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                index <= animationStep ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
              }`}></div>
              <span className="text-slate-300 text-sm font-mono">{message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
