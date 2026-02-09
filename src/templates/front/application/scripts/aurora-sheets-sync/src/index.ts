#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';
import * as path from 'path';
import { getGoogleSheetsAuth } from './auth/google-auth';
import { getConfigManager } from './config/sheets-config';
import { formatDiff, formatDiffSummary, SchemaDiff } from './sync/diff-engine';
import { listModulesInSheet, pullBoundedContext } from './sync/sheet-to-yaml';
import { pushBoundedContext } from './sync/yaml-to-sheet';
import { AuroraSchema } from './types';

const program = new Command();

program
  .name('aurora-sheets')
  .description(
    'Bidirectional sync between Aurora YAML schemas and Google Sheets',
  )
  .version('1.0.0');

// Push command: YAML → Google Sheet
program
  .command('push')
  .description('Push YAML schemas to Google Sheets')
  .option('--bc <name>', 'Bounded context name')
  .option('--all', 'Push all bounded contexts')
  .option('--dry-run', 'Show what would be done without making changes')
  .option('-v, --verbose', 'Show detailed output')
  .action(async (options) => {
    try {
      const config = getConfigManager();
      await config.load();

      const auth = await getGoogleSheetsAuth({
        credentialsPath: config.getCredentialsPath(),
      });

      const boundedContexts = options.all
        ? config.getAllBoundedContextNames()
        : options.bc
          ? [options.bc]
          : [];

      if (boundedContexts.length === 0) {
        console.error('Error: Specify --bc <name> or --all');
        process.exit(1);
      }

      for (const bc of boundedContexts) {
        console.log(`\nPushing: ${bc}`);
        const result = await pushBoundedContext(auth, config, bc, {
          dryRun: options.dryRun,
          verbose: options.verbose,
        });

        for (const msg of result.messages) {
          console.log(`  ${msg}`);
        }

        if (!result.success) {
          process.exit(1);
        }
      }

      console.log('\nPush completed successfully!');
    } catch (error) {
      console.error('Error:', (error as Error).message);
      process.exit(1);
    }
  });

// Pull command: Google Sheet → YAML
program
  .command('pull')
  .description('Pull schemas from Google Sheets to YAML files')
  .option('--bc <name>', 'Bounded context name')
  .option('--all', 'Pull all bounded contexts')
  .option('--dry-run', 'Show what would be done without making changes')
  .option('--no-backup', 'Skip creating backup before pull')
  .option('-v, --verbose', 'Show detailed output')
  .action(async (options) => {
    try {
      const config = getConfigManager();
      await config.load();

      const auth = await getGoogleSheetsAuth({
        credentialsPath: config.getCredentialsPath(),
      });

      const boundedContexts = options.all
        ? config.getAllBoundedContextNames()
        : options.bc
          ? [options.bc]
          : [];

      if (boundedContexts.length === 0) {
        console.error('Error: Specify --bc <name> or --all');
        process.exit(1);
      }

      for (const bc of boundedContexts) {
        console.log(`\nPulling: ${bc}`);
        const result = await pullBoundedContext(auth, config, bc, {
          dryRun: options.dryRun,
          verbose: options.verbose,
          backup: options.backup,
        });

        for (const msg of result.messages) {
          console.log(`  ${msg}`);
        }

        if (!result.success) {
          process.exit(1);
        }
      }

      console.log('\nPull completed successfully!');
    } catch (error) {
      console.error('Error:', (error as Error).message);
      process.exit(1);
    }
  });

// Diff command: Compare YAML vs Sheet
program
  .command('diff')
  .description('Show differences between YAML and Google Sheets')
  .option('--bc <name>', 'Bounded context name')
  .option('--all', 'Diff all bounded contexts')
  .option('--summary', 'Show only summary')
  .action(async (options) => {
    try {
      const config = getConfigManager();
      await config.load();

      const auth = await getGoogleSheetsAuth({
        credentialsPath: config.getCredentialsPath(),
      });

      const boundedContexts = options.all
        ? config.getAllBoundedContextNames()
        : options.bc
          ? [options.bc]
          : [];

      if (boundedContexts.length === 0) {
        console.error('Error: Specify --bc <name> or --all');
        process.exit(1);
      }

      const allDiffs: SchemaDiff[] = [];

      for (const bc of boundedContexts) {
        console.log(`\nComparing: ${bc}`);
        const diffs = await diffBoundedContext(auth, config, bc);
        allDiffs.push(...diffs);

        if (!options.summary) {
          for (const diff of diffs) {
            console.log(formatDiff(diff));
          }
        }
      }

      console.log(formatDiffSummary(allDiffs));
    } catch (error) {
      console.error('Error:', (error as Error).message);
      process.exit(1);
    }
  });

// Init command: Create config template
program
  .command('init')
  .description('Initialize configuration file')
  .option('--force', 'Overwrite existing config')
  .action(async (options) => {
    try {
      const configPath = path.join(process.cwd(), 'aurora-sheets.config.json');

      if ((await fs.pathExists(configPath)) && !options.force) {
        console.error('Config file already exists. Use --force to overwrite.');
        process.exit(1);
      }

      const config = getConfigManager();
      await config.createTemplate();

      console.log('Created: aurora-sheets.config.json');
      console.log('\nNext steps:');
      console.log('1. Create a Google Cloud project and enable Sheets API');
      console.log('2. Create a service account and download JSON key');
      console.log(
        '3. Save key to: scripts/aurora-sheets-sync/credentials/service-account.json',
      );
      console.log('4. Share your Google Sheets with the service account email');
      console.log(
        '5. Update aurora-sheets.config.json with your spreadsheet IDs',
      );
    } catch (error) {
      console.error('Error:', (error as Error).message);
      process.exit(1);
    }
  });

// Validate command: Validate sheet format
program
  .command('validate')
  .description('Validate Google Sheet format')
  .option('--bc <name>', 'Bounded context name')
  .action(async (options) => {
    try {
      if (!options.bc) {
        console.error('Error: Specify --bc <name>');
        process.exit(1);
      }

      const config = getConfigManager();
      await config.load();

      const auth = await getGoogleSheetsAuth({
        credentialsPath: config.getCredentialsPath(),
      });

      const bcConfig = config.getBoundedContext(options.bc);

      // Test connection
      console.log('Testing connection...');
      await auth.testConnection(bcConfig.spreadsheetId);
      console.log('✓ Connection successful');

      // List modules
      console.log('\nModules in spreadsheet:');
      const modules = await listModulesInSheet(auth, bcConfig.spreadsheetId);
      for (const mod of modules) {
        console.log(`  • ${mod}`);
      }

      console.log(`\nTotal: ${modules.length} modules`);
    } catch (error) {
      console.error('Error:', (error as Error).message);
      process.exit(1);
    }
  });

// List command: List available bounded contexts
program
  .command('list')
  .description('List configured bounded contexts')
  .action(async () => {
    try {
      const config = getConfigManager();
      await config.load();

      console.log('Configured bounded contexts:');
      for (const bc of config.getAllBoundedContextNames()) {
        const bcConfig = config.getBoundedContext(bc);
        console.log(`  • ${bc}`);
        console.log(`    Spreadsheet ID: ${bcConfig.spreadsheetId}`);
        if (bcConfig.description) {
          console.log(`    Description: ${bcConfig.description}`);
        }
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
      process.exit(1);
    }
  });

/**
 * Diff a bounded context between YAML and Sheet
 */
async function diffBoundedContext(
  auth: ReturnType<typeof getGoogleSheetsAuth> extends Promise<infer T>
    ? T
    : never,
  config: ReturnType<typeof getConfigManager>,
  boundedContextName: string,
): Promise<SchemaDiff[]> {
  const bcConfig = config.getBoundedContext(boundedContextName);
  const cliterPath = config.getCliterPath();
  const bcPath = path.join(cliterPath, boundedContextName);

  const diffs: SchemaDiff[] = [];

  // Load YAML schemas
  const yamlSchemas = new Map<string, AuroraSchema>();
  if (await fs.pathExists(bcPath)) {
    const files = await fs.readdir(bcPath);
    for (const file of files) {
      if (!file.endsWith('.aurora.yaml')) continue;
      const content = await fs.readFile(path.join(bcPath, file), 'utf-8');
      const schema = yaml.load(content) as AuroraSchema;
      yamlSchemas.set(schema.moduleName, schema);
    }
  }

  // Load Sheet modules (simplified - just get module list)
  const modules = await listModulesInSheet(auth, bcConfig.spreadsheetId);

  // For now, compare what we have in YAML
  for (const [name, yamlSchema] of yamlSchemas) {
    // If module exists in sheet, we'd need to read it for full diff
    // For simplicity, just report modules
    if (!modules.includes(name)) {
      diffs.push({
        moduleName: name,
        hasChanges: true,
        metadataChanges: {},
        propertiesAdded: [],
        propertiesRemoved: [],
        propertiesModified: [],
        pivotsChanged: [],
      });
    } else {
      // Module exists in both - would need full read for detailed diff
      diffs.push({
        moduleName: name,
        hasChanges: false,
        metadataChanges: {},
        propertiesAdded: [],
        propertiesRemoved: [],
        propertiesModified: [],
        pivotsChanged: [],
      });
    }
  }

  // Check for modules only in Sheet
  for (const mod of modules) {
    if (!yamlSchemas.has(mod)) {
      diffs.push({
        moduleName: mod,
        hasChanges: true,
        metadataChanges: { _note: { yaml: '(not found)', sheet: '(exists)' } },
        propertiesAdded: [],
        propertiesRemoved: [],
        propertiesModified: [],
        pivotsChanged: [],
      });
    }
  }

  return diffs;
}

program.parse();
