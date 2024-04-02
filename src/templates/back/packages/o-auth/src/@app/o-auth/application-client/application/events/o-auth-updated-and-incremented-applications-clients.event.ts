import { OAuthUpdatedAndIncrementedApplicationClientEvent } from './o-auth-updated-and-incremented-application-client.event';

export class OAuthUpdatedAndIncrementedApplicationsClientsEvent
{
    constructor(
        public readonly applicationsClients: OAuthUpdatedAndIncrementedApplicationClientEvent[],
    ) {}
}
