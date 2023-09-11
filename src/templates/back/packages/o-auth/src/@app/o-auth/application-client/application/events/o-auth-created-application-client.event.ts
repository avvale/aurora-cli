export class OAuthCreatedApplicationClientEvent
{
    constructor(
        public readonly applicationId: string,
        public readonly clientId: string,
    ) {}
}
