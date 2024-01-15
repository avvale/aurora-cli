import gql from 'graphql-tag';

export const fields = `
    iso3166Alpha2
    iso3166Alpha3
    iso3166Numeric
    customCode
    prefix
    image
    sort
    administrativeAreas
    latitude
    longitude
    zoom
    mapType
    availableLangs
    createdAt
    updatedAt
    langId
    name
    slug
    administrativeAreaLevel1
    administrativeAreaLevel2
    administrativeAreaLevel3
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query CommonPaginateCountries (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: commonPaginateCountries (
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
    query CommonGetCountries (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: commonGetCountries (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query CommonFindCountryById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: commonFindCountryById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query CommonFindCountry (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: commonFindCountry (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation CommonCreateCountry (
        $payload: CommonCreateCountryInput!
    ) {
        commonCreateCountry (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation CommonUpdateCountryById (
        $payload: CommonUpdateCountryByIdInput!
        $constraint: QueryStatement
    ) {
        commonUpdateCountryById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation CommonUpdateCountries (
        $payload: CommonUpdateCountriesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonUpdateCountries (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation CommonDeleteCountryById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        commonDeleteCountryById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation CommonDeleteCountries (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonDeleteCountries (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Queries additionalApis
export const administrativeAreasCountryQuery = gql`
    query CommonAdministrativeAreasCountry (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonAdministrativeAreasCountry (
            query: $query
            constraint: $constraint
        ){
            ${fields}
        }
    }
`;
