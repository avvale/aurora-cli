import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBoundedContextByIdCommand } from './delete-bounded-context-by-id.command';
import { DeleteBoundedContextByIdService } from './delete-bounded-context-by-id.service';
import {
    BoundedContextId
} from '../../domain/value-objects';

@CommandHandler(DeleteBoundedContextByIdCommand)
export class DeleteBoundedContextByIdCommandHandler implements ICommandHandler<DeleteBoundedContextByIdCommand>
{
    constructor(
        private readonly deleteBoundedContextByIdService: DeleteBoundedContextByIdService,
    ) {}

    async execute(command: DeleteBoundedContextByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteBoundedContextByIdService.main(
            new BoundedContextId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}