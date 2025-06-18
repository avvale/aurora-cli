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

export const iamForgotPasswordUserMutation = gql`
    mutation IamForgotPasswordUser (
        $payload: IamForgotPasswordUserInput!
    ) {
        iamForgotPasswordUser (
            payload: $payload
        )
    }
`;

export const iamResetPasswordUserMutation = gql`
    mutation IamResetPasswordUser (
        $payload: IamResetPasswordUserInput!
    ) {
        iamResetPasswordUser (
            payload: $payload
        )
    }
`;
