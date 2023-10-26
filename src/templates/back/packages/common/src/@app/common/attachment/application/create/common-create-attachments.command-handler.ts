/* eslint-disable key-spacing */
import { CommonCreateAttachmentsCommand } from '@app/common/attachment';
import { CommonCreateAttachmentsService } from '@app/common/attachment/application/create/common-create-attachments.service';
import {
    CommonAttachmentAlt,
    CommonAttachmentExtension,
    CommonAttachmentFamilyId,
    CommonAttachmentFilename,
    CommonAttachmentHeight,
    CommonAttachmentId,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryId,
    CommonAttachmentMeta,
    CommonAttachmentMime,
    CommonAttachmentPath,
    CommonAttachmentSize,
    CommonAttachmentSort,
    CommonAttachmentTitle,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateAttachmentsCommand)
export class CommonCreateAttachmentsCommandHandler implements ICommandHandler<CommonCreateAttachmentsCommand>
{
    constructor(
        private readonly createAttachmentsService: CommonCreateAttachmentsService,
    ) {}

    async execute(command: CommonCreateAttachmentsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentsService.main(
            command.payload
                .map(attachment =>
                {
                    return {
                        id: new CommonAttachmentId(attachment.id),
                        familyId: new CommonAttachmentFamilyId(attachment.familyId),
                        sort: new CommonAttachmentSort(attachment.sort),
                        alt: new CommonAttachmentAlt(attachment.alt),
                        title: new CommonAttachmentTitle(attachment.title),
                        path: new CommonAttachmentPath(attachment.path),
                        filename: new CommonAttachmentFilename(attachment.filename),
                        url: new CommonAttachmentUrl(attachment.url),
                        mime: new CommonAttachmentMime(attachment.mime),
                        extension: new CommonAttachmentExtension(attachment.extension),
                        size: new CommonAttachmentSize(attachment.size),
                        width: new CommonAttachmentWidth(attachment.width),
                        height: new CommonAttachmentHeight(attachment.height),
                        libraryId: new CommonAttachmentLibraryId(attachment.libraryId),
                        libraryFilename: new CommonAttachmentLibraryFilename(attachment.libraryFilename),
                        meta: new CommonAttachmentMeta(attachment.meta),
                    };
                }),
            command.cQMetadata,
        );
    }
}
