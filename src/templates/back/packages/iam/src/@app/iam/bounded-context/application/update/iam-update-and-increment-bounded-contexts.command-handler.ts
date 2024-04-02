/* eslint-disable key-spacing */
import { IamUpdateAndIncrementBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamUpdateAndIncrementBoundedContextsService } from '@app/iam/bounded-context/application/update/iam-update-and-increment-bounded-contexts.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementBoundedContextsCommand)
export class IamUpdateAndIncrementBoundedContextsCommandHandler implements ICommandHandler<IamUpdateAndIncrementBoundedContextsCommand>
{
    constructor(
        private readonly updateBoundedContextsService: IamUpdateAndIncrementBoundedContextsService,
    ) {}

    async execute(command: IamUpdateAndIncrementBoundedContextsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateBoundedContextsService.main(
            {
                id: new IamBoundedContextId(command.payload.id, { undefinable: true }),
                name: new IamBoundedContextName(command.payload.name, { undefinable: true }),
                root: new IamBoundedContextRoot(command.payload.root, { undefinable: true }),
                sort: new IamBoundedContextSort(command.payload.sort),
                isActive: new IamBoundedContextIsActive(command.payload.isActive, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
