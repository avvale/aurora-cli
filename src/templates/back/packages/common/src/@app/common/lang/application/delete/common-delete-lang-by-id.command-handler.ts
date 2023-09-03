import { CommonDeleteLangByIdCommand } from '@app/common/lang';
import { CommonDeleteLangByIdService } from '@app/common/lang/application/delete/common-delete-lang-by-id.service';
import { CommonLangId } from '@app/common/lang/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteLangByIdCommand)
export class CommonDeleteLangByIdCommandHandler implements ICommandHandler<CommonDeleteLangByIdCommand>
{
    constructor(
        private readonly deleteLangByIdService: CommonDeleteLangByIdService,
    ) {}

    async execute(command: CommonDeleteLangByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLangByIdService.main(
            new CommonLangId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
