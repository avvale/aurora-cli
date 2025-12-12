import { CommonResource, CommonResourceResponse } from '@app/common/resource';
import {
    CommonResourceCode,
    CommonResourceCreatedAt,
    CommonResourceDeletedAt,
    CommonResourceHasAttachments,
    CommonResourceId,
    CommonResourceIsActive,
    CommonResourceName,
    CommonResourceUpdatedAt,
} from '@app/common/resource/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class CommonResourceMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param resource
     */
    mapModelToAggregate(resource: LiteralObject, cQMetadata?: CQMetadata): CommonResource
    {
        if (!resource) return;

        return this.makeAggregate(resource, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param resources
     */
    mapModelsToAggregates(resources: LiteralObject[], cQMetadata?: CQMetadata): CommonResource[]
    {
        if (!Array.isArray(resources)) return;

        return resources.map(resource => this.makeAggregate(resource, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param resource
     */
    mapAggregateToResponse(resource: CommonResource): CommonResourceResponse
    {
        return this.makeResponse(resource);
    }

    /**
     * Map array of aggregates to array responses
     * @param resources
     */
    mapAggregatesToResponses(resources: CommonResource[]): CommonResourceResponse[]
    {
        if (!Array.isArray(resources)) return;

        return resources.map(resource => this.makeResponse(resource));
    }

    private makeAggregate(resource: LiteralObject, cQMetadata?: CQMetadata): CommonResource
    {
        return CommonResource.register(
            new CommonResourceId(resource.id, { undefinable: true }),
            new CommonResourceCode(resource.code, { undefinable: true }),
            new CommonResourceName(resource.name, { undefinable: true }),
            new CommonResourceIsActive(resource.isActive, { undefinable: true }),
            new CommonResourceHasAttachments(resource.hasAttachments, { undefinable: true }),
            new CommonResourceCreatedAt(resource.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonResourceUpdatedAt(resource.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonResourceDeletedAt(resource.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(resource: CommonResource): CommonResourceResponse
    {
        if (!resource) return null;

        return new CommonResourceResponse(
            resource.id.value,
            resource.code.value,
            resource.name.value,
            resource.isActive.value,
            resource.hasAttachments.value,
            resource.createdAt.value,
            resource.updatedAt.value,
            resource.deletedAt.value,
        );
    }
}
