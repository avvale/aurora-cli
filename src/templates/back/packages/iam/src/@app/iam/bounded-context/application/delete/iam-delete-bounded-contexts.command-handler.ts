import { IamDeleteBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamDeleteBoundedContextsService } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-contexts.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteBoundedContextsCommand)
export class IamDeleteBoundedContextsCommandHandler
    implements ICommandHandler<IamDeleteBoundedContextsCommand>
{
    constructor(
        private readonly deleteBoundedContextsService: IamDeleteBoundedContextsService,
    ) {}

    async execute(command: IamDeleteBoundedContextsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteBoundedContextsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
