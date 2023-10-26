import { CommonAddAttachmentsContextEvent, CommonAttachment, CommonIAttachmentRepository } from '@app/common/attachment';
import {
    CommonAttachmentAlt,
    CommonAttachmentCreatedAt,
    CommonAttachmentDeletedAt,
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
            sort: CommonAttachmentSort;
            alt: CommonAttachmentAlt;
            title: CommonAttachmentTitle;
            path: CommonAttachmentPath;
            filename: CommonAttachmentFilename;
            url: CommonAttachmentUrl;
            mime: CommonAttachmentMime;
            extension: CommonAttachmentExtension;
            size: CommonAttachmentSize;
            width: CommonAttachmentWidth;
            height: CommonAttachmentHeight;
            libraryId: CommonAttachmentLibraryId;
            libraryFilename: CommonAttachmentLibraryFilename;
            meta: CommonAttachmentMeta;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachments = payload.map(attachment => CommonAttachment.register(
            attachment.id,
            attachment.familyId,
            attachment.sort,
            attachment.alt,
            attachment.title,
            attachment.path,
            attachment.filename,
            attachment.url,
            attachment.mime,
            attachment.extension,
            attachment.size,
            attachment.width,
            attachment.height,
            attachment.libraryId,
            attachment.libraryFilename,
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
