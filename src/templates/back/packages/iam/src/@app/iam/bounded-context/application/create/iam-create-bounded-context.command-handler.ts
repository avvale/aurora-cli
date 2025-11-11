/* eslint-disable key-spacing */
import { IamCreateBoundedContextCommand } from '@app/iam/bounded-context';
import { IamCreateBoundedContextService } from '@app/iam/bounded-context/application/create/iam-create-bounded-context.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateBoundedContextCommand)
export class IamCreateBoundedContextCommandHandler
    implements ICommandHandler<IamCreateBoundedContextCommand>
{
    constructor(
        private readonly createBoundedContextService: IamCreateBoundedContextService,
    ) {}

    async execute(command: IamCreateBoundedContextCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createBoundedContextService.main(
            {
                id: new IamBoundedContextId(command.payload.id),
                name: new IamBoundedContextName(command.payload.name),
                root: new IamBoundedContextRoot(command.payload.root),
                sort: new IamBoundedContextSort(command.payload.sort),
                isActive: new IamBoundedContextIsActive(
                    command.payload.isActive,
                ),
            },
            command.cQMetadata,
        );
    }
}
