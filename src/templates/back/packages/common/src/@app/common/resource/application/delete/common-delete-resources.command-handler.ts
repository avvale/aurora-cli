import { CommonDeleteResourcesCommand } from '@app/common/resource';
import { CommonDeleteResourcesService } from '@app/common/resource/application/delete/common-delete-resources.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteResourcesCommand)
export class CommonDeleteResourcesCommandHandler implements ICommandHandler<CommonDeleteResourcesCommand>
{
    constructor(
        private readonly deleteResourcesService: CommonDeleteResourcesService,
    ) {}

    async execute(command: CommonDeleteResourcesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteResourcesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
