/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccessTokensCommand } from './create-access-tokens.command';
import { CreateAccessTokensService } from './create-access-tokens.service';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateAccessTokensCommand)
export class CreateAccessTokensCommandHandler implements ICommandHandler<CreateAccessTokensCommand>
{
    constructor(
        private readonly createAccessTokensService: CreateAccessTokensService,
    ) {}

    async execute(command: CreateAccessTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccessTokensService.main(
            command.payload
                .map(accessToken =>
                {
                    return {
                        id: new AccessTokenId(accessToken.id),
                        clientId: new AccessTokenClientId(accessToken.clientId),
                        accountId: new AccessTokenAccountId(accessToken.accountId),
                        token: new AccessTokenToken(accessToken.token),
                        name: new AccessTokenName(accessToken.name),
                        isRevoked: new AccessTokenIsRevoked(accessToken.isRevoked),
                        expiresAt: new AccessTokenExpiresAt(accessToken.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
                    };
                }),
            command.cQMetadata,
        );
    }
}