
import { X, GitBranch, Database, Cloud, Zap } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal = ({ isOpen, onClose }: ArchitectureModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#2e2e2e]">System Architecture</h2>
              <p className="text-gray-600 mt-1">Multi-agent AI system architecture overview</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Architecture Diagram */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="p-4 bg-blue-100 rounded-xl mb-4 w-fit mx-auto">
                    <Cloud className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-[#2e2e2e] mb-2">Cloud Infrastructure</h4>
                  <p className="text-sm text-gray-600">Google Cloud Run, BigQuery, Firestore</p>
                </div>

                <div className="text-center">
                  <div className="p-4 bg-purple-100 rounded-xl mb-4 w-fit mx-auto">
                    <GitBranch className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-[#2e2e2e] mb-2">Agent Orchestration</h4>
                  <p className="text-sm text-gray-600">ADK-powered multi-agent system</p>
                </div>

                <div className="text-center">
                  <div className="p-4 bg-green-100 rounded-xl mb-4 w-fit mx-auto">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-[#2e2e2e] mb-2">Data Processing</h4>
                  <p className="text-sm text-gray-600">Real-time analytics and insights</p>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-[#2e2e2e] mb-3">Agent Framework</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Agent Development Kit (ADK)</li>
                  <li>• Asynchronous messaging patterns</li>
                  <li>• Shared state management</li>
                  <li>• Fault tolerance and recovery</li>
                </ul>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-[#2e2e2e] mb-3">Cloud Services</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Google Cloud Run (containerized deployment)</li>
                  <li>• BigQuery (data analytics)</li>
                  <li>• Firestore (agent memory)</li>
                  <li>• Secret Manager (credentials)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
