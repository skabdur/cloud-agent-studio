
import { useState } from 'react';
import { Download, FileText, Code } from 'lucide-react';

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: FileText, label: 'Download PDF', action: () => console.log('Download PDF') },
    { icon: Code, label: 'Download JSON', action: () => console.log('Download JSON') }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="mb-4 space-y-2">
          {actions.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white rounded-full shadow-lg border border-gray-200 pl-4 pr-6 py-3 hover:shadow-xl transition-all duration-200 cursor-pointer"
                onClick={item.action}
              >
                <IconComponent className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-[#2e2e2e] whitespace-nowrap">{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#3f51b5] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-105"
      >
        <Download className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};
