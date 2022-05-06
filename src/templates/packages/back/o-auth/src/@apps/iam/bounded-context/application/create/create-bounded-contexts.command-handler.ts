/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBoundedContextsCommand } from './create-bounded-contexts.command';
import { CreateBoundedContextsService } from './create-bounded-contexts.service';
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

@CommandHandler(CreateBoundedContextsCommand)
export class CreateBoundedContextsCommandHandler implements ICommandHandler<CreateBoundedContextsCommand>
{
    constructor(
        private readonly createBoundedContextsService: CreateBoundedContextsService,
    ) {}

    async execute(command: CreateBoundedContextsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createBoundedContextsService.main(
            command.payload
                .map(boundedContext =>
                {
                    return {
                        id: new BoundedContextId(boundedContext.id),
                        name: new BoundedContextName(boundedContext.name),
                        root: new BoundedContextRoot(boundedContext.root),
                        sort: new BoundedContextSort(boundedContext.sort),
                        isActive: new BoundedContextIsActive(boundedContext.isActive),
                    };
                }),
            command.cQMetadata,
        );
    }
}