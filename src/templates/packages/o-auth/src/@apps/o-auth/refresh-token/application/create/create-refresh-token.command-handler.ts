/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRefreshTokenCommand } from './create-refresh-token.command';
import { CreateRefreshTokenService } from './create-refresh-token.service';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateRefreshTokenCommand)
export class CreateRefreshTokenCommandHandler implements ICommandHandler<CreateRefreshTokenCommand>
{
    constructor(
        private readonly createRefreshTokenService: CreateRefreshTokenService,
    ) {}

    async execute(command: CreateRefreshTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRefreshTokenService.main(
            {
                id: new RefreshTokenId(command.payload.id),
                accessTokenId: new RefreshTokenAccessTokenId(command.payload.accessTokenId),
                token: new RefreshTokenToken(command.payload.token),
                isRevoked: new RefreshTokenIsRevoked(command.payload.isRevoked),
                expiresAt: new RefreshTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.cQMetadata,
        );
    }
}