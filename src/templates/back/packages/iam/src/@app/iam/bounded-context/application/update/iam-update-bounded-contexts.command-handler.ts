/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdateBoundedContextsCommand } from './iam-update-bounded-contexts.command';
import { IamUpdateBoundedContextsService } from './iam-update-bounded-contexts.service';
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

@CommandHandler(IamUpdateBoundedContextsCommand)
export class IamUpdateBoundedContextsCommandHandler implements ICommandHandler<IamUpdateBoundedContextsCommand>
{
    constructor(
        private readonly updateBoundedContextsService: IamUpdateBoundedContextsService,
    ) {}

    async execute(command: IamUpdateBoundedContextsCommand): Promise<void>
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
