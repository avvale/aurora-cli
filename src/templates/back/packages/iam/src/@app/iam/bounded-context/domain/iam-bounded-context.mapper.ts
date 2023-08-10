import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { IamBoundedContext } from './iam-bounded-context.aggregate';
import { IamBoundedContextResponse } from './iam-bounded-context.response';
import {
    IamBoundedContextId,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextIsActive,
    IamBoundedContextCreatedAt,
    IamBoundedContextUpdatedAt,
    IamBoundedContextDeletedAt,
} from './value-objects';
import { IamPermissionMapper } from '@app/iam/permission';

export class IamBoundedContextMapper implements IMapper
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

        return boundedContexts.map(boundedContext => this.makeAggregate(boundedContext, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param boundedContext
     */
    mapAggregateToResponse(boundedContext: IamBoundedContext): IamBoundedContextResponse
    {
        return this.makeResponse(boundedContext);
    }

    /**
     * Map array of aggregates to array responses
     * @param boundedContexts
     */
    mapAggregatesToResponses(boundedContexts: IamBoundedContext[]): IamBoundedContextResponse[]
    {
        if (!Array.isArray(boundedContexts)) return;

        return boundedContexts.map(boundedContext => this.makeResponse(boundedContext));
    }

    private makeAggregate(boundedContext: LiteralObject, cQMetadata?: CQMetadata): IamBoundedContext
    {
        return IamBoundedContext.register(
            new IamBoundedContextId(boundedContext.id, { undefinable: true }),
            new IamBoundedContextName(boundedContext.name, { undefinable: true }),
            new IamBoundedContextRoot(boundedContext.root, { undefinable: true }),
            new IamBoundedContextSort(boundedContext.sort, { undefinable: true }),
            new IamBoundedContextIsActive(boundedContext.isActive, { undefinable: true }),
            new IamBoundedContextCreatedAt(boundedContext.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamBoundedContextUpdatedAt(boundedContext.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new IamBoundedContextDeletedAt(boundedContext.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new IamPermissionMapper({ eagerLoading: true }).mapModelsToAggregates(boundedContext.permissions, cQMetadata) : undefined,
        );
    }

    private makeResponse(boundedContext: IamBoundedContext): IamBoundedContextResponse
    {
        if (!boundedContext) return;

        return new IamBoundedContextResponse(
            boundedContext.id.value,
            boundedContext.name.value,
            boundedContext.root.value,
            boundedContext.sort.value,
            boundedContext.isActive.value,
            boundedContext.createdAt.value,
            boundedContext.updatedAt.value,
            boundedContext.deletedAt.value,
            this.options.eagerLoading ? new IamPermissionMapper({ eagerLoading: true }).mapAggregatesToResponses(boundedContext.permissions) : undefined,
        );
    }
}
