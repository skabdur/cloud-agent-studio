
import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Database } from 'lucide-react';

export const DataUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
      setUploadedFile(file);
      simulateUpload();
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
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
          accept=".csv,.json,.xlsx"
          disabled={uploadStatus === 'uploading'}
        />

        <div className="space-y-4">
          {uploadStatus === 'idle' && (
            <>
              <Upload className="h-16 w-16 text-slate-400 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-white">Drop your dataset here</h3>
                <p className="text-slate-400 mt-2">Or click to browse files</p>
                <p className="text-sm text-slate-500 mt-1">Supports CSV, JSON, and Excel files</p>
              </div>
            </>
          )}

          {uploadStatus === 'uploading' && (
            <>
              <div className="h-16 w-16 mx-auto">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-emerald-400"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Processing...</h3>
                <p className="text-slate-400 mt-2">Validating and uploading your data</p>
              </div>
            </>
          )}

          {uploadStatus === 'success' && uploadedFile && (
            <>
              <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-white">Upload Successful!</h3>
                <p className="text-slate-400 mt-2">Your data is ready for analysis</p>
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

      {/* Data Processing Pipeline */}
      {uploadStatus === 'success' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Database className="h-5 w-5 text-emerald-400" />
              </div>
              <h4 className="font-semibold text-white">Data Ingestion</h4>
            </div>
            <p className="text-emerald-300 text-sm">✓ Validated and stored in BigQuery</p>
            <p className="text-slate-400 text-xs mt-1">15,847 rows processed</p>
          </div>

          <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Database className="h-5 w-5 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white">Pattern Discovery</h4>
            </div>
            <p className="text-blue-300 text-sm">🔍 Analyzing correlations...</p>
            <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1">
              <div className="h-1 rounded-full bg-blue-400 animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <FileText className="h-5 w-5 text-slate-400" />
              </div>
              <h4 className="font-semibold text-white">Report Generation</h4>
            </div>
            <p className="text-slate-400 text-sm">⏳ Waiting for analysis...</p>
          </div>
        </div>
      )}
    </div>
  );
};
