import { GraphQLError } from 'graphql';
import { GraphQLErrors } from '@apollo/client/errors';

export const extractGraphqlMessageErrors = (graphqlErrors: GraphQLErrors): string =>
{
    return graphqlErrors.map((graphqlError: GraphQLError) =>
    {
        const extensions = graphqlError.extensions as any;

        if (Array.isArray(extensions.exception?.errors))
        {
            return extensions
                .exception
                .errors
                .map(error => `${error.message}`);
        }

        if (extensions.originalError?.message)
        {
            return `${extensions.originalError.message}`;
        }

    }).join('<br>');
};

export const extractGraphqlStatusErrorCodes = (graphqlErrors: GraphQLErrors): string =>
{
    return graphqlErrors.map((graphqlError: GraphQLError) =>
    {
        const extensions = graphqlError.extensions as any;

        if (Array.isArray(extensions.exception?.errors))
        {
            return extensions
                .exception
                .errors
                .map(error => error.statusCode);
        }

        if (extensions.originalError?.statusCode)
        {
            return extensions.originalError.statusCode;
        }

    }).join('-');
};