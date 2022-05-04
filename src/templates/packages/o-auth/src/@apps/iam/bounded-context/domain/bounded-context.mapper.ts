import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { IamBoundedContext } from './bounded-context.aggregate';
import { BoundedContextResponse } from './bounded-context.response';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from './value-objects';
import { PermissionMapper } from '../../../../@apps/iam/permission/domain/permission.mapper';

export class BoundedContextMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param boundedContext
     */
    mapModelToAggregate(boundedContext: LiteralObject, cQMetadata?: CQMetadata): IamBoundedContext
    {
        if (!boundedContext) return;

        return this.makeAggregate(boundedContext, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param boundedContexts
     */
    mapModelsToAggregates(boundedContexts: LiteralObject[], cQMetadata?: CQMetadata): IamBoundedContext[]
    {
        if (!Array.isArray(boundedContexts)) return;

        return boundedContexts.map(boundedContext  => this.makeAggregate(boundedContext, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param boundedContext
     */
    mapAggregateToResponse(boundedContext: IamBoundedContext): BoundedContextResponse
    {
        return this.makeResponse(boundedContext);
    }

    /**
     * Map array of aggregates to array responses
     * @param boundedContexts
     */
    mapAggregatesToResponses(boundedContexts: IamBoundedContext[]): BoundedContextResponse[]
    {
        if (!Array.isArray(boundedContexts)) return;

        return boundedContexts.map(boundedContext => this.makeResponse(boundedContext));
    }

    private makeAggregate(boundedContext: LiteralObject, cQMetadata?: CQMetadata): IamBoundedContext
    {
        return IamBoundedContext.register(
            new BoundedContextId(boundedContext.id, { undefinable: true }),
            new BoundedContextName(boundedContext.name, { undefinable: true }),
            new BoundedContextRoot(boundedContext.root, { undefinable: true }),
            new BoundedContextSort(boundedContext.sort, { undefinable: true }),
            new BoundedContextIsActive(boundedContext.isActive, { undefinable: true }),
            new BoundedContextCreatedAt(boundedContext.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new BoundedContextUpdatedAt(boundedContext.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new BoundedContextDeletedAt(boundedContext.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: true }).mapModelsToAggregates(boundedContext.permissions) : undefined,
        );
    }

    private makeResponse(boundedContext: IamBoundedContext): BoundedContextResponse
    {
        if (!boundedContext) return;

        return new BoundedContextResponse(
            boundedContext.id.value,
            boundedContext.name.value,
            boundedContext.root.value,
            boundedContext.sort.value,
            boundedContext.isActive.value,
            boundedContext.createdAt.value,
            boundedContext.updatedAt.value,
            boundedContext.deletedAt.value,
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: true }).mapAggregatesToResponses(boundedContext.permissions) : undefined,
        );
    }
}