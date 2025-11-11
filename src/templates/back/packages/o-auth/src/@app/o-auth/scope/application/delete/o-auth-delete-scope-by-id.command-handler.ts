import { OAuthDeleteScopeByIdCommand } from '@app/o-auth/scope';
import { OAuthDeleteScopeByIdService } from '@app/o-auth/scope/application/delete/o-auth-delete-scope-by-id.service';
import { OAuthScopeId } from '@app/o-auth/scope/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteScopeByIdCommand)
export class OAuthDeleteScopeByIdCommandHandler
    implements ICommandHandler<OAuthDeleteScopeByIdCommand>
{
    constructor(
        private readonly deleteScopeByIdService: OAuthDeleteScopeByIdService,
    ) {}

    async execute(command: OAuthDeleteScopeByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteScopeByIdService.main(
            new OAuthScopeId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
