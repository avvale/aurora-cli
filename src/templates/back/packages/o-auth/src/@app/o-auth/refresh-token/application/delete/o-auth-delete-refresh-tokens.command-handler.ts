import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteRefreshTokensCommand } from './o-auth-delete-refresh-tokens.command';
import { OAuthDeleteRefreshTokensService } from './o-auth-delete-refresh-tokens.service';

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
