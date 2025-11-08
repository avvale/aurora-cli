import * as chalk from 'chalk';
import { createRequire } from 'node:module';
import { join } from 'node:path';

export async function formatCode(
    code: string,
    filepath: string,
    consumerCwd: string,
): Promise<string>
{
    try
    {
        const requireFromConsumer = createRequire(join(consumerCwd, 'package.json'));
        const prettier = requireFromConsumer('prettier');

        // load config project
        const resolved = (await prettier.resolveConfig(filepath, { editorconfig: true })) ?? {};

        // format using your config + filepath (for heuristics and parser)
        return await prettier
            .format(
                code,
                {
                    ...resolved,
                    filepath,
                    pluginSearchDirs: [consumerCwd],
                    // to force parser according extension:
                    // parser: filepath.endsWith('.ts') ? 'typescript' : 'html',
                },
            );
    }
    catch
    {
        console.log('%s prettier not found', chalk.yellow.bold('[INFO]'));
        return code;
    }
}
