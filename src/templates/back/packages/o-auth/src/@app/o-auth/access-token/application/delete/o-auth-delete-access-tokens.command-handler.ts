import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteAccessTokensCommand } from './o-auth-delete-access-tokens.command';
import { OAuthDeleteAccessTokensService } from './o-auth-delete-access-tokens.service';

@CommandHandler(OAuthDeleteAccessTokensCommand)
export class OAuthDeleteAccessTokensCommandHandler implements ICommandHandler<OAuthDeleteAccessTokensCommand>
{
    constructor(
        private readonly deleteAccessTokensService: OAuthDeleteAccessTokensService,
    ) {}

    async execute(command: OAuthDeleteAccessTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccessTokensService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
