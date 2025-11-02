/* eslint-disable key-spacing */
import { OAuthUpdateAndIncrementRefreshTokensCommand } from '@app/o-auth/refresh-token';
import { OAuthUpdateAndIncrementRefreshTokensService } from '@app/o-auth/refresh-token/application/update/o-auth-update-and-increment-refresh-tokens.service';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenToken,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateAndIncrementRefreshTokensCommand)
export class OAuthUpdateAndIncrementRefreshTokensCommandHandler implements ICommandHandler<OAuthUpdateAndIncrementRefreshTokensCommand>
{
    constructor(
        private readonly updateRefreshTokensService: OAuthUpdateAndIncrementRefreshTokensService,
    ) {}

    async execute(command: OAuthUpdateAndIncrementRefreshTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRefreshTokensService.main(
            {
                id: new OAuthRefreshTokenId(command.payload.id, { undefinable: true }),
                accessTokenId: new OAuthRefreshTokenAccessTokenId(command.payload.accessTokenId, { undefinable: true }),
                token: new OAuthRefreshTokenToken(command.payload.token, { undefinable: true }),
                isRevoked: new OAuthRefreshTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new OAuthRefreshTokenExpiresAt(command.payload.expiresAt, {}, { applyTimezone: command.cQMetadata?.timezone }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
