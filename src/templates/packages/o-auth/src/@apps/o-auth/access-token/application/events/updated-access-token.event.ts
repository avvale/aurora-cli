export class UpdatedAccessTokenEvent
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
    ) {}
}