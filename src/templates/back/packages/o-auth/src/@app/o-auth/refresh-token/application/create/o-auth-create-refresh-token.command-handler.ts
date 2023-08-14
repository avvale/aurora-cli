/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthCreateRefreshTokenCommand } from './o-auth-create-refresh-token.command';
import { OAuthCreateRefreshTokenService } from './o-auth-create-refresh-token.service';
import {
    OAuthRefreshTokenId,
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenExpiredRefreshToken,
} from '../../domain/value-objects';

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
