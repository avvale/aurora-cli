import { OAuthUpdatedClientEvent } from './o-auth-updated-client.event';

export class OAuthUpdatedClientsEvent
{
    constructor(
        public readonly clients: OAuthUpdatedClientEvent[],
    ) {}
}
