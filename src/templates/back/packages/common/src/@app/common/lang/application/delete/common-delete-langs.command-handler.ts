import { CommonDeleteLangsCommand } from '@app/common/lang';
import { CommonDeleteLangsService } from '@app/common/lang/application/delete/common-delete-langs.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
