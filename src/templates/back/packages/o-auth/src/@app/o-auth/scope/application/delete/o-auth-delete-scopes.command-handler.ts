import { OAuthDeleteScopesCommand } from '@app/o-auth/scope';
import { OAuthDeleteScopesService } from '@app/o-auth/scope/application/delete/o-auth-delete-scopes.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteScopesCommand)
export class OAuthDeleteScopesCommandHandler
    implements ICommandHandler<OAuthDeleteScopesCommand>
{
    constructor(
        private readonly deleteScopesService: OAuthDeleteScopesService,
    ) {}

    async execute(command: OAuthDeleteScopesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteScopesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
