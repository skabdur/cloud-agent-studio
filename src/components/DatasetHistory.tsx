
import { Download, FileText, Clock } from 'lucide-react';

const mockDatasets = [
  {
    id: 1,
    name: 'customer_analytics.csv',
    uploadTime: '2 hours ago',
    status: 'Complete',
    size: '2.3 MB',
    reports: { pdf: true, json: true }
  },
  {
    id: 2,
    name: 'sales_data.xlsx',
    uploadTime: '1 day ago',
    status: 'Complete',
    size: '5.1 MB',
    reports: { pdf: true, json: true }
  },
  {
    id: 3,
    name: 'user_behavior.json',
    uploadTime: '3 days ago',
    status: 'Processing',
    size: '1.8 MB',
    reports: { pdf: false, json: false }
  }
];

export const DatasetHistory = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#2e2e2e] mb-2">Dataset History</h3>
        <p className="text-gray-600">Previously processed datasets</p>
      </div>

      <div className="space-y-4">
        {mockDatasets.map((dataset) => (
          <div key={dataset.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#2e2e2e]">{dataset.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {dataset.uploadTime}
                    </span>
                    <span className="text-xs text-gray-500">{dataset.size}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      dataset.status === 'Complete' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {dataset.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {dataset.status === 'Complete' && (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-[#3f51b5] hover:bg-indigo-50 rounded-lg transition-all duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
