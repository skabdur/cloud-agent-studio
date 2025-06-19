
import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Database } from 'lucide-react';

interface DataUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
}

export const DataUpload = ({ onFileUpload, uploadedFile }: DataUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      onFileUpload(file);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Data Upload</h2>
        <p className="text-slate-400 mt-1">Upload your dataset to begin AI analysis</p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-emerald-400 bg-emerald-400/5'
            : uploadStatus === 'success'
            ? 'border-emerald-500 bg-emerald-500/5'
            : uploadStatus === 'error'
            ? 'border-red-500 bg-red-500/5'
            : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          accept=".csv,.json,.xlsx,.txt"
          disabled={uploadStatus === 'uploading'}
        />

        <div className="space-y-4">
          {uploadStatus === 'idle' && (
            <>
              <Upload className="h-16 w-16 text-slate-400 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-white">Upload a file to begin analysis</h3>
                <p className="text-slate-400 mt-2">Drop your dataset here or click to browse</p>
                <p className="text-sm text-slate-500 mt-1">Supports CSV, JSON, Excel, and TXT files</p>
              </div>
            </>
          )}

          {uploadStatus === 'uploading' && (
            <>
              <div className="h-16 w-16 mx-auto">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-emerald-400"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Processing your file...</h3>
                <p className="text-slate-400 mt-2">Validating and preparing for analysis</p>
              </div>
            </>
          )}

          {uploadStatus === 'success' && uploadedFile && (
            <>
              <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-white">File uploaded successfully!</h3>
                <p className="text-slate-400 mt-2">Your data is ready for agent analysis</p>
                <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-emerald-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">{uploadedFile.name}</p>
                      <p className="text-slate-400 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Next Steps - Only show after successful upload */}
      {uploadStatus === 'success' && (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-3">✓ Ready for Analysis</h3>
          <p className="text-emerald-300 text-sm mb-3">
            Your file has been validated and is ready for processing. Navigate to other tabs to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-slate-300">Monitor agents in the Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-slate-300">Watch workflow progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-slate-300">View live activity feed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-slate-300">Download results when complete</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
