import { CommonAttachmentFamily, CommonIAttachmentFamilyRepository } from '@app/common/attachment-family';
import {
    CommonAttachmentFamilyCode,
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
export class CommonUpdateAttachmentFamilyByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentFamilyRepository,
    ) {}

    async main(
        payload: {
            id: CommonAttachmentFamilyId;
            resourceId?: CommonAttachmentFamilyResourceId;
            code?: CommonAttachmentFamilyCode;
            name?: CommonAttachmentFamilyName;
            width?: CommonAttachmentFamilyWidth;
            height?: CommonAttachmentFamilyHeight;
            fitType?: CommonAttachmentFamilyFitType;
            quality?: CommonAttachmentFamilyQuality;
            sizes?: CommonAttachmentFamilySizes;
            format?: CommonAttachmentFamilyFormat;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachmentFamily = CommonAttachmentFamily.register(
            payload.id,
            payload.resourceId,
            payload.code,
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

        // update by id
        await this.repository.updateById(
            attachmentFamily,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentFamilyRegister = this.publisher.mergeObjectContext(
            attachmentFamily,
        );

        attachmentFamilyRegister.updated(attachmentFamily); // apply event to model events
        attachmentFamilyRegister.commit(); // commit all events of model
    }
}
