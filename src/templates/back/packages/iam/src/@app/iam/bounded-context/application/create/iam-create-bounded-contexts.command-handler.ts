/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateBoundedContextsCommand } from './iam-create-bounded-contexts.command';
import { IamCreateBoundedContextsService } from './iam-create-bounded-contexts.service';
import {
    IamBoundedContextId,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextIsActive,
    IamBoundedContextCreatedAt,
    IamBoundedContextUpdatedAt,
    IamBoundedContextDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamCreateBoundedContextsCommand)
export class IamCreateBoundedContextsCommandHandler implements ICommandHandler<IamCreateBoundedContextsCommand>
{
    constructor(
        private readonly createBoundedContextsService: IamCreateBoundedContextsService,
    ) {}

    async execute(command: IamCreateBoundedContextsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createBoundedContextsService.main(
            command.payload
                .map(boundedContext =>
                {
                    return {
                        id: new IamBoundedContextId(boundedContext.id),
                        name: new IamBoundedContextName(boundedContext.name),
                        root: new IamBoundedContextRoot(boundedContext.root),
                        sort: new IamBoundedContextSort(boundedContext.sort),
                        isActive: new IamBoundedContextIsActive(boundedContext.isActive),
                    };
                }),
            command.cQMetadata,
        );
    }
}
