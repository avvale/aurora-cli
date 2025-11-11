import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreateClientCommand {
    constructor(
        public readonly payload: {
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
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
