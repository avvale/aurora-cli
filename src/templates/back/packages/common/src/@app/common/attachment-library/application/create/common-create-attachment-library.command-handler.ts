/* eslint-disable key-spacing */
import { CommonCreateAttachmentLibraryCommand } from '@app/common/attachment-library';
import { CommonCreateAttachmentLibraryService } from '@app/common/attachment-library/application/create/common-create-attachment-library.service';
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

@CommandHandler(CommonCreateAttachmentLibraryCommand)
export class CommonCreateAttachmentLibraryCommandHandler implements ICommandHandler<CommonCreateAttachmentLibraryCommand>
{
    constructor(
        private readonly createAttachmentLibraryService: CommonCreateAttachmentLibraryService,
    ) {}

    async execute(command: CommonCreateAttachmentLibraryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentLibraryService.main(
            {
                id: new CommonAttachmentLibraryId(command.payload.id),
                filename: new CommonAttachmentLibraryFilename(command.payload.filename),
                originFilename: new CommonAttachmentLibraryOriginFilename(command.payload.originFilename),
                mimetype: new CommonAttachmentLibraryMimetype(command.payload.mimetype),
                extension: new CommonAttachmentLibraryExtension(command.payload.extension),
                relativePathSegments: new CommonAttachmentLibraryRelativePathSegments(command.payload.relativePathSegments),
                width: new CommonAttachmentLibraryWidth(command.payload.width),
                height: new CommonAttachmentLibraryHeight(command.payload.height),
                size: new CommonAttachmentLibrarySize(command.payload.size),
                url: new CommonAttachmentLibraryUrl(command.payload.url),
                meta: new CommonAttachmentLibraryMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
