/* eslint-disable key-spacing */
import { CommonCreateAttachmentLibraryCommand } from '@app/common/attachment-library';
import { CommonCreateAttachmentLibraryService } from '@app/common/attachment-library/application/create/common-create-attachment-library.service';
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
