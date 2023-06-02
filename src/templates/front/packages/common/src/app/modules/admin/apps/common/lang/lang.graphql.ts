import gql from 'graphql-tag';

export const fields = `
    name
    image
    iso6392
    iso6393
    ietf
    customCode
    dir
    sort
    isActive
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query CommonPaginateLangs (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: commonPaginateLangs (
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
    query CommonGetLangs (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: commonGetLangs (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query CommonFindLangById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: commonFindLangById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query CommonFindLang (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: commonFindLang (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation CommonCreateLang (
        $payload: CommonCreateLangInput!
    ) {
        commonCreateLang (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation CommonUpdateLangById (
        $payload: CommonUpdateLangByIdInput!
        $constraint: QueryStatement
    ) {
        commonUpdateLangById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation CommonUpdateLangs (
        $payload: CommonUpdateLangsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonUpdateLangs (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation CommonDeleteLangById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        commonDeleteLangById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation CommonDeleteLangs (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonDeleteLangs (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
