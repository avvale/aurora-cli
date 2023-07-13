import gql from 'graphql-tag';

export const fields = `
    name
    alias
    status
    documentsNumber
    defaultSortingField
    numMemoryShards
    timestampCreatedAt
    isEnableNestedFields
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query SearchEnginePaginateCollections (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: searchEnginePaginateCollections (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query SearchEngineGetCollections (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: searchEngineGetCollections (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query SearchEngineFindCollectionById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: searchEngineFindCollectionById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query SearchEngineFindCollectionByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryPaginateFields: QueryStatement
        $constraintPaginateFields: QueryStatement
    ) {
        object: searchEngineFindCollectionById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        searchEnginePaginateFields (
            query: $queryPaginateFields
            constraint: $constraintPaginateFields
        ) {
            total
            rows
            count
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query SearchEngineFindCollection (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: searchEngineFindCollection (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation SearchEngineCreateCollection (
        $payload: SearchEngineCreateCollectionInput!
    ) {
        searchEngineCreateCollection (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation SearchEngineUpdateCollectionById (
        $payload: SearchEngineUpdateCollectionByIdInput!
        $constraint: QueryStatement
    ) {
        searchEngineUpdateCollectionById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation SearchEngineUpdateCollections (
        $payload: SearchEngineUpdateCollectionsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        searchEngineUpdateCollections (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation SearchEngineDeleteCollectionById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        searchEngineDeleteCollectionById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation SearchEngineDeleteCollections (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        searchEngineDeleteCollections (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Mutation additionalApis
export const indexCollectionMutation = gql`
    mutation SearchEngineIndexCollection (
        $id: ID!
        $constraint: QueryStatement
    ) {
        searchEngineIndexCollection (
            id: $id
            constraint: $constraint
        )
    }
`;
