/* eslint-disable key-spacing */
import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamCreateBoundedContextsService } from '@app/iam/bounded-context/application/create/iam-create-bounded-contexts.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
