import { OAuthUpdatedApplicationClientEvent } from './o-auth-updated-application-client.event';

export class OAuthUpdatedApplicationsClientsEvent
{
    constructor(
        public readonly applicationsClients: OAuthUpdatedApplicationClientEvent[],
    ) {}
}
