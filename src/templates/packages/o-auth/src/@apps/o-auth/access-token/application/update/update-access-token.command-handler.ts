/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccessTokenCommand } from './update-access-token.command';
import { UpdateAccessTokenService } from './update-access-token.service';
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

@CommandHandler(UpdateAccessTokenCommand)
export class UpdateAccessTokenCommandHandler implements ICommandHandler<UpdateAccessTokenCommand>
{
    constructor(
        private readonly updateAccessTokenService: UpdateAccessTokenService,
    ) {}

    async execute(command: UpdateAccessTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccessTokenService.main(
            {
                id: new AccessTokenId(command.payload.id),
                clientId: new AccessTokenClientId(command.payload.clientId, { undefinable: true }),
                accountId: new AccessTokenAccountId(command.payload.accountId),
                token: new AccessTokenToken(command.payload.token, { undefinable: true }),
                name: new AccessTokenName(command.payload.name),
                isRevoked: new AccessTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new AccessTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}