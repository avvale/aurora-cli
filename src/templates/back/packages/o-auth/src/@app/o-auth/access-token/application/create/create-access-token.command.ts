import { CQMetadata } from '@aurora-ts/core';

export class CreateAccessTokenCommand
{
    constructor(
        public readonly payload: {
            id: string;
            clientId: string;
            scopes?: string[];
            accountId?: string;
            name?: string;
            expiredAccessToken: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}