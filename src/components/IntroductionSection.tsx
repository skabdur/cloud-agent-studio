
import { Upload, Eye, Download, Settings } from 'lucide-react';

export const IntroductionSection = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white/10 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 shadow-2xl shadow-slate-900/20">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            What is Synkron?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-slate-200 text-lg leading-relaxed mb-6">
            Synkron is a powerful multi-agent AI platform that brings together specialized artificial intelligence agents 
            to work collaboratively on your data. Built with Google Cloud and the Agent Development Kit, Synkron transforms 
            complex data analysis into an intuitive, visual experience where you can watch multiple AI agents process, 
            analyze, and transform your information in real time.
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            Whether you're analyzing business data, research datasets, or operational metrics, Synkron's intelligent agents 
            work together seamlessly to deliver comprehensive insights, beautiful visualizations, and professional reports. 
            The platform is designed to be both powerful for experts and accessible for everyday users.
          </p>
        </div>

        {/* How to Use Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-white text-center mb-8">
            How to Use Synkron
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <Upload className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-white font-medium mb-2">1. Upload Files</h4>
              <p className="text-slate-400 text-sm">
                Drag and drop your datasets or use the upload button to add CSV, Excel, or JSON files
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <Settings className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-white font-medium mb-2">2. Start Process</h4>
              <p className="text-slate-400 text-sm">
                Choose your workflow and let the AI agents automatically begin processing your data
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                <Eye className="w-8 h-8 text-orange-400" />
              </div>
              <h4 className="text-white font-medium mb-2">3. Monitor Live</h4>
              <p className="text-slate-400 text-sm">
                Watch agents collaborate in real-time through the visual dashboard and activity feed
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <Download className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-white font-medium mb-2">4. Download Results</h4>
              <p className="text-slate-400 text-sm">
                Get comprehensive PDF reports and structured JSON data when processing completes
              </p>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700/30">
          <p className="text-slate-500 text-sm">
            Made by SK ABDUR REHMAN
          </p>
        </div>
      </div>
    </div>
  );
};
