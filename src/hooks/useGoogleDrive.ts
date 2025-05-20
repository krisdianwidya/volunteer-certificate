import { useState, useEffect } from 'react';
import { googleDriveService } from '../lib/googleDrive';

// These values will be replaced with actual credentials
const GOOGLE_DRIVE_CONFIG = {
  clientId: 'YOUR_CLIENT_ID',
  apiKey: 'YOUR_API_KEY',
  scope: 'https://www.googleapis.com/auth/drive.file',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
};

export function useGoogleDrive() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeGoogleDrive = async () => {
      try {
        setIsLoading(true);
        await googleDriveService.initialize(GOOGLE_DRIVE_CONFIG);
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Google Drive'));
      } finally {
        setIsLoading(false);
      }
    };

    if (!isInitialized) {
      initializeGoogleDrive();
    }
  }, [isInitialized]);

  const uploadFile = async (file: File): Promise<string> => {
    try {
      setIsLoading(true);
      const fileUrl = await googleDriveService.uploadFile(file);
      return fileUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload file'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    error,
    uploadFile,
  };
}