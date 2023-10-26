/* eslint-disable key-spacing */
import { CommonUpdateAttachmentLibraryByIdCommand } from '@app/common/attachment-library';
import { CommonUpdateAttachmentLibraryByIdService } from '@app/common/attachment-library/application/update/common-update-attachment-library-by-id.service';
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

@CommandHandler(CommonUpdateAttachmentLibraryByIdCommand)
export class CommonUpdateAttachmentLibraryByIdCommandHandler implements ICommandHandler<CommonUpdateAttachmentLibraryByIdCommand>
{
    constructor(
        private readonly updateAttachmentLibraryByIdService: CommonUpdateAttachmentLibraryByIdService,
    ) {}

    async execute(command: CommonUpdateAttachmentLibraryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentLibraryByIdService.main(
            {
                id: new CommonAttachmentLibraryId(command.payload.id),
                name: new CommonAttachmentLibraryName(command.payload.name, { undefinable: true }),
                path: new CommonAttachmentLibraryPath(command.payload.path, { undefinable: true }),
                filename: new CommonAttachmentLibraryFilename(command.payload.filename, { undefinable: true }),
                url: new CommonAttachmentLibraryUrl(command.payload.url, { undefinable: true }),
                mime: new CommonAttachmentLibraryMime(command.payload.mime, { undefinable: true }),
                extension: new CommonAttachmentLibraryExtension(command.payload.extension, { undefinable: true }),
                size: new CommonAttachmentLibrarySize(command.payload.size, { undefinable: true }),
                width: new CommonAttachmentLibraryWidth(command.payload.width),
                height: new CommonAttachmentLibraryHeight(command.payload.height),
                meta: new CommonAttachmentLibraryMeta(command.payload.meta),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}