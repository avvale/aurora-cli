/* eslint-disable key-spacing */
import { CommonUpsertAttachmentCommand } from '@app/common/attachment';
import { CommonUpsertAttachmentService } from '@app/common/attachment/application/upsert/common-upsert-attachment.service';
import {
    CommonAttachmentAlt,
    CommonAttachmentExtension,
    CommonAttachmentFamilyId,
    CommonAttachmentFilename,
    CommonAttachmentHeight,
    CommonAttachmentId,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryId,
    CommonAttachmentMeta,
    CommonAttachmentMime,
    CommonAttachmentPath,
    CommonAttachmentSize,
    CommonAttachmentSort,
    CommonAttachmentTitle,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpsertAttachmentCommand)
export class CommonUpsertAttachmentCommandHandler implements ICommandHandler<CommonUpsertAttachmentCommand>
{
    constructor(
        private readonly upsertAttachmentService: CommonUpsertAttachmentService,
    ) {}

    async execute(command: CommonUpsertAttachmentCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAttachmentService.main(
            {
                id: new CommonAttachmentId(command.payload.id),
                familyId: new CommonAttachmentFamilyId(command.payload.familyId),
                sort: new CommonAttachmentSort(command.payload.sort),
                alt: new CommonAttachmentAlt(command.payload.alt),
                title: new CommonAttachmentTitle(command.payload.title),
                path: new CommonAttachmentPath(command.payload.path),
                filename: new CommonAttachmentFilename(command.payload.filename),
                url: new CommonAttachmentUrl(command.payload.url),
                mime: new CommonAttachmentMime(command.payload.mime),
                extension: new CommonAttachmentExtension(command.payload.extension),
                size: new CommonAttachmentSize(command.payload.size),
                width: new CommonAttachmentWidth(command.payload.width),
                height: new CommonAttachmentHeight(command.payload.height),
                libraryId: new CommonAttachmentLibraryId(command.payload.libraryId),
                libraryFilename: new CommonAttachmentLibraryFilename(command.payload.libraryFilename),
                meta: new CommonAttachmentMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
