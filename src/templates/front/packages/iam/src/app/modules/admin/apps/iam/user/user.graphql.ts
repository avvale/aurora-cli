import gql from 'graphql-tag';

export const fields = `
    accountId
    name
    surname
    avatar
    mobile
    langId
    password
    isTwoFactorAuthenticationEnabled
    twoFactorAuthenticationSecret
    rememberToken
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query IamPaginateUsers (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateUsers (
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
    query IamGetUsers (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetUsers (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query IamFindUserById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: iamFindUserById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query IamFindUser (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindUser (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateUser (
        $payload: IamCreateUserInput!
    ) {
        iamCreateUser (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation IamCreateUsers (
        $payload: [IamCreateUserInput]!
    ) {
        iamCreateUsers (
            payload: $payload
        )
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateUserById (
        $payload: IamUpdateUserByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateUserById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateUsers (
        $payload: IamUpdateUsersInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateUsers (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteUserById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteUserById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteUsers (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteUsers (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
