/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBoundedContextsCommand } from './update-bounded-contexts.command';
import { UpdateBoundedContextsService } from './update-bounded-contexts.service';
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

@CommandHandler(UpdateBoundedContextsCommand)
export class UpdateBoundedContextsCommandHandler implements ICommandHandler<UpdateBoundedContextsCommand>
{
    constructor(
        private readonly updateBoundedContextsService: UpdateBoundedContextsService,
    ) {}

    async execute(command: UpdateBoundedContextsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateBoundedContextsService.main(
            {
                id: new BoundedContextId(command.payload.id, { undefinable: true }),
                name: new BoundedContextName(command.payload.name, { undefinable: true }),
                root: new BoundedContextRoot(command.payload.root, { undefinable: true }),
                sort: new BoundedContextSort(command.payload.sort),
                isActive: new BoundedContextIsActive(command.payload.isActive, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}