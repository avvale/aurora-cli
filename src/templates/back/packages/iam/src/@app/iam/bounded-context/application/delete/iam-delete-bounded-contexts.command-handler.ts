import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteBoundedContextsCommand } from './iam-delete-bounded-contexts.command';
import { IamDeleteBoundedContextsService } from './iam-delete-bounded-contexts.service';

@CommandHandler(IamDeleteBoundedContextsCommand)
export class IamDeleteBoundedContextsCommandHandler implements ICommandHandler<IamDeleteBoundedContextsCommand>
{
    constructor(
        private readonly deleteBoundedContextsService: IamDeleteBoundedContextsService,
    ) {}

    async execute(command: IamDeleteBoundedContextsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteBoundedContextsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
