import { OAuthDeleteClientsCommand } from '@app/o-auth/client';
import { OAuthDeleteClientsService } from '@app/o-auth/client/application/delete/o-auth-delete-clients.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthDeleteClientsCommand)
export class OAuthDeleteClientsCommandHandler implements ICommandHandler<OAuthDeleteClientsCommand>
{
    constructor(
        private readonly deleteClientsService: OAuthDeleteClientsService,
    ) {}

    async execute(command: OAuthDeleteClientsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteClientsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
