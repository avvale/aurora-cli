export class OAuthUpdatedApplicationClientEvent
{
    constructor(
        public readonly applicationId: string,
        public readonly clientId: string,
    ) {}
}
