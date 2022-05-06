import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBoundedContextsCommand } from './delete-bounded-contexts.command';
import { DeleteBoundedContextsService } from './delete-bounded-contexts.service';

@CommandHandler(DeleteBoundedContextsCommand)
export class DeleteBoundedContextsCommandHandler implements ICommandHandler<DeleteBoundedContextsCommand>
{
    constructor(
        private readonly deleteBoundedContextsService: DeleteBoundedContextsService,
    ) {}

    async execute(command: DeleteBoundedContextsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteBoundedContextsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}