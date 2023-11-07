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
    CommonAttachmentSort,
    CommonAttachmentTitle,
    CommonAttachmentUpdatedAt,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateAttachmentsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentRepository,
    ) {}

    async main(
        payload: {
            id?: CommonAttachmentId;
            familyId?: CommonAttachmentFamilyId;
            attachableId?: CommonAttachmentAttachableId;
            sort?: CommonAttachmentSort;
            alt?: CommonAttachmentAlt;
            title?: CommonAttachmentTitle;
            originFilename?: CommonAttachmentOriginFilename;
            filename?: CommonAttachmentFilename;
            mimetype?: CommonAttachmentMimetype;
            extension?: CommonAttachmentExtension;
            relativePathSegments?: CommonAttachmentRelativePathSegments;
            width?: CommonAttachmentWidth;
            height?: CommonAttachmentHeight;
            size?: CommonAttachmentSize;
            url?: CommonAttachmentUrl;
            isCropable?: CommonAttachmentIsCropable;
            libraryId?: CommonAttachmentLibraryId;
            libraryFilename?: CommonAttachmentLibraryFilename;
            meta?: CommonAttachmentMeta;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachment = CommonAttachment.register(
            payload.id,
            payload.familyId,
            payload.attachableId,
            payload.sort,
            payload.alt,
            payload.title,
            payload.originFilename,
            payload.filename,
            payload.mimetype,
            payload.extension,
            payload.relativePathSegments,
            payload.width,
            payload.height,
            payload.size,
            payload.url,
            payload.isCropable,
            payload.libraryId,
            payload.libraryFilename,
            payload.meta,
            null, // createdAt
            new CommonAttachmentUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            attachment,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const attachments = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentsRegister = this.publisher.mergeObjectContext(
            new CommonAddAttachmentsContextEvent(attachments),
        );

        attachmentsRegister.updated(); // apply event to model events
        attachmentsRegister.commit(); // commit all events of model
    }
}
