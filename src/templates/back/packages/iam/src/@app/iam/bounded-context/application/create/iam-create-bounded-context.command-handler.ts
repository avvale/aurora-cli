/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateBoundedContextCommand } from './iam-create-bounded-context.command';
import { IamCreateBoundedContextService } from './iam-create-bounded-context.service';
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

@CommandHandler(IamCreateBoundedContextCommand)
export class IamCreateBoundedContextCommandHandler implements ICommandHandler<IamCreateBoundedContextCommand>
{
    constructor(
        private readonly createBoundedContextService: IamCreateBoundedContextService,
    ) {}

    async execute(command: IamCreateBoundedContextCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createBoundedContextService.main(
            {
                id: new IamBoundedContextId(command.payload.id),
                name: new IamBoundedContextName(command.payload.name),
                root: new IamBoundedContextRoot(command.payload.root),
                sort: new IamBoundedContextSort(command.payload.sort),
                isActive: new IamBoundedContextIsActive(command.payload.isActive),
            },
            command.cQMetadata,
        );
    }
}
