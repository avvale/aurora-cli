/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRefreshTokensCommand } from './create-refresh-tokens.command';
import { CreateRefreshTokensService } from './create-refresh-tokens.service';
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

@CommandHandler(CreateRefreshTokensCommand)
export class CreateRefreshTokensCommandHandler implements ICommandHandler<CreateRefreshTokensCommand>
{
    constructor(
        private readonly createRefreshTokensService: CreateRefreshTokensService,
    ) {}

    async execute(command: CreateRefreshTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRefreshTokensService.main(
            command.payload
                .map(refreshToken =>
                {
                    return {
                        id: new RefreshTokenId(refreshToken.id),
                        accessTokenId: new RefreshTokenAccessTokenId(refreshToken.accessTokenId),
                        token: new RefreshTokenToken(refreshToken.token),
                        isRevoked: new RefreshTokenIsRevoked(refreshToken.isRevoked),
                        expiresAt: new RefreshTokenExpiresAt(refreshToken.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
                    };
                }),
            command.cQMetadata,
        );
    }
}