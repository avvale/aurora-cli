/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBoundedContextCommand } from './create-bounded-context.command';
import { CreateBoundedContextService } from './create-bounded-context.service';
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

@CommandHandler(CreateBoundedContextCommand)
export class CreateBoundedContextCommandHandler implements ICommandHandler<CreateBoundedContextCommand>
{
    constructor(
        private readonly createBoundedContextService: CreateBoundedContextService,
    ) {}

    async execute(command: CreateBoundedContextCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createBoundedContextService.main(
            {
                id: new BoundedContextId(command.payload.id),
                name: new BoundedContextName(command.payload.name),
                root: new BoundedContextRoot(command.payload.root),
                sort: new BoundedContextSort(command.payload.sort),
                isActive: new BoundedContextIsActive(command.payload.isActive),
            },
            command.cQMetadata,
        );
    }
}