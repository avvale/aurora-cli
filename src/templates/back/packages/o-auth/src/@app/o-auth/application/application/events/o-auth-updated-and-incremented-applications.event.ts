import { OAuthUpdatedAndIncrementedApplicationEvent } from './o-auth-updated-and-incremented-application.event';

export class OAuthUpdatedAndIncrementedApplicationsEvent
{
    constructor(
        public readonly applications: OAuthUpdatedAndIncrementedApplicationEvent[],
    ) {}
}
