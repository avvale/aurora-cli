import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteApplicationsCommand } from './delete-applications.command';
import { DeleteApplicationsService } from './delete-applications.service';

@CommandHandler(DeleteApplicationsCommand)
export class DeleteApplicationsCommandHandler implements ICommandHandler<DeleteApplicationsCommand>
{
    constructor(
        private readonly deleteApplicationsService: DeleteApplicationsService,
    ) {}

    async execute(command: DeleteApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}