import { CommonAddAttachmentsContextEvent, CommonAttachment, CommonIAttachmentRepository } from '@app/common/attachment';
import {
    CommonAttachmentAlt,
    CommonAttachmentAttachableId,
    CommonAttachmentCreatedAt,
    CommonAttachmentDeletedAt,
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
    CommonAttachmentUpdatedAt,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAttachmentsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentRepository,
    ) {}

    async main(
        payload: {
            id: CommonAttachmentId;
            familyId: CommonAttachmentFamilyId;
            attachableId: CommonAttachmentAttachableId;
            sort: CommonAttachmentSort;
            alt: CommonAttachmentAlt;
            title: CommonAttachmentTitle;
            originFilename: CommonAttachmentOriginFilename;
            filename: CommonAttachmentFilename;
            mimetype: CommonAttachmentMimetype;
            extension: CommonAttachmentExtension;
            relativePathSegments: CommonAttachmentRelativePathSegments;
            width: CommonAttachmentWidth;
            height: CommonAttachmentHeight;
            size: CommonAttachmentSize;
            url: CommonAttachmentUrl;
            isCropable: CommonAttachmentIsCropable;
            libraryId: CommonAttachmentLibraryId;
            libraryFilename: CommonAttachmentLibraryFilename;
            sizes: CommonAttachmentSizes;
            meta: CommonAttachmentMeta;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachments = payload.map(attachment => CommonAttachment.register(
            attachment.id,
            attachment.familyId,
            attachment.attachableId,
            attachment.sort,
            attachment.alt,
            attachment.title,
            attachment.originFilename,
            attachment.filename,
            attachment.mimetype,
            attachment.extension,
            attachment.relativePathSegments,
            attachment.width,
            attachment.height,
            attachment.size,
            attachment.url,
            attachment.isCropable,
            attachment.libraryId,
            attachment.libraryFilename,
            attachment.sizes,
            attachment.meta,
            new CommonAttachmentCreatedAt({ currentTimestamp: true }),
            new CommonAttachmentUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateAttachments,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddAttachmentsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentsRegistered = this.publisher.mergeObjectContext(new CommonAddAttachmentsContextEvent(aggregateAttachments));

        attachmentsRegistered.created(); // apply event to model events
        attachmentsRegistered.commit(); // commit all events of model
    }
}
