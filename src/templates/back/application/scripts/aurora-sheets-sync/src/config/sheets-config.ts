import * as fs from 'fs-extra';
import * as path from 'path';

export interface BoundedContextConfig {
  spreadsheetId: string;
  description?: string;
}

export interface SheetsConfig {
  credentialsPath: string;
  boundedContexts: Record<string, BoundedContextConfig>;
  backupsPath?: string;
  cliterPath?: string;
}

const DEFAULT_CONFIG_FILENAME = 'aurora-sheets.config.json';
const DEFAULT_BACKUPS_PATH = 'backups/aurora-schemas';
const DEFAULT_CLITER_PATH = 'cliter';

export class SheetsConfigManager {
  private config: SheetsConfig | null = null;
  private configPath: string;
  private projectRoot: string;

  constructor(projectRoot?: string) {
    this.projectRoot = projectRoot || process.cwd();
    this.configPath = path.join(this.projectRoot, DEFAULT_CONFIG_FILENAME);
  }

  async load(): Promise<SheetsConfig> {
    if (this.config) {
      return this.config;
    }

    if (!(await fs.pathExists(this.configPath))) {
      throw new Error(
        `Configuration file not found: ${this.configPath}\n` +
          'Please create aurora-sheets.config.json in the project root.\n' +
          'Use "aurora-sheets init" to create a template.',
      );
    }

    const content = await fs.readFile(this.configPath, 'utf-8');
    this.config = JSON.parse(content) as SheetsConfig;

    // Apply defaults
    this.config.backupsPath = this.config.backupsPath || DEFAULT_BACKUPS_PATH;
    this.config.cliterPath = this.config.cliterPath || DEFAULT_CLITER_PATH;

    this.validateConfig();

    return this.config;
  }

  private validateConfig(): void {
    if (!this.config) {
      throw new Error('Config not loaded');
    }

    if (!this.config.credentialsPath) {
      throw new Error('Missing required field: credentialsPath');
    }

    if (
      !this.config.boundedContexts ||
      Object.keys(this.config.boundedContexts).length === 0
    ) {
      throw new Error(
        'Missing required field: boundedContexts (at least one required)',
      );
    }

    for (const [name, bc] of Object.entries(this.config.boundedContexts)) {
      if (!bc.spreadsheetId) {
        throw new Error(`Missing spreadsheetId for bounded context: ${name}`);
      }
    }
  }

  async save(config: SheetsConfig): Promise<void> {
    await fs.writeFile(
      this.configPath,
      JSON.stringify(config, null, 4),
      'utf-8',
    );
    this.config = config;
  }

  async createTemplate(): Promise<void> {
    const template: SheetsConfig = {
      credentialsPath:
        './scripts/aurora-sheets-sync/credentials/service-account.json',
      boundedContexts: {
        iam: {
          spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE',
          description: 'Identity and Access Management',
        },
        common: {
          spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE',
          description: 'Common module schemas',
        },
      },
      backupsPath: DEFAULT_BACKUPS_PATH,
      cliterPath: DEFAULT_CLITER_PATH,
    };

    await this.save(template);
  }

  getBoundedContext(name: string): BoundedContextConfig {
    if (!this.config) {
      throw new Error('Config not loaded. Call load() first.');
    }

    const bc = this.config.boundedContexts[name];
    if (!bc) {
      const available = Object.keys(this.config.boundedContexts).join(', ');
      throw new Error(
        `Bounded context "${name}" not found in configuration.\n` +
          `Available bounded contexts: ${available}`,
      );
    }

    return bc;
  }

  getAllBoundedContexts(): string[] {
    if (!this.config) {
      throw new Error('Config not loaded. Call load() first.');
    }
    return Object.keys(this.config.boundedContexts);
  }

  getCliterPath(): string {
    return path.join(
      this.projectRoot,
      this.config?.cliterPath || DEFAULT_CLITER_PATH,
    );
  }

  getBackupsPath(): string {
    return path.join(
      this.projectRoot,
      this.config?.backupsPath || DEFAULT_BACKUPS_PATH,
    );
  }

  getCredentialsPath(): string {
    if (!this.config) {
      throw new Error('Config not loaded. Call load() first.');
    }
    return this.config.credentialsPath;
  }

  getProjectRoot(): string {
    return this.projectRoot;
  }
}

let configInstance: SheetsConfigManager | null = null;

export function getConfigManager(projectRoot?: string): SheetsConfigManager {
  if (!configInstance) {
    configInstance = new SheetsConfigManager(projectRoot);
  }
  return configInstance;
}

export function resetConfigInstance(): void {
  configInstance = null;
}
