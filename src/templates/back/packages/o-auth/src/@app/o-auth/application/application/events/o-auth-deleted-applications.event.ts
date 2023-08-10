import { OAuthDeletedApplicationEvent } from './o-auth-deleted-application.event';

export class OAuthDeletedApplicationsEvent
{
    constructor(
        public readonly applications: OAuthDeletedApplicationEvent[],
    ) {}
}
