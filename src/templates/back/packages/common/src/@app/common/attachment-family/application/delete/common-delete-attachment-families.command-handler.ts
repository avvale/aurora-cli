import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAttachmentFamiliesCommand } from './common-delete-attachment-families.command';
import { CommonDeleteAttachmentFamiliesService } from './common-delete-attachment-families.service';

@CommandHandler(CommonDeleteAttachmentFamiliesCommand)
export class CommonDeleteAttachmentFamiliesCommandHandler implements ICommandHandler<CommonDeleteAttachmentFamiliesCommand>
{
    constructor(
        private readonly deleteAttachmentFamiliesService: CommonDeleteAttachmentFamiliesService,
    ) {}

    async execute(command: CommonDeleteAttachmentFamiliesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentFamiliesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
