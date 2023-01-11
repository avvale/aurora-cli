import * as fs from 'node:fs';
import * as path from 'node:path';

// imports
import { BackHandler } from '../../handlers';
import { cliterConfig } from '../../config';

export const generateJsonLockFile = async (): Promise<void> =>
{
    const jsonPath = path.join(process.cwd(), 'cliter', BackHandler.stateService.schema.boundedContextName.toKebabCase());

    if (!fs.existsSync(jsonPath)) fs.mkdirSync(jsonPath, { recursive: true });

    const jsonLockFile = {
        version: cliterConfig.lockJsonVersion,
        files  : BackHandler.stateService.newLockFiles,
    };

    fs.writeFileSync(path.join(jsonPath, `${BackHandler.stateService.schema.moduleName}-lock.json`), JSON.stringify(jsonLockFile, null, 4), 'utf8');
};
