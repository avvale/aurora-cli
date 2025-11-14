import gql from 'graphql-tag';

export const fields = `
    rowId
    prefix
    name
    waitingJobs
    activeJobs
    completedJobs
    failedJobs
    delayedJobs
    pausedJobs
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query QueueManagerPaginateQueues(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: queueManagerPaginateQueues(
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
    query QueueManagerGetQueues(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: queueManagerGetQueues(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query QueueManagerFindQueueById($id: ID, $constraint: QueryStatement) {
        object: queueManagerFindQueueById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query QueueManagerFindQueueById(
        $id: ID
        $constraint: QueryStatement
        $queryPaginateJobs: QueryStatement
        $constraintPaginateJobs: QueryStatement
    ) {
        object: queueManagerFindQueueById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
        queueManagerPaginateJobs(
            query: $queryPaginateJobs
            constraint: $constraintPaginateJobs
        ) {
            total
            rows
            count
        }
    }
`;

export const findQuery = gql`
    query QueueManagerFindQueue(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: queueManagerFindQueue(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation QueueManagerCreateQueue (
        $payload: QueueManagerCreateQueueInput!
    ) {
        queueManagerCreateQueue (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation QueueManagerUpdateQueueById (
        $payload: QueueManagerUpdateQueueByIdInput!
        $constraint: QueryStatement
    ) {
        queueManagerUpdateQueueById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation QueueManagerUpdateQueues (
        $payload: QueueManagerUpdateQueuesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        queueManagerUpdateQueues (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation QueueManagerDeleteQueueById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        queueManagerDeleteQueueById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation QueueManagerDeleteQueues (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        queueManagerDeleteQueues (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
