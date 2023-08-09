import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { CommonAttachmentFamily } from './common-attachment-family.aggregate';
import { CommonAttachmentFamilyResponse } from './common-attachment-family.response';
import {
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyWidth,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyCreatedAt,
    CommonAttachmentFamilyUpdatedAt,
    CommonAttachmentFamilyDeletedAt,
} from './value-objects';
import { CommonResourceMapper } from '@app/common/resource';

export class CommonAttachmentFamilyMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param attachmentFamily
     */
    mapModelToAggregate(attachmentFamily: LiteralObject, cQMetadata?: CQMetadata): CommonAttachmentFamily
    {
        if (!attachmentFamily) return;

        return this.makeAggregate(attachmentFamily, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param attachmentFamilies
     */
    mapModelsToAggregates(attachmentFamilies: LiteralObject[], cQMetadata?: CQMetadata): CommonAttachmentFamily[]
    {
        if (!Array.isArray(attachmentFamilies)) return;

        return attachmentFamilies.map(attachmentFamily => this.makeAggregate(attachmentFamily, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param attachmentFamily
     */
    mapAggregateToResponse(attachmentFamily: CommonAttachmentFamily): CommonAttachmentFamilyResponse
    {
        return this.makeResponse(attachmentFamily);
    }

    /**
     * Map array of aggregates to array responses
     * @param attachmentFamilies
     */
    mapAggregatesToResponses(attachmentFamilies: CommonAttachmentFamily[]): CommonAttachmentFamilyResponse[]
    {
        if (!Array.isArray(attachmentFamilies)) return;

        return attachmentFamilies.map(attachmentFamily => this.makeResponse(attachmentFamily));
    }

    private makeAggregate(attachmentFamily: LiteralObject, cQMetadata?: CQMetadata): CommonAttachmentFamily
    {
        return CommonAttachmentFamily.register(
            new CommonAttachmentFamilyId(attachmentFamily.id, { undefinable: true }),
            new CommonAttachmentFamilyResourceId(attachmentFamily.resourceId, { undefinable: true }),
            new CommonAttachmentFamilyName(attachmentFamily.name, { undefinable: true }),
            new CommonAttachmentFamilyWidth(attachmentFamily.width, { undefinable: true }),
            new CommonAttachmentFamilyHeight(attachmentFamily.height, { undefinable: true }),
            new CommonAttachmentFamilyFitType(attachmentFamily.fitType, { undefinable: true }),
            new CommonAttachmentFamilyQuality(attachmentFamily.quality, { undefinable: true }),
            new CommonAttachmentFamilySizes(attachmentFamily.sizes, { undefinable: true }),
            new CommonAttachmentFamilyFormat(attachmentFamily.format, { undefinable: true }),
            new CommonAttachmentFamilyCreatedAt(attachmentFamily.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAttachmentFamilyUpdatedAt(attachmentFamily.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAttachmentFamilyDeletedAt(attachmentFamily.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new CommonResourceMapper({ eagerLoading: true }).mapModelToAggregate(attachmentFamily.resource, cQMetadata) : undefined,
        );
    }

    private makeResponse(attachmentFamily: CommonAttachmentFamily): CommonAttachmentFamilyResponse
    {
        if (!attachmentFamily) return;

        return new CommonAttachmentFamilyResponse(
            attachmentFamily.id.value,
            attachmentFamily.resourceId.value,
            attachmentFamily.name.value,
            attachmentFamily.width.value,
            attachmentFamily.height.value,
            attachmentFamily.fitType.value,
            attachmentFamily.quality.value,
            attachmentFamily.sizes.value,
            attachmentFamily.format.value,
            attachmentFamily.createdAt.value,
            attachmentFamily.updatedAt.value,
            attachmentFamily.deletedAt.value,
            this.options.eagerLoading ? new CommonResourceMapper({ eagerLoading: true }).mapAggregateToResponse(attachmentFamily.resource) : undefined,
        );
    }
}
