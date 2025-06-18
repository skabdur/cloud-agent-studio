
import { useState } from 'react';
import { SynkronHeader } from '../components/SynkronHeader';
import { AgentPipeline } from '../components/AgentPipeline';
import { FileUploadZone } from '../components/FileUploadZone';
import { DatasetHistory } from '../components/DatasetHistory';
import { SystemArchitecture } from '../components/SystemArchitecture';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { ArchitectureModal } from '../components/ArchitectureModal';

const Index = () => {
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f6f9]">
      <SynkronHeader onArchitectureClick={() => setShowArchitecture(true)} />
      
      <div className="container mx-auto px-8 py-12 max-w-7xl">
        {/* Agent Pipeline Visualization */}
        <div className="mb-16">
          <AgentPipeline />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <FileUploadZone />
          <DatasetHistory />
        </div>

        {/* System Overview */}
        <SystemArchitecture />
      </div>

      <FloatingActionButton />
      
      <ArchitectureModal 
        isOpen={showArchitecture} 
        onClose={() => setShowArchitecture(false)} 
      />
    </div>
  );
};

export default Index;
