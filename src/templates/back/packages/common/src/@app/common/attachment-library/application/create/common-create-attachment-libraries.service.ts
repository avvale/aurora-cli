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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAttachmentLibrariesService
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
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachmentLibraries = payload.map(attachmentLibrary => CommonAttachmentLibrary.register(
            attachmentLibrary.id,
            attachmentLibrary.name,
            attachmentLibrary.path,
            attachmentLibrary.filename,
            attachmentLibrary.url,
            attachmentLibrary.mime,
            attachmentLibrary.extension,
            attachmentLibrary.size,
            attachmentLibrary.width,
            attachmentLibrary.height,
            attachmentLibrary.meta,
            new CommonAttachmentLibraryCreatedAt({ currentTimestamp: true }),
            new CommonAttachmentLibraryUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateAttachmentLibraries,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddAttachmentLibrariesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentLibrariesRegistered = this.publisher.mergeObjectContext(new CommonAddAttachmentLibrariesContextEvent(aggregateAttachmentLibraries));

        attachmentLibrariesRegistered.created(); // apply event to model events
        attachmentLibrariesRegistered.commit(); // commit all events of model
    }
}
