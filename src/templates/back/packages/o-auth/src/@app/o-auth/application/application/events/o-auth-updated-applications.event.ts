import { OAuthUpdatedApplicationEvent } from './o-auth-updated-application.event';

export class OAuthUpdatedApplicationsEvent
{
    constructor(
        public readonly applications: OAuthUpdatedApplicationEvent[],
    ) {}
}
