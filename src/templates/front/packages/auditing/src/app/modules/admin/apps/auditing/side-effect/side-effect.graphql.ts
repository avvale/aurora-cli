import gql from 'graphql-tag';

export const fields = `
    rowId
    tags
    modelPath
    modelName
    operationId
    operationSort
    accountId
    email
    event
    auditableId
    oldValue
    newValue
    ip
    method
    baseUrl
    params
    query
    body
    userAgent
    isRollback
    rollbackSideEffectId
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AuditingPaginateSideEffects(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: auditingPaginateSideEffects(
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
    query AuditingGetSideEffects(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: auditingGetSideEffects(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AuditingFindSideEffectById($id: ID, $constraint: QueryStatement) {
        object: auditingFindSideEffectById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AuditingFindSideEffect(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: auditingFindSideEffect(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AuditingCreateSideEffect (
        $payload: AuditingCreateSideEffectInput!
    ) {
        auditingCreateSideEffect (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation AuditingCreateSideEffects(
        $payload: [AuditingCreateSideEffectInput]!
    ) {
        auditingCreateSideEffects(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation AuditingUpdateSideEffectById (
        $payload: AuditingUpdateSideEffectByIdInput!
        $constraint: QueryStatement
    ) {
        auditingUpdateSideEffectById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AuditingUpdateSideEffects (
        $payload: AuditingUpdateSideEffectsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        auditingUpdateSideEffects (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AuditingDeleteSideEffectById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        auditingDeleteSideEffectById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AuditingDeleteSideEffects (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        auditingDeleteSideEffects (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Mutation additionalApis
export const rollbackSideEffectMutation = gql`
    mutation AuditingRollbackSideEffect(
        $payload: AuditingUpdateSideEffectByIdInput!
        $constraint: QueryStatement
    ) {
        auditingRollbackSideEffect(payload: $payload, constraint: $constraint)
    }
`;
