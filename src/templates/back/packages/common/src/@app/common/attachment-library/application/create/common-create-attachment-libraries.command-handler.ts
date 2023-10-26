/* eslint-disable key-spacing */
import { CommonCreateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { CommonCreateAttachmentLibrariesService } from '@app/common/attachment-library/application/create/common-create-attachment-libraries.service';
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
                        name: new CommonAttachmentLibraryName(attachmentLibrary.name),
                        path: new CommonAttachmentLibraryPath(attachmentLibrary.path),
                        filename: new CommonAttachmentLibraryFilename(attachmentLibrary.filename),
                        url: new CommonAttachmentLibraryUrl(attachmentLibrary.url),
                        mime: new CommonAttachmentLibraryMime(attachmentLibrary.mime),
                        extension: new CommonAttachmentLibraryExtension(attachmentLibrary.extension),
                        size: new CommonAttachmentLibrarySize(attachmentLibrary.size),
                        width: new CommonAttachmentLibraryWidth(attachmentLibrary.width),
                        height: new CommonAttachmentLibraryHeight(attachmentLibrary.height),
                        meta: new CommonAttachmentLibraryMeta(attachmentLibrary.meta),
                    };
                }),
            command.cQMetadata,
        );
    }
}
