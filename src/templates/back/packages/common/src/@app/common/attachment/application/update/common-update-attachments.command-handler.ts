/* eslint-disable key-spacing */
import { CommonUpdateAttachmentsCommand } from '@app/common/attachment';
import { CommonUpdateAttachmentsService } from '@app/common/attachment/application/update/common-update-attachments.service';
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

@CommandHandler(CommonUpdateAttachmentsCommand)
export class CommonUpdateAttachmentsCommandHandler implements ICommandHandler<CommonUpdateAttachmentsCommand>
{
    constructor(
        private readonly updateAttachmentsService: CommonUpdateAttachmentsService,
    ) {}

    async execute(command: CommonUpdateAttachmentsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentsService.main(
            {
                id: new CommonAttachmentId(command.payload.id, { undefinable: true }),
                familyId: new CommonAttachmentFamilyId(command.payload.familyId),
                sort: new CommonAttachmentSort(command.payload.sort),
                alt: new CommonAttachmentAlt(command.payload.alt, { undefinable: true }),
                title: new CommonAttachmentTitle(command.payload.title, { undefinable: true }),
                path: new CommonAttachmentPath(command.payload.path, { undefinable: true }),
                filename: new CommonAttachmentFilename(command.payload.filename, { undefinable: true }),
                url: new CommonAttachmentUrl(command.payload.url, { undefinable: true }),
                mime: new CommonAttachmentMime(command.payload.mime, { undefinable: true }),
                extension: new CommonAttachmentExtension(command.payload.extension, { undefinable: true }),
                size: new CommonAttachmentSize(command.payload.size, { undefinable: true }),
                width: new CommonAttachmentWidth(command.payload.width),
                height: new CommonAttachmentHeight(command.payload.height),
                libraryId: new CommonAttachmentLibraryId(command.payload.libraryId),
                libraryFilename: new CommonAttachmentLibraryFilename(command.payload.libraryFilename, { undefinable: true }),
                meta: new CommonAttachmentMeta(command.payload.meta),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
