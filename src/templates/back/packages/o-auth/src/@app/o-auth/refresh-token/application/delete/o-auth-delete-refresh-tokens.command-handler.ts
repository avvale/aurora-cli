import { OAuthDeleteRefreshTokensCommand } from '@app/o-auth/refresh-token';
import { OAuthDeleteRefreshTokensService } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-tokens.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteRefreshTokensCommand)
export class OAuthDeleteRefreshTokensCommandHandler implements ICommandHandler<OAuthDeleteRefreshTokensCommand>
{
    constructor(
        private readonly deleteRefreshTokensService: OAuthDeleteRefreshTokensService,
    ) {}

    async execute(command: OAuthDeleteRefreshTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRefreshTokensService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
