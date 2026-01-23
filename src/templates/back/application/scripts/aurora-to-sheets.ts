/**
 * Aurora YAML to Google Sheets TSV converter
 * Usage: npx ts-node scripts/aurora-to-sheets.ts <yaml-file>
 * Output: TSV format ready to paste into Google Sheets
 */

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

interface AuroraProperty {
    name: string;
    type: string;
    nullable?: boolean;
    unsigned?: boolean;
    autoIncrement?: boolean;
    index?: string;
    defaultValue?: any;
    maxLength?: number;
    enumOptions?: string[];
    relationship?: {
        type: string;
        aggregateName: string;
        modulePath: string;
        key?: string;
        field?: string;
    };
    description?: string;
}

interface AuroraSchema {
    moduleName: string;
    aggregateProperties: AuroraProperty[];
}

// Map Aurora types to SQL types
const typeMapping: Record<string, { sql: string; subtipo?: string }> = {
    'id': { sql: 'UUID' },
    'varchar': { sql: 'VARCHAR' },
    'text': { sql: 'TEXT' },
    'boolean': { sql: 'BOOLEAN' },
    'int': { sql: 'INTEGER' },
    'smallint': { sql: 'SMALLINT' },
    'bigint': { sql: 'BIGINT' },
    'decimal': { sql: 'DECIMAL' },
    'timestamp': { sql: 'TIMESTAMP' },
    'date': { sql: 'DATE' },
    'json': { sql: 'JSONB' },
    'enum': { sql: 'ENUM' },
    'relationship': { sql: 'UUID', subtipo: 'FK' },
};

function mapType(prop: AuroraProperty): { tipoSql: string; subtipoSql: string } {
    const mapping = typeMapping[prop.type] || { sql: prop.type.toUpperCase() };
    let subtipo = mapping.subtipo || '';

    if (prop.type === 'enum') {
        subtipo = 'ENUM';
    } else if (prop.type === 'relationship') {
        subtipo = prop.relationship?.type || 'FK';
    }

    return { tipoSql: mapping.sql, subtipoSql: subtipo };
}

function formatValues(prop: AuroraProperty): string {
    if (prop.enumOptions) {
        return prop.enumOptions.join(', ');
    }
    return '';
}

function formatIndex(prop: AuroraProperty): string {
    if (prop.index === 'unique') return 'UNIQUE';
    if (prop.index === 'index') return 'INDEX';
    if (prop.autoIncrement) return 'PK'; // Usually autoincrement implies primary or unique
    return '';
}

function formatDefault(prop: AuroraProperty): string {
    if (prop.defaultValue === undefined || prop.defaultValue === null) return '';
    if (typeof prop.defaultValue === 'boolean') return prop.defaultValue ? 'true' : 'false';
    return String(prop.defaultValue);
}

function getMaestro(prop: AuroraProperty): string {
    if (prop.relationship?.modulePath) {
        return prop.relationship.modulePath;
    }
    return '';
}

function getRelacion(prop: AuroraProperty): string {
    if (prop.relationship?.type) {
        return prop.relationship.type;
    }
    return '';
}

function cleanDescription(desc?: string): string {
    if (!desc) return '';
    // Remove extra whitespace and newlines, trim
    return desc.replace(/\s+/g, ' ').trim();
}

function convertToTsv(schema: AuroraSchema): string {
    const headers = [
        'API field',
        'Tipo SQL',
        'Subtipo SQL',
        'Values',
        'Nullable',
        'Unsigned',
        'Autoincrement',
        'Readonly',
        'Index',
        'Default',
        'Max length',
        'Web component',
        'Label',
        'Maestro',
        'Relación',
        'Descripción',
        'Observaciones',
    ];

    const rows: string[][] = [headers];

    for (const prop of schema.aggregateProperties) {
        const { tipoSql, subtipoSql } = mapType(prop);

        const row = [
            prop.name,                                    // API field
            tipoSql,                                      // Tipo SQL
            subtipoSql,                                   // Subtipo SQL
            formatValues(prop),                           // Values
            prop.nullable ? 'TRUE' : 'FALSE',             // Nullable
            prop.unsigned ? 'TRUE' : '',                  // Unsigned
            prop.autoIncrement ? 'TRUE' : '',             // Autoincrement
            '',                                           // Readonly (not in YAML)
            formatIndex(prop),                            // Index
            formatDefault(prop),                          // Default
            prop.maxLength ? String(prop.maxLength) : '', // Max length
            '',                                           // Web component (not in YAML)
            '',                                           // Label (not in YAML)
            getMaestro(prop),                             // Maestro
            getRelacion(prop),                            // Relación
            cleanDescription(prop.description),           // Descripción
            '',                                           // Observaciones
        ];

        rows.push(row);
    }

    return rows.map(row => row.join('\t')).join('\n');
}

// Main
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: npx ts-node scripts/aurora-to-sheets.ts <yaml-file>');
    console.error('Example: npx ts-node scripts/aurora-to-sheets.ts cliter/business-partner-portal/payment-mode.aurora.yaml');
    process.exit(1);
}

const filePath = args[0];
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const schema = yaml.load(content) as AuroraSchema;

console.log(`# Module: ${schema.moduleName}`);
console.log(convertToTsv(schema));
