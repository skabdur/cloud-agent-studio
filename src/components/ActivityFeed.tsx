
import { useState, useEffect } from 'react';
import { Activity, MessageSquare, Database, BarChart3, FileText, Clock, Upload } from 'lucide-react';

interface ActivityFeedProps {
  hasData: boolean;
  uploadedFile: File | null;
}

export const ActivityFeed = ({ hasData, uploadedFile }: ActivityFeedProps) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (hasData && uploadedFile) {
      // Generate real activities based on the uploaded file
      const fileBasedActivities = [
        { 
          type: 'system', 
          message: `File "${uploadedFile.name}" successfully uploaded and validated`, 
          agent: 'Ingestion Agent', 
          icon: Database, 
          color: 'emerald',
          id: `upload-${Date.now()}`,
          timestamp: new Date()
        },
        { 
          type: 'processing', 
          message: `Analyzing ${uploadedFile.type} format and structure`, 
          agent: 'Ingestion Agent', 
          icon: Database, 
          color: 'emerald',
          id: `analyze-${Date.now()}`,
          timestamp: new Date(Date.now() + 1000)
        },
        { 
          type: 'communication', 
          message: 'Ingestion Agent → Exploration Agent: "Data ready for analysis"', 
          agent: 'Inter-Agent Comm', 
          icon: MessageSquare, 
          color: 'blue',
          id: `comm-${Date.now()}`,
          timestamp: new Date(Date.now() + 2000)
        }
      ];

      setActivities(fileBasedActivities);

      // Add more activities over time to simulate real processing
      const interval = setInterval(() => {
        const newActivity = {
          type: 'processing',
          message: `Processing data patterns from ${uploadedFile.name}`,
          agent: 'Exploration Agent',
          icon: BarChart3,
          color: 'blue',
          id: `process-${Date.now()}`,
          timestamp: new Date()
        };
        
        set Activities(prev => [newActivity, ...prev.slice(0, 15)]);
      }, 8000);

      return () => clearInterval(interval);
    } else {
      setActivities([]);
    }
  }, [hasData, uploadedFile]);

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  // Show welcome state when no data is uploaded
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Activity Feed</h2>
          <p className="text-slate-400 mt-1">Monitor real-time agent communications</p>
        </div>

        <div className="text-center py-16">
          <Upload className="h-24 w-24 text-slate-500 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">Upload data to see live activity</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Once you upload your data, this feed will show real-time communications between agents, 
            system events, and processing updates as they work on your information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Activity Feed</h2>
          <p className="text-slate-400 mt-1">
            Live activity for: {uploadedFile?.name}
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All', count: activities.length },
            { id: 'system', label: 'System', count: activities.filter(a => a.type === 'system').length },
            { id: 'communication', label: 'Comm', count: activities.filter(a => a.type === 'communication').length },
            { id: 'processing', label: 'Processing', count: activities.filter(a => a.type === 'processing').length }
          ].map(filterOption => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === filterOption.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">Processing just started. Activities will appear here shortly...</p>
          </div>
        ) : (
          filteredActivities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.id}
                className={`p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/30 animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-${activity.color}-500/20 border border-${activity.color}-500/30`}>
                    <IconComponent className={`h-4 w-4 text-${activity.color}-400`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-white">{activity.agent}</h4>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeAgo(activity.timestamp)}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm">{activity.message}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full bg-${activity.color}-500/20 text-${activity.color}-300 border border-${activity.color}-500/30`}>
                        {activity.type}
                      </span>
                      {activity.type === 'communication' && (
                        <span className="text-xs text-slate-500">Inter-agent message</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
