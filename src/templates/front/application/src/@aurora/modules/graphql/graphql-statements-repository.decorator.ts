

import { GraphQLStatements } from './graphql.types';

export function GraphQLStatementsRepository(statements: GraphQLStatements)
{
    return function <T extends { new(...args: any[]): { /**/ }; }>(constructor: T)
    {
        return class extends constructor
        {
            graphQLStatements: GraphQLStatements = statements;
        };
    };
}