/* eslint-disable key-spacing */
import { CommonUpdateAttachmentByIdCommand } from '@app/common/attachment';
import { CommonUpdateAttachmentByIdService } from '@app/common/attachment/application/update/common-update-attachment-by-id.service';
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

@CommandHandler(CommonUpdateAttachmentByIdCommand)
export class CommonUpdateAttachmentByIdCommandHandler implements ICommandHandler<CommonUpdateAttachmentByIdCommand>
{
    constructor(
        private readonly updateAttachmentByIdService: CommonUpdateAttachmentByIdService,
    ) {}

    async execute(command: CommonUpdateAttachmentByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentByIdService.main(
            {
                id: new CommonAttachmentId(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}