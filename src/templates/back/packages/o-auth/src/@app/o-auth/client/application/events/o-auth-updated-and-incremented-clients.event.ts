import { OAuthUpdatedAndIncrementedClientEvent } from './o-auth-updated-and-incremented-client.event';

export class OAuthUpdatedAndIncrementedClientsEvent
{
    constructor(
        public readonly clients: OAuthUpdatedAndIncrementedClientEvent[],
    ) {}
}
