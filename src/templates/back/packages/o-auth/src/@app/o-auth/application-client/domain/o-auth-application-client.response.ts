import { OAuthApplicationResponse } from '@app/o-auth/application';
import { OAuthClientResponse } from '@app/o-auth/client';

export class OAuthApplicationClientResponse
{
    constructor(
        public readonly applicationId: string,
        public readonly clientId: string,
        public readonly application: OAuthApplicationResponse,
        public readonly client: OAuthClientResponse,
    ) {}
}
