import gql from 'graphql-tag';

export const iamMeAccount =  gql`
    query iamMeAccount
    {
        iamMeAccount
        {
            id
            email
            isActive
            dApplicationCodes
            dPermissions
            dTenants
            dScopes
            data
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
                data
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;
