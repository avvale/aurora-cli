/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpsertBoundedContextCommand } from './iam-upsert-bounded-context.command';
import { IamUpsertBoundedContextService } from './iam-upsert-bounded-context.service';
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
