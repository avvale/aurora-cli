/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRefreshTokenCommand } from './update-refresh-token.command';
import { UpdateRefreshTokenService } from './update-refresh-token.service';
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

@CommandHandler(UpdateRefreshTokenCommand)
export class UpdateRefreshTokenCommandHandler implements ICommandHandler<UpdateRefreshTokenCommand>
{
    constructor(
        private readonly updateRefreshTokenService: UpdateRefreshTokenService,
    ) {}

    async execute(command: UpdateRefreshTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRefreshTokenService.main(
            {
                id: new RefreshTokenId(command.payload.id),
                accessTokenId: new RefreshTokenAccessTokenId(command.payload.accessTokenId, { undefinable: true }),
                token: new RefreshTokenToken(command.payload.token, { undefinable: true }),
                isRevoked: new RefreshTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new RefreshTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}