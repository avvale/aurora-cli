import { OAuthDeleteRefreshTokenByIdCommand } from '@app/o-auth/refresh-token';
import { OAuthDeleteRefreshTokenByIdService } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-token-by-id.service';
import { OAuthRefreshTokenId } from '@app/o-auth/refresh-token/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
