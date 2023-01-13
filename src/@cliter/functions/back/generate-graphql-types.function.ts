import * as shell from 'node:child_process';
import { GenerateCommandState } from '../../types';

export const generateGraphqlTypes = (generateCommandState: GenerateCommandState): void =>
{
    const graphqlTypes = shell.spawn('npm', ['run', 'graphql:types']);

    graphqlTypes.stdout.on('data', data => { /**/ });

    graphqlTypes.stderr.on('data', data => console.error(`${data}`));

    graphqlTypes.on('error', err =>
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
    });

    graphqlTypes.on('close', data => generateCommandState.command.log('GraphQL entities generated'));
};
