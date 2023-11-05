import { CommonAttachmentLibrary, CommonIAttachmentLibraryRepository } from '@app/common/attachment-library';
import {
    CommonAttachmentLibraryCreatedAt,
    CommonAttachmentLibraryDeletedAt,
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUpdatedAt,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpsertAttachmentLibraryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentLibraryRepository,
    ) {}

    async main(
        payload: {
            id: CommonAttachmentLibraryId;
            filename: CommonAttachmentLibraryFilename;
            mimetype: CommonAttachmentLibraryMimetype;
            extension: CommonAttachmentLibraryExtension;
            relativePathSegments: CommonAttachmentLibraryRelativePathSegments;
            width: CommonAttachmentLibraryWidth;
            height: CommonAttachmentLibraryHeight;
            size: CommonAttachmentLibrarySize;
            url: CommonAttachmentLibraryUrl;
            meta: CommonAttachmentLibraryMeta;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const attachmentLibrary = CommonAttachmentLibrary.register(
            payload.id,
            payload.filename,
            payload.mimetype,
            payload.extension,
            payload.relativePathSegments,
            payload.width,
            payload.height,
            payload.size,
            payload.url,
            payload.meta,
            new CommonAttachmentLibraryCreatedAt({ currentTimestamp: true }),
            new CommonAttachmentLibraryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                attachmentLibrary,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentLibraryRegister = this.publisher.mergeObjectContext(
            attachmentLibrary,
        );

        attachmentLibraryRegister.created(attachmentLibrary); // apply event to model events
        attachmentLibraryRegister.commit(); // commit all events of model
    }
}
