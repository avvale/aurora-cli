export class OAuthUpdatedAndIncrementedApplicationClientEvent
{
    constructor(
        public readonly applicationId: string,
        public readonly clientId: string,
    ) {}
}
