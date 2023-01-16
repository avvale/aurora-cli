export enum OAuthClientGrantType
{
    AUTHORIZATION_CODE = 'AUTHORIZATION_CODE',
    CLIENT_CREDENTIALS = 'CLIENT_CREDENTIALS',
    PASSWORD = 'PASSWORD',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export interface OAuthCreateCredentialInput
{
    grantType: OAuthClientGrantType;
    username?: string;
    password?: string;
}