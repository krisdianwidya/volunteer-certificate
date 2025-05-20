import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useGoogleDrive } from '../hooks/useGoogleDrive';

interface FileUploadProps {
  onUploadComplete: (fileUrl: string) => void;
  onUploadError: (error: Error) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete, onUploadError }) => {
  const { uploadFile, isLoading, error } = useGoogleDrive();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileUrl = await uploadFile(file);
      onUploadComplete(fileUrl);
    } catch (err) {
      onUploadError(err instanceof Error ? err : new Error('Upload failed'));
    }
  }, [uploadFile, onUploadComplete, onUploadError]);

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isLoading}
      />
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isLoading ? 'Uploading...' : 'Click or drag file to upload certificate'}
        </p>
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>
    </div>
  );
};

export default FileUpload;