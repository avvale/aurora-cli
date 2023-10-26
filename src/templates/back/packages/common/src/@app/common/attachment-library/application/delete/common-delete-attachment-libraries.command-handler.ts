import { CommonDeleteAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { CommonDeleteAttachmentLibrariesService } from '@app/common/attachment-library/application/delete/common-delete-attachment-libraries.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteAttachmentLibrariesCommand)
export class CommonDeleteAttachmentLibrariesCommandHandler implements ICommandHandler<CommonDeleteAttachmentLibrariesCommand>
{
    constructor(
        private readonly deleteAttachmentLibrariesService: CommonDeleteAttachmentLibrariesService,
    ) {}

    async execute(command: CommonDeleteAttachmentLibrariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentLibrariesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
