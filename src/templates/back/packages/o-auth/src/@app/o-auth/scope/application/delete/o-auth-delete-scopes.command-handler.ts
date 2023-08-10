import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteScopesCommand } from './o-auth-delete-scopes.command';
import { OAuthDeleteScopesService } from './o-auth-delete-scopes.service';

@CommandHandler(OAuthDeleteScopesCommand)
export class OAuthDeleteScopesCommandHandler implements ICommandHandler<OAuthDeleteScopesCommand>
{
    constructor(
        private readonly deleteScopesService: OAuthDeleteScopesService,
    ) {}

    async execute(command: OAuthDeleteScopesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteScopesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
