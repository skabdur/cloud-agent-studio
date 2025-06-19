
import { useState, useEffect } from 'react';
import { ArrowRight, Database, BarChart3, Zap, FileText, Settings, Upload, Lightbulb } from 'lucide-react';

interface WorkflowVisualizationProps {
  hasData: boolean;
  uploadedFile: File | null;
  processingStatus: 'idle' | 'processing' | 'complete';
}

const workflowSteps = [
  { id: 'ingestion', name: 'Data Ingestion', icon: Database, color: 'emerald' },
  { id: 'exploration', name: 'Data Exploration', icon: BarChart3, color: 'blue' },
  { id: 'analysis', name: 'Statistical Analysis', icon: Zap, color: 'orange' },
  { id: 'insight', name: 'Insight Composer', icon: Lightbulb, color: 'purple' },
  { id: 'content', name: 'Content Generation', icon: FileText, color: 'indigo' },
  { id: 'orchestrator', name: 'Language Tuner', icon: Settings, color: 'red' }
];

export const WorkflowVisualization = ({ hasData, uploadedFile, processingStatus }: WorkflowVisualizationProps) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (processingStatus === 'processing') {
      const timer = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % workflowSteps.length);
      }, 1500);
      return () => clearInterval(timer);
    } else if (processingStatus === 'complete') {
      setAnimationStep(workflowSteps.length - 1);
    } else {
      setAnimationStep(0);
    }
  }, [processingStatus]);

  // Show welcome state when no data is uploaded
  if (!hasData) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Workflow Visualization</h2>
          <p className="text-slate-400 mt-1">See how agents collaborate on your data</p>
        </div>

        <div className="text-center py-16">
          <Upload className="h-24 w-24 text-slate-500 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">Upload data to see the workflow</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Watch as your data flows through our six-stage intelligent pipeline. Each agent builds 
            upon the previous work, creating a comprehensive analysis of your information.
          </p>

          {/* Preview of Workflow Steps */}
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {workflowSteps.map((step, index) => {
                const IconComponent = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="relative p-4 rounded-xl border-2 border-slate-700 bg-slate-800/50">
                      <IconComponent className="h-6 w-6 text-slate-500" />
                    </div>
                    
                    {index < workflowSteps.length - 1 && (
                      <div className="flex-1 mx-3">
                        <div className="h-0.5 bg-slate-700"></div>
                        <ArrowRight className="h-3 w-3 mx-auto -mt-1.5 text-slate-600" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between mt-4">
              {workflowSteps.map((step) => (
                <div key={step.id} className="text-center max-w-[100px]">
                  <h4 className="text-xs font-semibold text-slate-500">
                    {step.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show active workflow when data is available
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Workflow Visualization</h2>
        <p className="text-slate-400 mt-1">
          Processing: {uploadedFile?.name} • {processingStatus === 'complete' ? 'Complete' : 'In Progress'}
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = processingStatus === 'processing' && index <= animationStep;
            const isComplete = processingStatus === 'complete' || (processingStatus === 'processing' && index < animationStep);
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`relative p-6 rounded-xl border-2 transition-all duration-500 ${
                  isActive || isComplete
                    ? `border-${step.color}-500 bg-${step.color}-500/10 shadow-lg shadow-${step.color}-500/25` 
                    : 'border-slate-700 bg-slate-800/50'
                }`}>
                  <IconComponent className={`h-8 w-8 transition-colors duration-500 ${
                    isActive || isComplete ? `text-${step.color}-400` : 'text-slate-500'
                  }`} />
                  {isActive && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${step.color}-400 rounded-full animate-pulse`}></div>
                  )}
                  {isComplete && !isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
                  )}
                </div>
                
                {index < workflowSteps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="relative h-0.5 bg-slate-700">
                      <div 
                        className={`absolute h-full bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-1000 ${
                          isComplete ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                    <ArrowRight className={`h-4 w-4 mx-auto -mt-2 transition-colors duration-500 ${
                      isComplete ? 'text-emerald-400' : 'text-slate-600'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mt-6">
          {workflowSteps.map((step, index) => {
            const isActive = processingStatus === 'processing' && index <= animationStep;
            const isComplete = processingStatus === 'complete' || (processingStatus === 'processing' && index < animationStep);
            
            return (
              <div key={step.id} className="text-center max-w-[120px]">
                <h4 className={`text-sm font-semibold transition-colors duration-500 ${
                  isActive || isComplete ? 'text-white' : 'text-slate-500'
                }`}>
                  {step.name}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Flow Visualization */}
      {processingStatus !== 'idle' && (
        <div className="mt-12 p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-4">Processing Data Flow</h3>
          <div className="space-y-3">
            {[
              `Dataset uploaded: ${uploadedFile?.name} (${uploadedFile ? (uploadedFile.size / 1024 / 1024).toFixed(2) : '0'}MB)`,
              'Validation complete: File structure analyzed',
              'Data ingestion: Content parsed successfully',
              'Pattern analysis: Discovering correlations...',
              'Statistical modeling: Building insights...',
              'Report generation: Finalizing outputs...'
            ].map((message, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 transition-all duration-500 ${
                  (processingStatus === 'processing' && index <= animationStep) || processingStatus === 'complete'
                    ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  (processingStatus === 'processing' && index <= animationStep) || processingStatus === 'complete'
                    ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                }`}></div>
                <span className="text-slate-300 text-sm font-mono">{message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
