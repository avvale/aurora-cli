import { OAuthDeleteClientByIdCommand } from '@app/o-auth/client';
import { OAuthDeleteClientByIdService } from '@app/o-auth/client/application/delete/o-auth-delete-client-by-id.service';
import { OAuthClientId } from '@app/o-auth/client/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteClientByIdCommand)
export class OAuthDeleteClientByIdCommandHandler
    implements ICommandHandler<OAuthDeleteClientByIdCommand>
{
    constructor(
        private readonly deleteClientByIdService: OAuthDeleteClientByIdService,
    ) {}

    async execute(command: OAuthDeleteClientByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteClientByIdService.main(
            new OAuthClientId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
