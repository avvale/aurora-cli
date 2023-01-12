import * as fs from 'node:fs';
import * as path from 'node:path';
import { cliterConfig } from '../../config';
import { GenerateCommandState, LockFile } from '../../types';

export const generateJsonLockFile = (
    generateCommandState: GenerateCommandState,
    lockFiles: LockFile[] = [],
): void =>
{
    const jsonPath = path.join(process.cwd(), 'cliter', generateCommandState.schema.boundedContextName.toKebabCase());

    if (!fs.existsSync(jsonPath)) fs.mkdirSync(jsonPath, { recursive: true });

    const jsonLockFile = {
        version: cliterConfig.lockJsonVersion,
        files  : lockFiles,
    };

    fs.writeFileSync(path.join(jsonPath, `${generateCommandState.schema.moduleName}-lock.json`), JSON.stringify(jsonLockFile, null, 4), 'utf8');
};
