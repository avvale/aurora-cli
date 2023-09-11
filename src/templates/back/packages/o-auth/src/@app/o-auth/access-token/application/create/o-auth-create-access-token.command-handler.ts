/* eslint-disable key-spacing */
import { OAuthCreateAccessTokenCommand } from '@app/o-auth/access-token';
import { OAuthCreateAccessTokenService } from '@app/o-auth/access-token/application/create/o-auth-create-access-token.service';
import {
    OAuthAccessTokenAccountId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenExpiredAccessToken,
    OAuthAccessTokenId,
    OAuthAccessTokenName,
    OAuthAccessTokenScopes,
} from '@app/o-auth/access-token/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
