import { DocumentNode } from '@apollo/client/core';
import { QueryStatement } from '@aurora';
import gql from 'graphql-tag';

export const parseGqlFields = (
    graphqlStatement: DocumentNode,
    fields: string,
    ...queryStatements: QueryStatement[]
): DocumentNode =>
{
    let attributes = [];
    for (const queryStatement of queryStatements)
    {
        if (Array.isArray(queryStatement.attributes))
        {
            // avoid duplicate items
            attributes = [...new Set([...attributes ,...queryStatement.attributes])];
        }
    }

    const graphqlStringStatement = graphqlStatement.loc.source.body;

    // replace by attributes
    if (attributes.length > 0)
    {
        return gql`${
            graphqlStringStatement
                .replace('#FIELDS', attributes.join('\n'))
        }`;
    }

    // replace by original fields
    return gql`${
        graphqlStringStatement
            .replace('#FIELDS', fields)
    }`;
};