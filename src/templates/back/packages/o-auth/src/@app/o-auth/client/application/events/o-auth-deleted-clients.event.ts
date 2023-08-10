import { OAuthDeletedClientEvent } from './o-auth-deleted-client.event';

export class OAuthDeletedClientsEvent
{
    constructor(
        public readonly clients: OAuthDeletedClientEvent[],
    ) {}
}
