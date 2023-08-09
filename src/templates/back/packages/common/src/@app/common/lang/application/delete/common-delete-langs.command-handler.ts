import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteLangsCommand } from './common-delete-langs.command';
import { CommonDeleteLangsService } from './common-delete-langs.service';

@CommandHandler(CommonDeleteLangsCommand)
export class CommonDeleteLangsCommandHandler implements ICommandHandler<CommonDeleteLangsCommand>
{
    constructor(
        private readonly deleteLangsService: CommonDeleteLangsService,
    ) {}

    async execute(command: CommonDeleteLangsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLangsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
