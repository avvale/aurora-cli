import { CommonAddAttachmentLibrariesContextEvent, CommonAttachmentLibrary, CommonIAttachmentLibraryRepository } from '@app/common/attachment-library';
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
export class CommonUpdateAttachmentLibrariesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentLibraryRepository,
    ) {}

    async main(
        payload: {
            id?: CommonAttachmentLibraryId;
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
        queryStatement?: QueryStatement,
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

        // update
        await this.repository.update(
            attachmentLibrary,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const attachmentLibraries = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentLibrariesRegister = this.publisher.mergeObjectContext(
            new CommonAddAttachmentLibrariesContextEvent(attachmentLibraries),
        );

        attachmentLibrariesRegister.updated(); // apply event to model events
        attachmentLibrariesRegister.commit(); // commit all events of model
    }
}
