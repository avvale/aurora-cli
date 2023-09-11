import { IamDeleteBoundedContextByIdCommand } from '@app/iam/bounded-context';
import { IamDeleteBoundedContextByIdService } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-context-by-id.service';
import { IamBoundedContextId } from '@app/iam/bounded-context/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
