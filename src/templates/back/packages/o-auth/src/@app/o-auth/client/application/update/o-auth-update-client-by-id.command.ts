import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateClientByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            grantType?: string;
            name?: string;
            secret?: string;
            authUrl?: string;
            redirect?: string;
            scopeOptions?: any;
            expiredAccessToken?: number;
            expiredRefreshToken?: number;
            isActive?: boolean;
            isMaster?: boolean;
            applicationIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
