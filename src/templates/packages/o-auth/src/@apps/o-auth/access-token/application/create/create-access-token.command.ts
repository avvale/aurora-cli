import { CQMetadata } from 'aurora-ts-core';

export class CreateAccessTokenCommand
{
    constructor(
        public readonly payload: {
            id: string;
            clientId: string;
            accountId?: string;
            token: string;
            name?: string;
            isRevoked: boolean;
            expiresAt?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}