/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
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
  query CommonPaginateAdministrativeAreasLevel1(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    pagination: commonPaginateAdministrativeAreasLevel1(
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
  query CommonGetAdministrativeAreasLevel1(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    objects: commonGetAdministrativeAreasLevel1(
      query: $query
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const findByIdQuery = gql`
  query CommonFindAdministrativeAreaLevel1ById(
    $id: ID
    $constraint: QueryStatement
  ) {
    object: commonFindAdministrativeAreaLevel1ById(
      id: $id
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const findQuery = gql`
  query CommonFindAdministrativeAreaLevel1(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    object: commonFindAdministrativeAreaLevel1(
      query: $query
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const createMutation = gql`
    mutation CommonCreateAdministrativeAreaLevel1 (
        $payload: CommonCreateAdministrativeAreaLevel1Input!
    ) {
        commonCreateAdministrativeAreaLevel1 (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
  mutation CommonCreateAdministrativeAreasLevel1(
    $payload: [CommonCreateAdministrativeAreaLevel1Input]!
  ) {
    commonCreateAdministrativeAreasLevel1(payload: $payload)
  }
`;

export const updateByIdMutation = gql`
    mutation CommonUpdateAdministrativeAreaLevel1ById (
        $payload: CommonUpdateAdministrativeAreaLevel1ByIdInput!
        $constraint: QueryStatement
    ) {
        commonUpdateAdministrativeAreaLevel1ById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation CommonUpdateAdministrativeAreasLevel1 (
        $payload: CommonUpdateAdministrativeAreasLevel1Input!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonUpdateAdministrativeAreasLevel1 (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation CommonDeleteAdministrativeAreaLevel1ById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        commonDeleteAdministrativeAreaLevel1ById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation CommonDeleteAdministrativeAreasLevel1 (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonDeleteAdministrativeAreasLevel1 (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
