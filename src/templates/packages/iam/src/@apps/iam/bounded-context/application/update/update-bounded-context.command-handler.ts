/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBoundedContextCommand } from './update-bounded-context.command';
import { UpdateBoundedContextService } from './update-bounded-context.service';
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

@CommandHandler(UpdateBoundedContextCommand)
export class UpdateBoundedContextCommandHandler implements ICommandHandler<UpdateBoundedContextCommand>
{
    constructor(
        private readonly updateBoundedContextService: UpdateBoundedContextService,
    ) {}

    async execute(command: UpdateBoundedContextCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateBoundedContextService.main(
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