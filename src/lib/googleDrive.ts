import { supabase } from './supabase';

interface GoogleDriveConfig {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
}

class GoogleDriveService {
  private static instance: GoogleDriveService;
  private initialized = false;
  private config: GoogleDriveConfig | null = null;

  private constructor() {}

  static getInstance(): GoogleDriveService {
    if (!GoogleDriveService.instance) {
      GoogleDriveService.instance = new GoogleDriveService();
    }
    return GoogleDriveService.instance;
  }

  async initialize(config: GoogleDriveConfig) {
    if (this.initialized) return;

    this.config = config;
    
    // Load the Google API client library
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

    // Initialize the Google API client
    await new Promise<void>((resolve, reject) => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey: this.config?.apiKey,
            clientId: this.config?.clientId,
            scope: this.config?.scope,
            discoveryDocs: this.config?.discoveryDocs,
          });
          this.initialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async uploadFile(file: File, folderId?: string): Promise<string> {
    if (!this.initialized) {
      throw new Error('Google Drive service not initialized');
    }

    try {
      // Create a new folder if folderId is not provided
      if (!folderId) {
        const folderMetadata = {
          name: 'Volunteer Certificates',
          mimeType: 'application/vnd.google-apps.folder',
        };

        const folder = await window.gapi.client.drive.files.create({
          resource: folderMetadata,
          fields: 'id',
        });

        folderId = folder.result.id;
      }

      // Prepare the file metadata
      const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: [folderId],
      };

      // Create a new file in Google Drive
      const response = await window.gapi.client.drive.files.create({
        resource: metadata,
        media: {
          mimeType: file.type,
          body: file,
        },
        fields: 'id, webViewLink',
      });

      // Return the web view link of the uploaded file
      return response.result.webViewLink;
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      throw error;
    }
  }

  async listFiles(folderId?: string): Promise<Array<{ id: string; name: string; webViewLink: string }>> {
    if (!this.initialized) {
      throw new Error('Google Drive service not initialized');
    }

    try {
      const query = folderId ? `'${folderId}' in parents` : 'trashed = false';
      const response = await window.gapi.client.drive.files.list({
        q: query,
        fields: 'files(id, name, webViewLink)',
        spaces: 'drive',
      });

      return response.result.files;
    } catch (error) {
      console.error('Error listing files from Google Drive:', error);
      throw error;
    }
  }
}

export const googleDriveService = GoogleDriveService.getInstance();