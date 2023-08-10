import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthUpdateClientsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
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
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
