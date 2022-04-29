export class AccessTokenResponse
{
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly accountId: string,
        public readonly token: string,
        public readonly name: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly refreshToken: RefreshTokenResponse,
        public readonly client: ClientResponse,
    ) {}
}

export class ApplicationResponse
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly code: string,
        public readonly secret: string,
        public readonly isMaster: boolean,
        public readonly clientIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly clients: ClientResponse[],
    ) {}
}

export class ClientResponse
{
    constructor(
        public readonly id: string,
        public readonly grantType: string,
        public readonly name: string,
        public readonly secret: string,
        public readonly authUrl: string,
        public readonly redirect: string,
        public readonly expiredAccessToken: number,
        public readonly expiredRefreshToken: number,
        public readonly isActive: boolean,
        public readonly isMaster: boolean,
        public readonly applicationIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly accessTokens: AccessTokenResponse[],
        public readonly applications: ApplicationResponse[],
    ) {}
}

export class RefreshTokenResponse
{
    constructor(
        public readonly id: string,
        public readonly accessTokenId: string,
        public readonly token: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly accessToken: AccessTokenResponse,
    ) {}
}