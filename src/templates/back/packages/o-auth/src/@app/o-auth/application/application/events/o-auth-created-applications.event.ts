import { OAuthCreatedApplicationEvent } from './o-auth-created-application.event';

export class OAuthCreatedApplicationsEvent
{
    constructor(
        public readonly applications: OAuthCreatedApplicationEvent[],
    ) {}
}
