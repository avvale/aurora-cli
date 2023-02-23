import { CQMetadata } from '@aurora-ts/core';

export class CreateRefreshTokenCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accessTokenId: string;
            expiredRefreshToken: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}