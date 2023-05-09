import gql from 'graphql-tag';

export const fields = `
    id
    name
    data
    opts
    progress
    delay
    timestamp
    attemptsMade
    failedReason
    stacktrace
    returnvalue
    finishedOn
    processedOn
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query QueueManagerPaginateJobs (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: queueManagerPaginateJobs (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const findByIdQuery = gql`
    query QueueManagerFindJobById (
        $id: GraphQLString!
        $name: GraphQLString!
    ) {
        object: queueManagerFindJobById (
            id: $id
            name: $name
        ) {
            id
            #FIELDS
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation QueueManagerDeleteJobById (
        $id: GraphQLString!
        $name: GraphQLString!
    ) {
        queueManagerDeleteJobById (
            id: $id
            name: $name
        ) {
            ${fields}
        }
    }
`;