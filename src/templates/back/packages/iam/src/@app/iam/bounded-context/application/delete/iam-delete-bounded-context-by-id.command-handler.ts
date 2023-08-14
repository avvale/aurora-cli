import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteBoundedContextByIdCommand } from './iam-delete-bounded-context-by-id.command';
import { IamDeleteBoundedContextByIdService } from './iam-delete-bounded-context-by-id.service';
import {
    IamBoundedContextId
} from '../../domain/value-objects';

@CommandHandler(IamDeleteBoundedContextByIdCommand)
export class IamDeleteBoundedContextByIdCommandHandler implements ICommandHandler<IamDeleteBoundedContextByIdCommand>
{
    constructor(
        private readonly deleteBoundedContextByIdService: IamDeleteBoundedContextByIdService,
    ) {}

    async execute(command: IamDeleteBoundedContextByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteBoundedContextByIdService.main(
            new IamBoundedContextId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
