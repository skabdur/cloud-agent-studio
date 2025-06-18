
import { useState, useCallback } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';

export const FileUploadZone = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

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
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#2e2e2e] mb-2">Dataset Upload</h3>
        <p className="text-gray-600">Upload your data to begin analysis</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-[#3f51b5] bg-indigo-50'
            : uploadStatus === 'success'
            ? 'border-[#4caf50] bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
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

        {uploadStatus === 'idle' && (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <h4 className="text-lg font-medium text-[#2e2e2e] mb-2">Drop files here</h4>
              <p className="text-gray-500 mb-1">or click to browse</p>
              <p className="text-sm text-gray-400">CSV, JSON, Excel files supported</p>
            </div>
          </div>
        )}

        {uploadStatus === 'uploading' && (
          <div className="space-y-4">
            <div className="h-12 w-12 mx-auto">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#3f51b5]"></div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#2e2e2e]">Processing...</h4>
              <p className="text-gray-500">Validating and uploading your data</p>
            </div>
          </div>
        )}

        {uploadStatus === 'success' && uploadedFile && (
          <div className="space-y-4">
            <CheckCircle className="h-12 w-12 text-[#4caf50] mx-auto" />
            <div>
              <h4 className="text-lg font-medium text-[#2e2e2e]">Upload Complete</h4>
              <p className="text-gray-500 mb-4">Ready for agent processing</p>
              <div className="inline-flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                <File className="h-5 w-5 text-[#4caf50]" />
                <div className="text-left">
                  <p className="text-sm font-medium text-[#2e2e2e]">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
