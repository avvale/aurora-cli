import gql from 'graphql-tag';

export const oAuthCreateCredentials =  gql`
    mutation oAuthCreateCredentials ($payload:OAuthCreateCredentialsInput!)
    {
        oAuthCreateCredentials (payload: $payload)
        {
            accessToken
            refreshToken
        }
    }
`;

export const oAuthCreateImpersonalizeCredentials =  gql`
    mutation oAuthCreateImpersonalizeCredentials ($accountId:ID!)
    {
        oAuthCreateImpersonalizeCredentials (accountId: $accountId)
        {
            accessToken
            refreshToken
        }
    }
`;
