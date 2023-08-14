import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAttachmentFamilyByIdCommand } from './common-delete-attachment-family-by-id.command';
import { CommonDeleteAttachmentFamilyByIdService } from './common-delete-attachment-family-by-id.service';
import {
    CommonAttachmentFamilyId
} from '../../domain/value-objects';

@CommandHandler(CommonDeleteAttachmentFamilyByIdCommand)
export class CommonDeleteAttachmentFamilyByIdCommandHandler implements ICommandHandler<CommonDeleteAttachmentFamilyByIdCommand>
{
    constructor(
        private readonly deleteAttachmentFamilyByIdService: CommonDeleteAttachmentFamilyByIdService,
    ) {}

    async execute(command: CommonDeleteAttachmentFamilyByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentFamilyByIdService.main(
            new CommonAttachmentFamilyId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
