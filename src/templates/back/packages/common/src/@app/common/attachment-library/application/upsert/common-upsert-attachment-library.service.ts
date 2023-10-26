import { CommonAttachmentLibrary, CommonIAttachmentLibraryRepository } from '@app/common/attachment-library';
import {
    CommonAttachmentLibraryCreatedAt,
    CommonAttachmentLibraryDeletedAt,
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMime,
    CommonAttachmentLibraryName,
    CommonAttachmentLibraryPath,
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
            name: CommonAttachmentLibraryName;
            path: CommonAttachmentLibraryPath;
            filename: CommonAttachmentLibraryFilename;
            url: CommonAttachmentLibraryUrl;
            mime: CommonAttachmentLibraryMime;
            extension: CommonAttachmentLibraryExtension;
            size: CommonAttachmentLibrarySize;
            width: CommonAttachmentLibraryWidth;
            height: CommonAttachmentLibraryHeight;
            meta: CommonAttachmentLibraryMeta;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const attachmentLibrary = CommonAttachmentLibrary.register(
            payload.id,
            payload.name,
            payload.path,
            payload.filename,
            payload.url,
            payload.mime,
            payload.extension,
            payload.size,
            payload.width,
            payload.height,
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
