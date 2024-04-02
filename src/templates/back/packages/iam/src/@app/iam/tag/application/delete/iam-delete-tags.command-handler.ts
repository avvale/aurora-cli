import { IamDeleteTagsCommand } from '@app/iam/tag';
import { IamDeleteTagsService } from '@app/iam/tag/application/delete/iam-delete-tags.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteTagsCommand)
export class IamDeleteTagsCommandHandler implements ICommandHandler<IamDeleteTagsCommand>
{
    constructor(
        private readonly deleteTagsService: IamDeleteTagsService,
    ) {}

    async execute(command: IamDeleteTagsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTagsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
