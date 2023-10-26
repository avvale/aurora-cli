/* eslint-disable key-spacing */
import { CommonUpsertAttachmentLibraryCommand } from '@app/common/attachment-library';
import { CommonUpsertAttachmentLibraryService } from '@app/common/attachment-library/application/upsert/common-upsert-attachment-library.service';
import {
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMime,
    CommonAttachmentLibraryName,
    CommonAttachmentLibraryPath,
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
                name: new CommonAttachmentLibraryName(command.payload.name),
                path: new CommonAttachmentLibraryPath(command.payload.path),
                filename: new CommonAttachmentLibraryFilename(command.payload.filename),
                url: new CommonAttachmentLibraryUrl(command.payload.url),
                mime: new CommonAttachmentLibraryMime(command.payload.mime),
                extension: new CommonAttachmentLibraryExtension(command.payload.extension),
                size: new CommonAttachmentLibrarySize(command.payload.size),
                width: new CommonAttachmentLibraryWidth(command.payload.width),
                height: new CommonAttachmentLibraryHeight(command.payload.height),
                meta: new CommonAttachmentLibraryMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
