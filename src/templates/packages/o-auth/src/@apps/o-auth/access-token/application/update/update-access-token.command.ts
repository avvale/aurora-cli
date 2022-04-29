import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateAccessTokenCommand
{
    constructor(
        public readonly payload: {
            id: string;
            clientId?: string;
            accountId?: string;
            token?: string;
            name?: string;
            isRevoked?: boolean;
            expiresAt?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}