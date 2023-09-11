/* eslint-disable key-spacing */
import { IamUpsertBoundedContextCommand } from '@app/iam/bounded-context';
import { IamUpsertBoundedContextService } from '@app/iam/bounded-context/application/upsert/iam-upsert-bounded-context.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpsertBoundedContextCommand)
export class IamUpsertBoundedContextCommandHandler implements ICommandHandler<IamUpsertBoundedContextCommand>
{
    constructor(
        private readonly upsertBoundedContextService: IamUpsertBoundedContextService,
    ) {}

    async execute(command: IamUpsertBoundedContextCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertBoundedContextService.main(
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
