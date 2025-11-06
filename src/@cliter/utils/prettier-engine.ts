import { createRequire } from 'node:module';
import { join } from 'node:path';
import * as chalk from 'chalk';

export async function formatCode(
    code: string,
    filePath: string,
    consumerCwd: string,
): Promise<string>
{
    try
    {
        const requireFromConsumer = createRequire(join(consumerCwd, 'package.json'));
        const prettier = requireFromConsumer('prettier');

        const plugins: any[] = [];
        const tryLoad = (id: string) =>
        {
            try
            {
                plugins.push(requireFromConsumer(id));
            }
            catch
            {
                //  console.log('%s Prettier plugin %s not found in consumer project', chalk.yellow.bold('[INFO]'), chalk.cyan(id));
            }
        };

        // core parsers (TS/HTML/ESTree)
        tryLoad('prettier/plugins/typescript');
        tryLoad('prettier/plugins/html');
        tryLoad('prettier/plugins/estree');

        // angular plugins
        tryLoad('prettier-plugin-tailwindcss');
        tryLoad('prettier-plugin-organize-attributes');
        tryLoad('prettier-plugin-organize-imports');

        // load config project
        const resolved = (await prettier.resolveConfig(filePath, { editorconfig: true })) ?? {};

        // format using your config + filepath (for heuristics and parser)
        return await prettier
            .format(
                code,
                {
                    ...resolved,
                    filepath: filePath,
                    plugins,
                    // to force parser according extension:
                    // parser: filePath.endsWith('.ts') ? 'typescript' : 'html',
                },
            );
    }
    catch
    {
        console.log('%s prettier not found', chalk.yellow.bold('[INFO]'));
        return code;
    }
}
