/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdateBoundedContextByIdCommand } from './iam-update-bounded-context-by-id.command';
import { IamUpdateBoundedContextByIdService } from './iam-update-bounded-context-by-id.service';
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

@CommandHandler(IamUpdateBoundedContextByIdCommand)
export class IamUpdateBoundedContextByIdCommandHandler implements ICommandHandler<IamUpdateBoundedContextByIdCommand>
{
    constructor(
        private readonly updateBoundedContextByIdService: IamUpdateBoundedContextByIdService,
    ) {}

    async execute(command: IamUpdateBoundedContextByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateBoundedContextByIdService.main(
            {
                id: new IamBoundedContextId(command.payload.id),
                name: new IamBoundedContextName(command.payload.name, { undefinable: true }),
                root: new IamBoundedContextRoot(command.payload.root, { undefinable: true }),
                sort: new IamBoundedContextSort(command.payload.sort),
                isActive: new IamBoundedContextIsActive(command.payload.isActive, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
