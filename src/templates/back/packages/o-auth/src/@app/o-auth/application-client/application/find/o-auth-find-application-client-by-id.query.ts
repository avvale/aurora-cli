import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthFindApplicationClientByIdQuery {
    constructor(
        public readonly applicationId: string,
        public readonly clientId: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
