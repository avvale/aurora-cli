import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { GraphQLTranslationError } from './graphql.types';

export const extractGraphqlErrorTranslations = (
    graphqlErrors: ReadonlyArray<GraphQLFormattedError>,
    translator: (translationKey: string, params?: Object) => string,
): GraphQLTranslationError[] =>
{
    return graphqlErrors
        .filter((graphqlError: GraphQLError) =>
        {
            const extensions = graphqlError.extensions as any;
            return extensions.originalError?.statusCode && extensions.originalError?.message;
        })
        .map((graphqlError: GraphQLError) =>
        {
            const extensions = graphqlError.extensions as any;
            return {
                statusCode: extensions.originalError.statusCode,
                translation: extensions.originalError.translation,
                message: extensions.originalError.translation ? translator(extensions.originalError.translation, extensions.originalError.params) : extensions.originalError.message,
            };
        });
};