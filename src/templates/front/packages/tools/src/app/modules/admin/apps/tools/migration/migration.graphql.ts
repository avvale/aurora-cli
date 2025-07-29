import gql from 'graphql-tag';

export const fields = `
    name
    version
    isActive
    isExecuted
    upScript
    downScript
    sort
    executedAt
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query ToolsPaginateMigrations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: toolsPaginateMigrations (
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
    query ToolsGetMigrations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: toolsGetMigrations (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query ToolsFindMigrationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: toolsFindMigrationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query ToolsFindMigration (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: toolsFindMigration (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation ToolsCreateMigration (
        $payload: ToolsCreateMigrationInput!
    ) {
        toolsCreateMigration (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation ToolsCreateMigrations (
        $payload: [ToolsCreateMigrationInput]!
    ) {
        toolsCreateMigrations (
            payload: $payload
        )
    }
`;

export const updateByIdMutation = gql`
    mutation ToolsUpdateMigrationById (
        $payload: ToolsUpdateMigrationByIdInput!
        $constraint: QueryStatement
    ) {
        toolsUpdateMigrationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation ToolsUpdateMigrations (
        $payload: ToolsUpdateMigrationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsUpdateMigrations (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation ToolsDeleteMigrationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        toolsDeleteMigrationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation ToolsDeleteMigrations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsDeleteMigrations (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Mutation additionalApis
export const upScriptMigrationMutation = gql`
    mutation ToolsUpScriptMigration (
        $migrationId: ID!
    ) {
        toolsUpScriptMigration (
            migrationId: $migrationId
        )
    }
`;

export const downScriptMigrationMutation = gql`
    mutation ToolsDownScriptMigration (
        $migrationId: ID!
    ) {
        toolsDownScriptMigration (
            migrationId: $migrationId
        )
    }
`;

export const runScriptsMigrationMutation = gql`
    mutation ToolsRunScriptsMigration {
        toolsRunScriptsMigration
    }
`;
