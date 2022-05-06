import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteClientsCommand } from './delete-clients.command';
import { DeleteClientsService } from './delete-clients.service';

@CommandHandler(DeleteClientsCommand)
export class DeleteClientsCommandHandler implements ICommandHandler<DeleteClientsCommand>
{
    constructor(
        private readonly deleteClientsService: DeleteClientsService,
    ) {}

    async execute(command: DeleteClientsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteClientsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}