import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const extractGraphqlMessageErrors = (graphqlErrors: ReadonlyArray<GraphQLFormattedError>): string =>
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

export const extractGraphqlStatusErrorCodes = (graphqlErrors: ReadonlyArray<GraphQLFormattedError>): string =>
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