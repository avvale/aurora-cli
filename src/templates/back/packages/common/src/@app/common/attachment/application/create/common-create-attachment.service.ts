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
    CommonAttachmentOriginFilename,
    CommonAttachmentRelativePathSegments,
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
export class CommonCreateAttachmentService
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
            meta: CommonAttachmentMeta;
        },
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
            new CommonAttachmentCreatedAt({ currentTimestamp: true }),
            new CommonAttachmentUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            attachment,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentRegister = this.publisher.mergeObjectContext(
            attachment,
        );

        attachmentRegister.created(attachment); // apply event to model events
        attachmentRegister.commit(); // commit all events of model
    }
}
