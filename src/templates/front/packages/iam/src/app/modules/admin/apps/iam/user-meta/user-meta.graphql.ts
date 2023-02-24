import gql from 'graphql-tag';

export const findUserMetaById = gql`
    query OrionFindUserMetaById ($id: ID!) {
        iamFindUserMetaById (id:$id) {
            id
            meta
        }
    }
`;

export const updateUserMetaByIdMutation = gql`
    mutation IamUpdateUserMetaById ($payload:IamUpdateUserMetaByIdInput!) {
        iamUpdateUserMetaById (payload:$payload) {
            id
            meta
        }
    }
`;