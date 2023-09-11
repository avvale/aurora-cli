export class OAuthDeletedApplicationClientEvent
{
    constructor(
        public readonly applicationId: string,
        public readonly clientId: string,
    ) {}
}
