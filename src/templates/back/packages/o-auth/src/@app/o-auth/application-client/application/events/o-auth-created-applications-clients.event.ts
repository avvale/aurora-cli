import { OAuthCreatedApplicationClientEvent } from './o-auth-created-application-client.event';

export class OAuthCreatedApplicationsClientsEvent
{
    constructor(
        public readonly applicationsClients: OAuthCreatedApplicationClientEvent[],
    ) {}
}
