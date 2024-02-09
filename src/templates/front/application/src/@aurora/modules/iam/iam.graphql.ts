import gql from 'graphql-tag';

export const iamMeAccount =  gql`
    query iamMeAccount
    {
        iamMeAccount
        {
            id
            clientId
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
                langId
                meta
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;
