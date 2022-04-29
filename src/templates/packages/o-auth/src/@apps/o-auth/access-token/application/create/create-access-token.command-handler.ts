/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccessTokenCommand } from './create-access-token.command';
import { CreateAccessTokenService } from './create-access-token.service';
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

@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenCommandHandler implements ICommandHandler<CreateAccessTokenCommand>
{
    constructor(
        private readonly createAccessTokenService: CreateAccessTokenService,
    ) {}

    async execute(command: CreateAccessTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccessTokenService.main(
            {
                id: new AccessTokenId(command.payload.id),
                clientId: new AccessTokenClientId(command.payload.clientId),
                accountId: new AccessTokenAccountId(command.payload.accountId),
                token: new AccessTokenToken(command.payload.token),
                name: new AccessTokenName(command.payload.name),
                isRevoked: new AccessTokenIsRevoked(command.payload.isRevoked),
                expiresAt: new AccessTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.cQMetadata,
        );
    }
}