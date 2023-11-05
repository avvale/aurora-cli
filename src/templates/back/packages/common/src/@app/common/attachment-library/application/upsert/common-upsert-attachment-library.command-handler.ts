/* eslint-disable key-spacing */
import { CommonUpsertAttachmentLibraryCommand } from '@app/common/attachment-library';
import { CommonUpsertAttachmentLibraryService } from '@app/common/attachment-library/application/upsert/common-upsert-attachment-library.service';
import {
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpsertAttachmentLibraryCommand)
export class CommonUpsertAttachmentLibraryCommandHandler implements ICommandHandler<CommonUpsertAttachmentLibraryCommand>
{
    constructor(
        private readonly upsertAttachmentLibraryService: CommonUpsertAttachmentLibraryService,
    ) {}

    async execute(command: CommonUpsertAttachmentLibraryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAttachmentLibraryService.main(
            {
                id: new CommonAttachmentLibraryId(command.payload.id),
                filename: new CommonAttachmentLibraryFilename(command.payload.filename),
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
