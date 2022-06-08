import { DocumentNode } from 'graphql';

export interface GraphQLStatements
{
    fields: string;
    relationsFields?: string;
    queryPagination?: DocumentNode;
    queryObjectRelations?: DocumentNode;
    queryObjects?: DocumentNode;
    queryObject?: DocumentNode;
    mutationCreateObject?: DocumentNode;
    mutationUpdateObject?: DocumentNode;
    mutationDeleteObjectById?: DocumentNode;
}