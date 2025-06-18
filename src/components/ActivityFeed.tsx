
import { useState, useEffect } from 'react';
import { Activity, MessageSquare, Database, BarChart3, FileText, Clock } from 'lucide-react';

const generateActivity = () => {
  const activities = [
    { type: 'system', message: 'Ingestion Agent validated 15,847 rows of data', agent: 'Ingestion Agent', icon: Database, color: 'emerald' },
    { type: 'communication', message: 'Exploration Agent → Analysis Agent: "Correlation matrix ready"', agent: 'Inter-Agent Comm', icon: MessageSquare, color: 'blue' },
    { type: 'processing', message: 'Analysis Agent detected 3 significant trends', agent: 'Analysis Agent', icon: BarChart3, color: 'orange' },
    { type: 'system', message: 'BigQuery table `analytics_data` created successfully', agent: 'Cloud Infrastructure', icon: Database, color: 'emerald' },
    { type: 'communication', message: 'Content Agent → Tone Agent: "Draft report ready for review"', agent: 'Inter-Agent Comm', icon: MessageSquare, color: 'purple' },
    { type: 'processing', message: 'Orchestrator Agent initiated workflow sequence', agent: 'Orchestrator Agent', icon: Activity, color: 'red' },
    { type: 'system', message: 'Data preprocessing completed with 99.2% success rate', agent: 'Ingestion Agent', icon: Database, color: 'emerald' },
    { type: 'processing', message: 'Statistical analysis: confidence score 94.2%', agent: 'Analysis Agent', icon: BarChart3, color: 'orange' }
  ];

  return activities.map((activity, index) => ({
    ...activity,
    id: `activity-${Date.now()}-${index}`,
    timestamp: new Date(Date.now() - Math.random() * 300000) // Random time in last 5 minutes
  }));
};

export const ActivityFeed = () => {
  const [activities, setActivities] = useState(generateActivity());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivities = generateActivity();
      setActivities(prev => [...newActivities.slice(0, 1), ...prev.slice(0, 15)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Activity Feed</h2>
          <p className="text-slate-400 mt-1">Real-time agent communications and system events</p>
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
        {filteredActivities.map((activity, index) => {
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
        })}
      </div>
    </div>
  );
};
