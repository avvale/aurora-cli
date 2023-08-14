import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteResourcesCommand } from './common-delete-resources.command';
import { CommonDeleteResourcesService } from './common-delete-resources.service';

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
