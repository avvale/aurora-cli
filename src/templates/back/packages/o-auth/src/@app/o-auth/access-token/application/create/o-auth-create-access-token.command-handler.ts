/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthCreateAccessTokenCommand } from './o-auth-create-access-token.command';
import { OAuthCreateAccessTokenService } from './o-auth-create-access-token.service';
import {
    OAuthAccessTokenId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenAccountId,
    OAuthAccessTokenToken,
    OAuthAccessTokenName,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenUpdatedAt,
    OAuthAccessTokenDeletedAt,
    OAuthAccessTokenScopes,
    OAuthAccessTokenExpiredAccessToken,
} from '../../domain/value-objects';

@CommandHandler(OAuthCreateAccessTokenCommand)
export class OAuthCreateAccessTokenCommandHandler implements ICommandHandler<OAuthCreateAccessTokenCommand>
{
    constructor(
        private readonly createAccessTokenService: OAuthCreateAccessTokenService,
    ) {}

    async execute(command: OAuthCreateAccessTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccessTokenService.main(
            {
                id: new OAuthAccessTokenId(command.payload.id),
                clientId: new OAuthAccessTokenClientId(command.payload.clientId),
                scopes: new OAuthAccessTokenScopes(command.payload.scopes),
                accountId: new OAuthAccessTokenAccountId(command.payload.accountId),
                name: new OAuthAccessTokenName(command.payload.name),
                expiredAccessToken: new OAuthAccessTokenExpiredAccessToken(command.payload.expiredAccessToken),
            },
            command.cQMetadata,
        );
    }
}
