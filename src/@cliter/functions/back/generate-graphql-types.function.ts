import { GenerateCommandState } from '../../types';
import { exec } from '../common';

export const generateGraphqlTypes = async (generateCommandState: GenerateCommandState): Promise<void> =>
{
    await exec(
        'npm',
        ['run', 'graphql:types'],
        {
            verbose: true,
            onError: (error: Error) =>
            {
                generateCommandState.command.warn(`Attention! we can't generate graphql entities.
                It may refer to a relationship that has not yet been created. Use the --noGraphQLTypes or -g parameter to avoid creating GraphQL types.`);

                if (generateCommandState.flags.verbose)
                {
                    generateCommandState.command.error(`Error to generate-typings: ${error.message}`);
                }
                else
                {
                    generateCommandState.command.warn('Use the -v or --verbose parameter for more information.');
                }
            },
            onClose: () =>
            {
                generateCommandState.command.log('GraphQL entities generated');
            },
        });
};
