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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateAttachmentFamiliesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentFamilyRepository,
    ) {}

    async main(
        payload: {
            id?: CommonAttachmentFamilyId;
            resourceId?: CommonAttachmentFamilyResourceId;
            name?: CommonAttachmentFamilyName;
            width?: CommonAttachmentFamilyWidth;
            height?: CommonAttachmentFamilyHeight;
            fitType?: CommonAttachmentFamilyFitType;
            quality?: CommonAttachmentFamilyQuality;
            sizes?: CommonAttachmentFamilySizes;
            format?: CommonAttachmentFamilyFormat;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachmentFamily = CommonAttachmentFamily.register(
            payload.id,
            payload.resourceId,
            payload.name,
            payload.width,
            payload.height,
            payload.fitType,
            payload.quality,
            payload.sizes,
            payload.format,
            null, // createdAt
            new CommonAttachmentFamilyUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            attachmentFamily,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const attachmentFamilies = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentFamiliesRegister = this.publisher.mergeObjectContext(
            new CommonAddAttachmentFamiliesContextEvent(attachmentFamilies),
        );

        attachmentFamiliesRegister.updated(); // apply event to model events
        attachmentFamiliesRegister.commit(); // commit all events of model
    }
}
