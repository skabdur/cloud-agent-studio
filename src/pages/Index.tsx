
import { useState } from 'react';
import { AgentDashboard } from '../components/AgentDashboard';
import { WorkflowVisualization } from '../components/WorkflowVisualization';
import { DataUpload } from '../components/DataUpload';
import { ActivityFeed } from '../components/ActivityFeed';
import { SystemOverview } from '../components/SystemOverview';
import { Header } from '../components/Header';
import { IntroductionSection } from '../components/IntroductionSection';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 pt-8">
        <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm border border-slate-700/50 w-fit">
          {[
            { id: 'dashboard', label: 'Agent Dashboard' },
            { id: 'workflow', label: 'Workflow' },
            { id: 'upload', label: 'Data Upload' },
            { id: 'activity', label: 'Activity Feed' },
            { id: 'overview', label: 'System Overview' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && <AgentDashboard />}
          {activeTab === 'workflow' && <WorkflowVisualization />}
          {activeTab === 'upload' && <DataUpload />}
          {activeTab === 'activity' && <ActivityFeed />}
          {activeTab === 'overview' && <SystemOverview />}
        </div>
      </div>

      {/* Introduction Section - Moved to Bottom */}
      <IntroductionSection />
    </div>
  );
};

export default Index;
