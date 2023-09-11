/* eslint-disable key-spacing */
import { IamUpdateBoundedContextByIdCommand } from '@app/iam/bounded-context';
import { IamUpdateBoundedContextByIdService } from '@app/iam/bounded-context/application/update/iam-update-bounded-context-by-id.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
