/* eslint-disable key-spacing */
import { OAuthUpdateAndIncrementAccessTokensCommand } from '@app/o-auth/access-token';
import { OAuthUpdateAndIncrementAccessTokensService } from '@app/o-auth/access-token/application/update/o-auth-update-and-increment-access-tokens.service';
import {
    OAuthAccessTokenAccountId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenId,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenName,
    OAuthAccessTokenToken,
} from '@app/o-auth/access-token/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateAndIncrementAccessTokensCommand)
export class OAuthUpdateAndIncrementAccessTokensCommandHandler implements ICommandHandler<OAuthUpdateAndIncrementAccessTokensCommand>
{
    constructor(
        private readonly updateAccessTokensService: OAuthUpdateAndIncrementAccessTokensService,
    ) {}

    async execute(command: OAuthUpdateAndIncrementAccessTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccessTokensService.main(
            {
                id: new OAuthAccessTokenId(command.payload.id, { undefinable: true }),
                clientId: new OAuthAccessTokenClientId(command.payload.clientId, { undefinable: true }),
                accountId: new OAuthAccessTokenAccountId(command.payload.accountId),
                token: new OAuthAccessTokenToken(command.payload.token, { undefinable: true }),
                name: new OAuthAccessTokenName(command.payload.name),
                isRevoked: new OAuthAccessTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new OAuthAccessTokenExpiresAt(command.payload.expiresAt, {}, { applyTimezone: command.cQMetadata?.timezone }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
