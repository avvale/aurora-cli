import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteHttpCommunicationsCommand } from './delete-http-communications.command';
import { DeleteHttpCommunicationsService } from './delete-http-communications.service';

@CommandHandler(DeleteHttpCommunicationsCommand)
export class DeleteHttpCommunicationsCommandHandler implements ICommandHandler<DeleteHttpCommunicationsCommand>
{
    constructor(
        private readonly deleteHttpCommunicationsService: DeleteHttpCommunicationsService,
    ) {}

    async execute(command: DeleteHttpCommunicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteHttpCommunicationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}