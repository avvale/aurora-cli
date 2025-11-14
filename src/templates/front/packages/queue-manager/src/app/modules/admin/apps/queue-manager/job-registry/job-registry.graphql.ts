import gql from 'graphql-tag';

export const fields = `
    rowId
    queueName
    state
    jobId
    jobName
    tags
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query QueueManagerPaginateJobsRegistry(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: queueManagerPaginateJobsRegistry(
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
    query QueueManagerGetJobsRegistry(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: queueManagerGetJobsRegistry(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query QueueManagerFindJobRegistryById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: queueManagerFindJobRegistryById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query QueueManagerFindJobRegistry(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: queueManagerFindJobRegistry(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation QueueManagerCreateJobRegistry (
        $payload: QueueManagerCreateJobRegistryInput!
    ) {
        queueManagerCreateJobRegistry (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation QueueManagerCreateJobsRegistry(
        $payload: [QueueManagerCreateJobRegistryInput]!
    ) {
        queueManagerCreateJobsRegistry(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation QueueManagerUpdateJobRegistryById (
        $payload: QueueManagerUpdateJobRegistryByIdInput!
        $constraint: QueryStatement
    ) {
        queueManagerUpdateJobRegistryById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation QueueManagerUpdateJobsRegistry (
        $payload: QueueManagerUpdateJobsRegistryInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        queueManagerUpdateJobsRegistry (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation QueueManagerDeleteJobRegistryById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        queueManagerDeleteJobRegistryById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation QueueManagerDeleteJobsRegistry (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        queueManagerDeleteJobsRegistry (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
