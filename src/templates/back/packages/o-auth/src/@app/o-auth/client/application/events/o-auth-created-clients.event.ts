import { OAuthCreatedClientEvent } from './o-auth-created-client.event';

export class OAuthCreatedClientsEvent
{
    constructor(
        public readonly clients: OAuthCreatedClientEvent[],
    ) {}
}
