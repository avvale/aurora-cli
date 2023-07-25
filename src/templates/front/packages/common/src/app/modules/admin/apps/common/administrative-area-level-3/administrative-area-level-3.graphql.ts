import gql from 'graphql-tag';

export const fields = `
    countryId
    administrativeAreaLevel1Id
    administrativeAreaLevel2Id
    code
    customCode
    name
    slug
    latitude
    longitude
    zoom
    mapType
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query CommonPaginateAdministrativeAreasLevel3 (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: commonPaginateAdministrativeAreasLevel3 (
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
    query CommonGetAdministrativeAreasLevel3 (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: commonGetAdministrativeAreasLevel3 (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query CommonFindAdministrativeAreaLevel3ById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: commonFindAdministrativeAreaLevel3ById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query CommonFindAdministrativeAreaLevel3 (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: commonFindAdministrativeAreaLevel3 (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation CommonCreateAdministrativeAreaLevel3 (
        $payload: CommonCreateAdministrativeAreaLevel3Input!
    ) {
        commonCreateAdministrativeAreaLevel3 (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation CommonUpdateAdministrativeAreaLevel3ById (
        $payload: CommonUpdateAdministrativeAreaLevel3ByIdInput!
        $constraint: QueryStatement
    ) {
        commonUpdateAdministrativeAreaLevel3ById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation CommonUpdateAdministrativeAreasLevel3 (
        $payload: CommonUpdateAdministrativeAreasLevel3Input!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonUpdateAdministrativeAreasLevel3 (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation CommonDeleteAdministrativeAreaLevel3ById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        commonDeleteAdministrativeAreaLevel3ById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation CommonDeleteAdministrativeAreasLevel3 (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonDeleteAdministrativeAreasLevel3 (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
