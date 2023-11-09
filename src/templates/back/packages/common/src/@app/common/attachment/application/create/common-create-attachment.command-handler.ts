/* eslint-disable key-spacing */
import { CommonCreateAttachmentCommand } from '@app/common/attachment';
import { CommonCreateAttachmentService } from '@app/common/attachment/application/create/common-create-attachment.service';
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

@CommandHandler(CommonCreateAttachmentCommand)
export class CommonCreateAttachmentCommandHandler implements ICommandHandler<CommonCreateAttachmentCommand>
{
    constructor(
        private readonly createAttachmentService: CommonCreateAttachmentService,
    ) {}

    async execute(command: CommonCreateAttachmentCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentService.main(
            {
                id: new CommonAttachmentId(command.payload.id),
                familyId: new CommonAttachmentFamilyId(command.payload.familyId),
                attachableId: new CommonAttachmentAttachableId(command.payload.attachableId),
                sort: new CommonAttachmentSort(command.payload.sort),
                alt: new CommonAttachmentAlt(command.payload.alt),
                title: new CommonAttachmentTitle(command.payload.title),
                originFilename: new CommonAttachmentOriginFilename(command.payload.originFilename),
                filename: new CommonAttachmentFilename(command.payload.filename),
                mimetype: new CommonAttachmentMimetype(command.payload.mimetype),
                extension: new CommonAttachmentExtension(command.payload.extension),
                relativePathSegments: new CommonAttachmentRelativePathSegments(command.payload.relativePathSegments),
                width: new CommonAttachmentWidth(command.payload.width),
                height: new CommonAttachmentHeight(command.payload.height),
                size: new CommonAttachmentSize(command.payload.size),
                url: new CommonAttachmentUrl(command.payload.url),
                isCropable: new CommonAttachmentIsCropable(command.payload.isCropable),
                libraryId: new CommonAttachmentLibraryId(command.payload.libraryId),
                libraryFilename: new CommonAttachmentLibraryFilename(command.payload.libraryFilename),
                sizes: new CommonAttachmentSizes(command.payload.sizes),
                meta: new CommonAttachmentMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
