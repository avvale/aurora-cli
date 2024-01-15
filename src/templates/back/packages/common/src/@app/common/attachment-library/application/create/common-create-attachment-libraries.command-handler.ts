/* eslint-disable key-spacing */
import { CommonCreateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { CommonCreateAttachmentLibrariesService } from '@app/common/attachment-library/application/create/common-create-attachment-libraries.service';
import {
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryOriginFilename,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateAttachmentLibrariesCommand)
export class CommonCreateAttachmentLibrariesCommandHandler implements ICommandHandler<CommonCreateAttachmentLibrariesCommand>
{
    constructor(
        private readonly createAttachmentLibrariesService: CommonCreateAttachmentLibrariesService,
    ) {}

    async execute(command: CommonCreateAttachmentLibrariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentLibrariesService.main(
            command.payload
                .map(attachmentLibrary =>
                {
                    return {
                        id: new CommonAttachmentLibraryId(attachmentLibrary.id),
                        originFilename: new CommonAttachmentLibraryOriginFilename(attachmentLibrary.originFilename),
                        filename: new CommonAttachmentLibraryFilename(attachmentLibrary.filename),
                        mimetype: new CommonAttachmentLibraryMimetype(attachmentLibrary.mimetype),
                        extension: new CommonAttachmentLibraryExtension(attachmentLibrary.extension),
                        relativePathSegments: new CommonAttachmentLibraryRelativePathSegments(attachmentLibrary.relativePathSegments),
                        width: new CommonAttachmentLibraryWidth(attachmentLibrary.width),
                        height: new CommonAttachmentLibraryHeight(attachmentLibrary.height),
                        size: new CommonAttachmentLibrarySize(attachmentLibrary.size),
                        url: new CommonAttachmentLibraryUrl(attachmentLibrary.url),
                        meta: new CommonAttachmentLibraryMeta(attachmentLibrary.meta),
                    };
                }),
            command.cQMetadata,
        );
    }
}
