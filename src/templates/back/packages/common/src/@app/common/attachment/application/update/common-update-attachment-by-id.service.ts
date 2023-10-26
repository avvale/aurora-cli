import { CommonAttachment, CommonIAttachmentRepository } from '@app/common/attachment';
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
            sort?: CommonAttachmentSort;
            alt?: CommonAttachmentAlt;
            title?: CommonAttachmentTitle;
            path?: CommonAttachmentPath;
            filename?: CommonAttachmentFilename;
            url?: CommonAttachmentUrl;
            mime?: CommonAttachmentMime;
            extension?: CommonAttachmentExtension;
            size?: CommonAttachmentSize;
            width?: CommonAttachmentWidth;
            height?: CommonAttachmentHeight;
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
            payload.sort,
            payload.alt,
            payload.title,
            payload.path,
            payload.filename,
            payload.url,
            payload.mime,
            payload.extension,
            payload.size,
            payload.width,
            payload.height,
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
