import { CommonAddAttachmentFamiliesContextEvent, CommonAttachmentFamily, CommonIAttachmentFamilyRepository } from '@app/common/attachment-family';
import {
    CommonAttachmentFamilyCreatedAt,
    CommonAttachmentFamilyDeletedAt,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyUpdatedAt,
    CommonAttachmentFamilyWidth,
} from '@app/common/attachment-family/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAttachmentFamiliesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentFamilyRepository,
    ) {}

    async main(
        attachmentFamilies: {
            id: CommonAttachmentFamilyId;
            resourceId: CommonAttachmentFamilyResourceId;
            name: CommonAttachmentFamilyName;
            width: CommonAttachmentFamilyWidth;
            height: CommonAttachmentFamilyHeight;
            fitType: CommonAttachmentFamilyFitType;
            quality: CommonAttachmentFamilyQuality;
            sizes: CommonAttachmentFamilySizes;
            format: CommonAttachmentFamilyFormat;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachmentFamilies = attachmentFamilies.map(attachmentFamily => CommonAttachmentFamily.register(
            attachmentFamily.id,
            attachmentFamily.resourceId,
            attachmentFamily.name,
            attachmentFamily.width,
            attachmentFamily.height,
            attachmentFamily.fitType,
            attachmentFamily.quality,
            attachmentFamily.sizes,
            attachmentFamily.format,
            new CommonAttachmentFamilyCreatedAt({ currentTimestamp: true }),
            new CommonAttachmentFamilyUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateAttachmentFamilies,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddAttachmentFamiliesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentFamiliesRegistered = this.publisher.mergeObjectContext(new CommonAddAttachmentFamiliesContextEvent(aggregateAttachmentFamilies));

        attachmentFamiliesRegistered.created(); // apply event to model events
        attachmentFamiliesRegistered.commit(); // commit all events of model
    }
}
