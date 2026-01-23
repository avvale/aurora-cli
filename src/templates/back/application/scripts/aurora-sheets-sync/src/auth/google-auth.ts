import * as fs from 'fs-extra';
import { GoogleAuth } from 'google-auth-library';
import { google, sheets_v4 } from 'googleapis';
import * as path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export interface GoogleAuthConfig {
  credentialsPath: string;
}

export class GoogleSheetsAuth {
  private auth: GoogleAuth | null = null;
  private sheetsApi: sheets_v4.Sheets | null = null;
  private credentialsPath: string;

  constructor(config: GoogleAuthConfig) {
    this.credentialsPath = config.credentialsPath;
  }

  async initialize(): Promise<void> {
    const absolutePath = path.isAbsolute(this.credentialsPath)
      ? this.credentialsPath
      : path.resolve(process.cwd(), this.credentialsPath);

    if (!(await fs.pathExists(absolutePath))) {
      throw new Error(
        `Service account credentials not found at: ${absolutePath}\n` +
          'Please create a service account in Google Cloud Console and download the JSON key.',
      );
    }

    this.auth = new GoogleAuth({
      keyFile: absolutePath,
      scopes: SCOPES,
    });

    this.sheetsApi = google.sheets({ version: 'v4', auth: this.auth });
  }

  getSheetsApi(): sheets_v4.Sheets {
    if (!this.sheetsApi) {
      throw new Error(
        'Google Sheets API not initialized. Call initialize() first.',
      );
    }
    return this.sheetsApi;
  }

  async testConnection(spreadsheetId: string): Promise<boolean> {
    try {
      const api = this.getSheetsApi();
      await api.spreadsheets.get({
        spreadsheetId,
        fields: 'properties.title',
      });
      return true;
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('403')) {
        throw new Error(
          `Access denied to spreadsheet ${spreadsheetId}. ` +
            'Make sure you shared the spreadsheet with the service account email.',
        );
      }
      throw error;
    }
  }
}

let authInstance: GoogleSheetsAuth | null = null;

export async function getGoogleSheetsAuth(
  config: GoogleAuthConfig,
): Promise<GoogleSheetsAuth> {
  if (!authInstance) {
    authInstance = new GoogleSheetsAuth(config);
    await authInstance.initialize();
  }
  return authInstance;
}

export function resetAuthInstance(): void {
  authInstance = null;
}
