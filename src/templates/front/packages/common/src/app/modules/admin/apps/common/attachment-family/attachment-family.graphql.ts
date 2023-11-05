import gql from 'graphql-tag';

export const fields = `
    resourceId
    code
    name
    width
    height
    fitType
    quality
    sizes
    format
    createdAt
    updatedAt
`;

export const relationsFields = `
    commonGetResources (
        query: $queryResources
        constraint: $constraintResources
    ) {
        id
        code
        name
        isActive
        hasAttachments
    }
`;

// default methods
export const paginationQuery = gql`
    query CommonPaginateAttachmentFamilies (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: commonPaginateAttachmentFamilies (
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
    query CommonGetAttachmentFamilies (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: commonGetAttachmentFamilies (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query CommonGetAttachmentFamiliesRelations(
        $queryResources: QueryStatement
        $constraintResources: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query CommonFindAttachmentFamilyById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: commonFindAttachmentFamilyById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query CommonFindAttachmentFamilyByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryResources: QueryStatement
        $constraintResources: QueryStatement
    ) {
        object: commonFindAttachmentFamilyById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query CommonFindAttachmentFamily (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: commonFindAttachmentFamily (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation CommonCreateAttachmentFamily (
        $payload: CommonCreateAttachmentFamilyInput!
    ) {
        commonCreateAttachmentFamily (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation CommonUpdateAttachmentFamilyById (
        $payload: CommonUpdateAttachmentFamilyByIdInput!
        $constraint: QueryStatement
    ) {
        commonUpdateAttachmentFamilyById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation CommonUpdateAttachmentFamilies (
        $payload: CommonUpdateAttachmentFamiliesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonUpdateAttachmentFamilies (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation CommonDeleteAttachmentFamilyById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        commonDeleteAttachmentFamilyById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation CommonDeleteAttachmentFamilies (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonDeleteAttachmentFamilies (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
