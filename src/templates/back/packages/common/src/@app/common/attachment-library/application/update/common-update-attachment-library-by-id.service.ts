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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateAttachmentLibraryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentLibraryRepository,
    ) {}

    async main(
        payload: {
            id: CommonAttachmentLibraryId;
            name?: CommonAttachmentLibraryName;
            path?: CommonAttachmentLibraryPath;
            filename?: CommonAttachmentLibraryFilename;
            url?: CommonAttachmentLibraryUrl;
            mime?: CommonAttachmentLibraryMime;
            extension?: CommonAttachmentLibraryExtension;
            size?: CommonAttachmentLibrarySize;
            width?: CommonAttachmentLibraryWidth;
            height?: CommonAttachmentLibraryHeight;
            meta?: CommonAttachmentLibraryMeta;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
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
            null, // createdAt
            new CommonAttachmentLibraryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            attachmentLibrary,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentLibraryRegister = this.publisher.mergeObjectContext(
            attachmentLibrary,
        );

        attachmentLibraryRegister.updated(attachmentLibrary); // apply event to model events
        attachmentLibraryRegister.commit(); // commit all events of model
    }
}
