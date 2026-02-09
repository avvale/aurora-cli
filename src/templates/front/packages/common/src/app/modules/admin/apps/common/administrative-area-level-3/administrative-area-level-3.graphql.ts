/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    countryId
    country {
        id
        rowId
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
        id
        rowId
        name
        slug
        administrativeAreaLevel1
        administrativeAreaLevel2
        administrativeAreaLevel3
    }
    administrativeAreaLevel1Id
    administrativeAreaLevel1 {
        id
        rowId
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
    administrativeAreaLevel2Id
    administrativeAreaLevel2 {
        id
        rowId
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
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
  query CommonPaginateAdministrativeAreasLevel3(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    pagination: commonPaginateAdministrativeAreasLevel3(
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
  query CommonGetAdministrativeAreasLevel3(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    objects: commonGetAdministrativeAreasLevel3(
      query: $query
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const findByIdQuery = gql`
  query CommonFindAdministrativeAreaLevel3ById(
    $id: ID
    $constraint: QueryStatement
  ) {
    object: commonFindAdministrativeAreaLevel3ById(
      id: $id
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const findQuery = gql`
  query CommonFindAdministrativeAreaLevel3(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    object: commonFindAdministrativeAreaLevel3(
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

export const insertMutation = gql`
  mutation CommonCreateAdministrativeAreasLevel3(
    $payload: [CommonCreateAdministrativeAreaLevel3Input]!
  ) {
    commonCreateAdministrativeAreasLevel3(payload: $payload)
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
