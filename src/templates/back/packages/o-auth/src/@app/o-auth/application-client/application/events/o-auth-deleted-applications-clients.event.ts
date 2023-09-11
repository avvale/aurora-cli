import { OAuthDeletedApplicationClientEvent } from './o-auth-deleted-application-client.event';

export class OAuthDeletedApplicationsClientsEvent
{
    constructor(
        public readonly applicationsClients: OAuthDeletedApplicationClientEvent[],
    ) {}
}
