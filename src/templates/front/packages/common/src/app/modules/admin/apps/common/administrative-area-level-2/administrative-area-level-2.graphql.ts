/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
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
  query CommonPaginateAdministrativeAreasLevel2(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    pagination: commonPaginateAdministrativeAreasLevel2(
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
  query CommonGetAdministrativeAreasLevel2(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    objects: commonGetAdministrativeAreasLevel2(
      query: $query
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const findByIdQuery = gql`
  query CommonFindAdministrativeAreaLevel2ById(
    $id: ID
    $constraint: QueryStatement
  ) {
    object: commonFindAdministrativeAreaLevel2ById(
      id: $id
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const findQuery = gql`
  query CommonFindAdministrativeAreaLevel2(
    $query: QueryStatement
    $constraint: QueryStatement
  ) {
    object: commonFindAdministrativeAreaLevel2(
      query: $query
      constraint: $constraint
    ) {
      id
      #FIELDS
    }
  }
`;

export const createMutation = gql`
    mutation CommonCreateAdministrativeAreaLevel2 (
        $payload: CommonCreateAdministrativeAreaLevel2Input!
    ) {
        commonCreateAdministrativeAreaLevel2 (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
  mutation CommonCreateAdministrativeAreasLevel2(
    $payload: [CommonCreateAdministrativeAreaLevel2Input]!
  ) {
    commonCreateAdministrativeAreasLevel2(payload: $payload)
  }
`;

export const updateByIdMutation = gql`
    mutation CommonUpdateAdministrativeAreaLevel2ById (
        $payload: CommonUpdateAdministrativeAreaLevel2ByIdInput!
        $constraint: QueryStatement
    ) {
        commonUpdateAdministrativeAreaLevel2ById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation CommonUpdateAdministrativeAreasLevel2 (
        $payload: CommonUpdateAdministrativeAreasLevel2Input!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonUpdateAdministrativeAreasLevel2 (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation CommonDeleteAdministrativeAreaLevel2ById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        commonDeleteAdministrativeAreaLevel2ById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation CommonDeleteAdministrativeAreasLevel2 (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonDeleteAdministrativeAreasLevel2 (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
