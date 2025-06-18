
import { Layers, Database, Cloud, Shield } from 'lucide-react';

const architectureComponents = [
  {
    name: 'Agent Orchestration',
    description: 'ADK-powered multi-agent collaboration',
    icon: Layers,
    color: '#3f51b5'
  },
  {
    name: 'Data Processing',
    description: 'BigQuery analytics and storage',
    icon: Database,
    color: '#4caf50'
  },
  {
    name: 'Cloud Infrastructure',
    description: 'Google Cloud Run deployment',
    icon: Cloud,
    color: '#2196f3'
  },
  {
    name: 'Security & Auth',
    description: 'Firebase Auth and Secret Manager',
    icon: Shield,
    color: '#ff9800'
  }
];

export const SystemArchitecture = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-[#2e2e2e] mb-2">System Architecture</h3>
        <p className="text-gray-600">Built on Google Cloud with Agent Development Kit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {architectureComponents.map((component) => {
          const IconComponent = component.icon;
          return (
            <div key={component.name} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
              <div 
                className="p-3 rounded-xl mb-4 w-fit"
                style={{ backgroundColor: `${component.color}20` }}
              >
                <IconComponent 
                  className="h-6 w-6" 
                  style={{ color: component.color }}
                />
              </div>
              <h4 className="text-lg font-semibold text-[#2e2e2e] mb-2">{component.name}</h4>
              <p className="text-sm text-gray-600">{component.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
