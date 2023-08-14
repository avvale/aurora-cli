import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteRefreshTokenByIdCommand } from './o-auth-delete-refresh-token-by-id.command';
import { OAuthDeleteRefreshTokenByIdService } from './o-auth-delete-refresh-token-by-id.service';
import {
    OAuthRefreshTokenId
} from '../../domain/value-objects';

@CommandHandler(OAuthDeleteRefreshTokenByIdCommand)
export class OAuthDeleteRefreshTokenByIdCommandHandler implements ICommandHandler<OAuthDeleteRefreshTokenByIdCommand>
{
    constructor(
        private readonly deleteRefreshTokenByIdService: OAuthDeleteRefreshTokenByIdService,
    ) {}

    async execute(command: OAuthDeleteRefreshTokenByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRefreshTokenByIdService.main(
            new OAuthRefreshTokenId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
