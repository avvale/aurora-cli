/* eslint-disable key-spacing */
import { CommonUpdateAttachmentByIdCommand } from '@app/common/attachment';
import { CommonUpdateAttachmentByIdService } from '@app/common/attachment/application/update/common-update-attachment-by-id.service';
import {
    CommonAttachmentAlt,
    CommonAttachmentAttachableId,
    CommonAttachmentExtension,
    CommonAttachmentFamilyId,
    CommonAttachmentFilename,
    CommonAttachmentHeight,
    CommonAttachmentId,
    CommonAttachmentIsCropable,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryId,
    CommonAttachmentMeta,
    CommonAttachmentMimetype,
    CommonAttachmentOriginFilename,
    CommonAttachmentRelativePathSegments,
    CommonAttachmentSize,
    CommonAttachmentSizes,
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
                attachableId: new CommonAttachmentAttachableId(command.payload.attachableId, { undefinable: true }),
                sort: new CommonAttachmentSort(command.payload.sort),
                alt: new CommonAttachmentAlt(command.payload.alt),
                title: new CommonAttachmentTitle(command.payload.title),
                originFilename: new CommonAttachmentOriginFilename(command.payload.originFilename, { undefinable: true }),
                filename: new CommonAttachmentFilename(command.payload.filename, { undefinable: true }),
                mimetype: new CommonAttachmentMimetype(command.payload.mimetype, { undefinable: true }),
                extension: new CommonAttachmentExtension(command.payload.extension, { undefinable: true }),
                relativePathSegments: new CommonAttachmentRelativePathSegments(command.payload.relativePathSegments, { undefinable: true }),
                width: new CommonAttachmentWidth(command.payload.width),
                height: new CommonAttachmentHeight(command.payload.height),
                size: new CommonAttachmentSize(command.payload.size, { undefinable: true }),
                url: new CommonAttachmentUrl(command.payload.url, { undefinable: true }),
                isCropable: new CommonAttachmentIsCropable(command.payload.isCropable, { undefinable: true }),
                libraryId: new CommonAttachmentLibraryId(command.payload.libraryId),
                libraryFilename: new CommonAttachmentLibraryFilename(command.payload.libraryFilename),
                sizes: new CommonAttachmentSizes(command.payload.sizes),
                meta: new CommonAttachmentMeta(command.payload.meta),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
