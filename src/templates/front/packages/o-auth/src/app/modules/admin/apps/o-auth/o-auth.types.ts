/***************
 * accessToken *
 ***************/
export interface OAuthAccessToken {
    id: string;
    clientId: string;
    accountId?: string;
    token: string;
    name?: string;
    isRevoked: boolean;
    expiresAt?: string;
    refreshToken?;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface OAuthCreateAccessToken {
    id: string;
    clientId: string;
    accountId?: string;
    token: string;
    name?: string;
    isRevoked: boolean;
    expiresAt?: string;
    refreshToken?;
}

export interface OAuthUpdateAccessTokenById {
    id: string;
    clientId?: string;
    accountId?: string;
    token?: string;
    name?: string;
    isRevoked?: boolean;
    expiresAt?: string;
    refreshToken?;
}

export interface OAuthUpdateAccessTokens {
    id?: string;
    clientId?: string;
    accountId?: string;
    token?: string;
    name?: string;
    isRevoked?: boolean;
    expiresAt?: string;
    refreshToken?;
}

/***************
 * application *
 ***************/
export interface OAuthApplication {
    id: string;
    code: string;
    name: string;
    secret: string;
    isMaster: boolean;
    clientIds?: string[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface OAuthCreateApplication {
    id: string;
    code: string;
    name: string;
    secret: string;
    isMaster: boolean;
    clientIds?: string[];
}

export interface OAuthUpdateApplicationById {
    id: string;
    code?: string;
    name?: string;
    secret?: string;
    isMaster?: boolean;
    clientIds?: string[];
}

export interface OAuthUpdateApplications {
    id?: string;
    code?: string;
    name?: string;
    secret?: string;
    isMaster?: boolean;
    clientIds?: string[];
}

/***************
 * client *
 ***************/
export interface OAuthClient {
    id: string;
    grantType: string;
    name: string;
    secret: string;
    authUrl?: string;
    redirect?: string;
    scopeOptions?: any;
    expiredAccessToken?: number;
    expiredRefreshToken?: number;
    isActive: boolean;
    isMaster: boolean;
    applicationIds?: string[];
    accessTokens?;
    applications?: OAuthApplication[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface OAuthCreateClient {
    id: string;
    grantType: string;
    name: string;
    secret: string;
    authUrl?: string;
    redirect?: string;
    scopes?: any;
    expiredAccessToken?: number;
    expiredRefreshToken?: number;
    isActive: boolean;
    isMaster: boolean;
    applicationIds?: string[];
    accessTokens?;
}

export interface OAuthUpdateClientById {
    id: string;
    grantType?: string;
    name?: string;
    secret?: string;
    authUrl?: string;
    redirect?: string;
    scopes?: any;
    expiredAccessToken?: number;
    expiredRefreshToken?: number;
    isActive?: boolean;
    isMaster?: boolean;
    applicationIds?: string[];
    accessTokens?;
}

export interface OAuthUpdateClients {
    id?: string;
    grantType?: string;
    name?: string;
    secret?: string;
    authUrl?: string;
    redirect?: string;
    scopes?: any;
    expiredAccessToken?: number;
    expiredRefreshToken?: number;
    isActive?: boolean;
    isMaster?: boolean;
    applicationIds?: string[];
    accessTokens?;
}

export enum OAuthClientGrantType {
    AUTHORIZATION_CODE = 'AUTHORIZATION_CODE',
    CLIENT_CREDENTIALS = 'CLIENT_CREDENTIALS',
    PASSWORD = 'PASSWORD',
    REFRESH_TOKEN = 'REFRESH_TOKEN'
}

/****************
 * refreshToken *
 ****************/
export interface OAuthRefreshToken {
    id: string;
    accessTokenId: string;
    token: string;
    isRevoked: boolean;
    expiresAt?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface OAuthCreateRefreshToken {
    id: string;
    accessTokenId: string;
    token: string;
    isRevoked: boolean;
    expiresAt?: string;
}

export interface OAuthUpdateRefreshTokenById {
    id: string;
    accessTokenId?: string;
    token?: string;
    isRevoked?: boolean;
    expiresAt?: string;
}

export interface OAuthUpdateRefreshTokens {
    id?: string;
    accessTokenId?: string;
    token?: string;
    isRevoked?: boolean;
    expiresAt?: string;
}

/*********
 * scope *
 *********/
export interface OAuthScope {
    id: string;
    code: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface OAuthCreateScope {
    id: string;
    code: string;
    name: string;
}

export interface OAuthUpdateScopeById {
    id: string;
    code?: string;
    name?: string;
}

export interface OAuthUpdateScopes {
    id?: string;
    code?: string;
    name?: string;
}
