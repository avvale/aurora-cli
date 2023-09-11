/* eslint-disable key-spacing */
import { OAuthCreateRefreshTokenCommand } from '@app/o-auth/refresh-token';
import { OAuthCreateRefreshTokenService } from '@app/o-auth/refresh-token/application/create/o-auth-create-refresh-token.service';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenExpiredRefreshToken,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenToken,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthCreateRefreshTokenCommand)
export class OAuthCreateRefreshTokenCommandHandler implements ICommandHandler<OAuthCreateRefreshTokenCommand>
{
    constructor(
        private readonly createRefreshTokenService: OAuthCreateRefreshTokenService,
    ) {}

    async execute(command: OAuthCreateRefreshTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRefreshTokenService.main(
            {
                id: new OAuthRefreshTokenId(command.payload.id),
                accessTokenId: new OAuthRefreshTokenAccessTokenId(command.payload.accessTokenId),
                expiredRefreshToken: new OAuthRefreshTokenExpiredRefreshToken(command.payload.expiredRefreshToken),
            },
            command.cQMetadata,
        );
    }
}
