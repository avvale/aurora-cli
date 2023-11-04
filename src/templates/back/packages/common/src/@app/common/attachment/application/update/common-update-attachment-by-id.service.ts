import { CommonAttachment, CommonIAttachmentRepository } from '@app/common/attachment';
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
export class CommonUpdateAttachmentByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentRepository,
    ) {}

    async main(
        payload: {
            id: CommonAttachmentId;
            familyId?: CommonAttachmentFamilyId;
            attachableId?: CommonAttachmentAttachableId;
            sort?: CommonAttachmentSort;
            alt?: CommonAttachmentAlt;
            title?: CommonAttachmentTitle;
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

        // update by id
        await this.repository.updateById(
            attachment,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentRegister = this.publisher.mergeObjectContext(
            attachment,
        );

        attachmentRegister.updated(attachment); // apply event to model events
        attachmentRegister.commit(); // commit all events of model
    }
}
