// node
import * as child from 'node:child_process';

// imports
import { BackHandler } from '../../handlers';

export const generateGraphqlTypes = async (): Promise<string> =>
{
    // graphql
    return new Promise((resolve, reject) =>
    {
        // TODO pass to spawn
        child.exec('npm run graphql:types', (err, stdout, stderr) =>
        {
            if (err)
            {
                BackHandler.stateService.command.warn(`Attention! we can't generate graphql entities.
It may refer to a relationship that has not yet been created. Use the --noGraphQLTypes or -g parameter to avoid creating GraphQL types.`);

                if (BackHandler.stateService.flags.verbose)
                {
                    BackHandler.stateService.command.error(`Error to generate-typings: ${err.message}`);
                }
                else
                {
                    BackHandler.stateService.command.warn('Use the -v or --verbose parameter for more information.');
                }

                return;
            }

            BackHandler.stateService.command.log('GraphQL entities generated');

            resolve(stdout ? stdout : stderr);
        });
    });
};
