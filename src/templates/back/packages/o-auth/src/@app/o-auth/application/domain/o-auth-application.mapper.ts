import {
  OAuthApplication,
  OAuthApplicationResponse,
} from '@app/o-auth/application';
import {
  OAuthApplicationClientIds,
  OAuthApplicationCode,
  OAuthApplicationCreatedAt,
  OAuthApplicationDeletedAt,
  OAuthApplicationId,
  OAuthApplicationIsMaster,
  OAuthApplicationName,
  OAuthApplicationRowId,
  OAuthApplicationSecret,
  OAuthApplicationUpdatedAt,
} from '@app/o-auth/application/domain/value-objects';
import { OAuthClientMapper } from '@app/o-auth/client';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class OAuthApplicationMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param application
   */
  mapModelToAggregate(
    application: LiteralObject,
    cQMetadata?: CQMetadata,
  ): OAuthApplication {
    if (!application) return;

    return this.makeAggregate(application, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param applications
   */
  mapModelsToAggregates(
    applications: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): OAuthApplication[] {
    if (!Array.isArray(applications)) return;

    return applications.map((application) =>
      this.makeAggregate(application, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param application
   */
  mapAggregateToResponse(
    application: OAuthApplication,
  ): OAuthApplicationResponse {
    return this.makeResponse(application);
  }

  /**
   * Map array of aggregates to array responses
   * @param applications
   */
  mapAggregatesToResponses(
    applications: OAuthApplication[],
  ): OAuthApplicationResponse[] {
    if (!Array.isArray(applications)) return;

    return applications.map((application) => this.makeResponse(application));
  }

  private makeAggregate(
    application: LiteralObject,
    cQMetadata?: CQMetadata,
  ): OAuthApplication {
    return OAuthApplication.register(
      new OAuthApplicationId(application.id, { undefinable: true }),
      new OAuthApplicationRowId(application.rowId, { undefinable: true }),
      new OAuthApplicationCode(application.code, { undefinable: true }),
      new OAuthApplicationName(application.name, { undefinable: true }),
      new OAuthApplicationSecret(application.secret, {
        undefinable: true,
      }),
      new OAuthApplicationIsMaster(application.isMaster, {
        undefinable: true,
      }),
      new OAuthApplicationClientIds(application.clientIds, {
        undefinable: true,
      }),
      new OAuthApplicationCreatedAt(
        application.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new OAuthApplicationUpdatedAt(
        application.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new OAuthApplicationDeletedAt(
        application.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      this.options.eagerLoading
        ? new OAuthClientMapper({
            eagerLoading: true,
          }).mapModelsToAggregates(application.clients, cQMetadata)
        : undefined,
    );
  }

  private makeResponse(
    application: OAuthApplication,
  ): OAuthApplicationResponse {
    if (!application) return null;

    return new OAuthApplicationResponse(
      application.id.value,
      application.rowId.value,
      application.code.value,
      application.name.value,
      application.secret.value,
      application.isMaster.value,
      application.clientIds.value,
      application.createdAt.value,
      application.updatedAt.value,
      application.deletedAt.value,
      this.options.eagerLoading
        ? new OAuthClientMapper({
            eagerLoading: true,
          }).mapAggregatesToResponses(application.clients)
        : undefined,
    );
  }
}
