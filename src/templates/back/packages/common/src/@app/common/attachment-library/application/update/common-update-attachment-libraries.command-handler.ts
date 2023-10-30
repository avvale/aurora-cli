/* eslint-disable key-spacing */
import { CommonUpdateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { CommonUpdateAttachmentLibrariesService } from '@app/common/attachment-library/application/update/common-update-attachment-libraries.service';
import {
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryIsCropable,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpdateAttachmentLibrariesCommand)
export class CommonUpdateAttachmentLibrariesCommandHandler implements ICommandHandler<CommonUpdateAttachmentLibrariesCommand>
{
    constructor(
        private readonly updateAttachmentLibrariesService: CommonUpdateAttachmentLibrariesService,
    ) {}

    async execute(command: CommonUpdateAttachmentLibrariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentLibrariesService.main(
            {
                id: new CommonAttachmentLibraryId(command.payload.id, { undefinable: true }),
                filename: new CommonAttachmentLibraryFilename(command.payload.filename, { undefinable: true }),
                mimetype: new CommonAttachmentLibraryMimetype(command.payload.mimetype, { undefinable: true }),
                extension: new CommonAttachmentLibraryExtension(command.payload.extension, { undefinable: true }),
                relativePathSegments: new CommonAttachmentLibraryRelativePathSegments(command.payload.relativePathSegments, { undefinable: true }),
                width: new CommonAttachmentLibraryWidth(command.payload.width),
                height: new CommonAttachmentLibraryHeight(command.payload.height),
                size: new CommonAttachmentLibrarySize(command.payload.size, { undefinable: true }),
                url: new CommonAttachmentLibraryUrl(command.payload.url, { undefinable: true }),
                isCropable: new CommonAttachmentLibraryIsCropable(command.payload.isCropable, { undefinable: true }),
                meta: new CommonAttachmentLibraryMeta(command.payload.meta),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
