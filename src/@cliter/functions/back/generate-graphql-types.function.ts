import * as child from 'node:child_process';
import { GenerateCommandState } from '../../types';

export const generateGraphqlTypes = async (generateCommandState: GenerateCommandState): Promise<string> =>
{
    // graphql
    return new Promise((resolve, reject) =>
    {
        // TODO pass to spawn
        child.exec('npm run graphql:types', (err, stdout, stderr) =>
        {
            if (err)
            {
                generateCommandState.command.warn(`Attention! we can't generate graphql entities.
It may refer to a relationship that has not yet been created. Use the --noGraphQLTypes or -g parameter to avoid creating GraphQL types.`);

                if (generateCommandState.flags.verbose)
                {
                    generateCommandState.command.error(`Error to generate-typings: ${err.message}`);
                }
                else
                {
                    generateCommandState.command.warn('Use the -v or --verbose parameter for more information.');
                }

                return;
            }

            generateCommandState.command.log('GraphQL entities generated');

            resolve(stdout ? stdout : stderr);
        });
    });
};
