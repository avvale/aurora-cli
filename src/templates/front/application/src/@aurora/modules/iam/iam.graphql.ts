import gql from 'graphql-tag';

export const iamMeAccount = gql`
    query iamMeAccount {
        iamMeAccount {
            id
            clientId
            email
            username
            isActive
            scopes
            dApplicationCodes
            dPermissions
            dTenants
            meta
            roles {
                id
                name
                defaultRedirection
            }
            tenants {
                id
                name
            }
            user {
                id
                name
                surname
                langId
                meta
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
`;
