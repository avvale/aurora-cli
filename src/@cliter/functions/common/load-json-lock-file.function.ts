import * as fs from 'node:fs';
import * as path from 'node:path';
import { LockFile } from '../../types';

export const loadJsonLockFile = (
    boundedContextName: string,
    moduleName: string,
): LockFile[] =>
{
    const jsonPath = path.join(
        process.cwd(),
        'cliter',
        boundedContextName.toKebabCase(),
        moduleName.toKebabCase() + '-lock.json',
    );

    if (!fs.existsSync(jsonPath)) return [];

    const lockFiles = (JSON.parse(fs.readFileSync(jsonPath, 'utf8')).files) as LockFile[];

    // if windows, replace \\ with /
    if (path.sep === '\\')
    {
        for (const lockFile of lockFiles)
        {
            lockFile.path = lockFile.path.replace(/\//g, '\\');
        }
    }

    return lockFiles;
};
