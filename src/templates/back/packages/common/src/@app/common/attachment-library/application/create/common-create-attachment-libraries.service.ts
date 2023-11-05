import { CommonAddAttachmentLibrariesContextEvent, CommonAttachmentLibrary, CommonIAttachmentLibraryRepository } from '@app/common/attachment-library';
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
            filename: CommonAttachmentLibraryFilename;
            mimetype: CommonAttachmentLibraryMimetype;
            extension: CommonAttachmentLibraryExtension;
            relativePathSegments: CommonAttachmentLibraryRelativePathSegments;
            width: CommonAttachmentLibraryWidth;
            height: CommonAttachmentLibraryHeight;
            size: CommonAttachmentLibrarySize;
            url: CommonAttachmentLibraryUrl;
            meta: CommonAttachmentLibraryMeta;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachmentLibraries = payload.map(attachmentLibrary => CommonAttachmentLibrary.register(
            attachmentLibrary.id,
            attachmentLibrary.filename,
            attachmentLibrary.mimetype,
            attachmentLibrary.extension,
            attachmentLibrary.relativePathSegments,
            attachmentLibrary.width,
            attachmentLibrary.height,
            attachmentLibrary.size,
            attachmentLibrary.url,
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
