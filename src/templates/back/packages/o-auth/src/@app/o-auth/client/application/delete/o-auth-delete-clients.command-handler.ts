import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthDeleteClientsCommand } from './o-auth-delete-clients.command';
import { OAuthDeleteClientsService } from './o-auth-delete-clients.service';

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
