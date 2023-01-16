import gql from 'graphql-tag';

export const iamMeAccount =  gql`
    query iamMeAccount
    {
        iamMeAccount
        {
            id
            email
            isActive
            scopes
            dApplicationCodes
            dPermissions
            dTenants
            meta
            roles {
                id
                name
            }
            tenants {
                id
                name
            }
            user {
                id
                name
                meta
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;
