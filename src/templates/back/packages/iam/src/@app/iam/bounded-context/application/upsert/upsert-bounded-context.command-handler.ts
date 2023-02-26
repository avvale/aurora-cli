/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertBoundedContextCommand } from './upsert-bounded-context.command';
import { UpsertBoundedContextService } from './upsert-bounded-context.service';
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

@CommandHandler(UpsertBoundedContextCommand)
export class UpsertBoundedContextCommandHandler implements ICommandHandler<UpsertBoundedContextCommand>
{
    constructor(
        private readonly upsertBoundedContextService: UpsertBoundedContextService,
    ) {}

    async execute(command: UpsertBoundedContextCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertBoundedContextService.main(
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