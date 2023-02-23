/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBoundedContextByIdCommand } from './update-bounded-context-by-id.command';
import { UpdateBoundedContextByIdService } from './update-bounded-context-by-id.service';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateBoundedContextByIdCommand)
export class UpdateBoundedContextByIdCommandHandler implements ICommandHandler<UpdateBoundedContextByIdCommand>
{
    constructor(
        private readonly updateBoundedContextByIdService: UpdateBoundedContextByIdService,
    ) {}

    async execute(command: UpdateBoundedContextByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateBoundedContextByIdService.main(
            {
                id: new BoundedContextId(command.payload.id),
                name: new BoundedContextName(command.payload.name, { undefinable: true }),
                root: new BoundedContextRoot(command.payload.root, { undefinable: true }),
                sort: new BoundedContextSort(command.payload.sort),
                isActive: new BoundedContextIsActive(command.payload.isActive, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}