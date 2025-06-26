import gql from 'graphql-tag';

export const fields = `
    name
    type
    version
    isActive
    isInstalled
    isUpdated
    upScript
    downScript
    sort
    executedAt
    checkedAt
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query ToolsPaginateProcedures (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: toolsPaginateProcedures (
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
    query ToolsGetProcedures (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: toolsGetProcedures (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query ToolsFindProcedureById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: toolsFindProcedureById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query ToolsFindProcedure (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: toolsFindProcedure (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation ToolsCreateProcedure (
        $payload: ToolsCreateProcedureInput!
    ) {
        toolsCreateProcedure (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation ToolsCreateProcedures (
        $payload: [ToolsCreateProcedureInput]!
    ) {
        toolsCreateProcedures (
            payload: $payload
        )
    }
`;

export const updateByIdMutation = gql`
    mutation ToolsUpdateProcedureById (
        $payload: ToolsUpdateProcedureByIdInput!
        $constraint: QueryStatement
    ) {
        toolsUpdateProcedureById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation ToolsUpdateProcedures (
        $payload: ToolsUpdateProceduresInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsUpdateProcedures (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation ToolsDeleteProcedureById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        toolsDeleteProcedureById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation ToolsDeleteProcedures (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsDeleteProcedures (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Mutation additionalApis
export const upScriptProcedureMutation = gql`
    mutation ToolsUpScriptProcedure (
        $procedureId: ID!
    ) {
        toolsUpScriptProcedure (
            procedureId: $procedureId
        )
    }
`;

export const downScriptProcedureMutation = gql`
    mutation ToolsDownScriptProcedure (
        $procedureId: ID!
    ) {
        toolsDownScriptProcedure (
            procedureId: $procedureId
        )
    }
`;

export const checkScriptProcedureMutation = gql`
    mutation ToolsCheckScriptProcedure (
        $procedureId: ID!
    ) {
        toolsCheckScriptProcedure (
            procedureId: $procedureId
        )
    }
`;
