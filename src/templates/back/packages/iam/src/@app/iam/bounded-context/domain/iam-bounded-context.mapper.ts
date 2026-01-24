/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContext,
  IamBoundedContextResponse,
} from '@app/iam/bounded-context';
import {
  IamBoundedContextCreatedAt,
  IamBoundedContextDeletedAt,
  IamBoundedContextId,
  IamBoundedContextIsActive,
  IamBoundedContextName,
  IamBoundedContextRoot,
  IamBoundedContextRowId,
  IamBoundedContextSort,
  IamBoundedContextUpdatedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { IamPermissionMapper } from '@app/iam/permission';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class IamBoundedContextMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param boundedContext
   */
  mapModelToAggregate(
    boundedContext: LiteralObject,
    cQMetadata?: CQMetadata,
  ): IamBoundedContext {
    if (!boundedContext) return;

    return this.makeAggregate(boundedContext, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param boundedContexts
   */
  mapModelsToAggregates(
    boundedContexts: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): IamBoundedContext[] {
    if (!Array.isArray(boundedContexts)) return;

    return boundedContexts.map((boundedContext) =>
      this.makeAggregate(boundedContext, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param boundedContext
   */
  mapAggregateToResponse(
    boundedContext: IamBoundedContext,
  ): IamBoundedContextResponse {
    return this.makeResponse(boundedContext);
  }

  /**
   * Map array of aggregates to array responses
   * @param boundedContexts
   */
  mapAggregatesToResponses(
    boundedContexts: IamBoundedContext[],
  ): IamBoundedContextResponse[] {
    if (!Array.isArray(boundedContexts)) return;

    return boundedContexts.map((boundedContext) =>
      this.makeResponse(boundedContext),
    );
  }

  private makeAggregate(
    boundedContext: LiteralObject,
    cQMetadata?: CQMetadata,
  ): IamBoundedContext {
    return IamBoundedContext.register(
      new IamBoundedContextId(boundedContext.id, { undefinable: true }),
      new IamBoundedContextRowId(boundedContext.rowId, {
        undefinable: true,
      }),
      new IamBoundedContextName(boundedContext.name, {
        undefinable: true,
      }),
      new IamBoundedContextRoot(boundedContext.root, {
        undefinable: true,
      }),
      new IamBoundedContextSort(boundedContext.sort, {
        undefinable: true,
      }),
      new IamBoundedContextIsActive(boundedContext.isActive, {
        undefinable: true,
      }),
      new IamBoundedContextCreatedAt(
        boundedContext.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new IamBoundedContextUpdatedAt(
        boundedContext.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new IamBoundedContextDeletedAt(
        boundedContext.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      this.options.eagerLoading
        ? new IamPermissionMapper({
            eagerLoading: true,
          }).mapModelsToAggregates(boundedContext.permissions, cQMetadata)
        : undefined,
    );
  }

  private makeResponse(
    boundedContext: IamBoundedContext,
  ): IamBoundedContextResponse {
    if (!boundedContext) return null;

    return new IamBoundedContextResponse(
      boundedContext.id.value,
      boundedContext.rowId.value,
      boundedContext.name.value,
      boundedContext.root.value,
      boundedContext.sort.value,
      boundedContext.isActive.value,
      boundedContext.createdAt.value,
      boundedContext.updatedAt.value,
      boundedContext.deletedAt.value,
      this.options.eagerLoading
        ? new IamPermissionMapper({
            eagerLoading: true,
          }).mapAggregatesToResponses(boundedContext.permissions)
        : undefined,
    );
  }
}
