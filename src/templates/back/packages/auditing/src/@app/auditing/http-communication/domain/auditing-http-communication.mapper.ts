import {
  AuditingHttpCommunication,
  AuditingHttpCommunicationResponse,
} from '@app/auditing/http-communication';
import {
  AuditingHttpCommunicationCreatedAt,
  AuditingHttpCommunicationDeletedAt,
  AuditingHttpCommunicationEvent,
  AuditingHttpCommunicationHttpRequest,
  AuditingHttpCommunicationHttpRequestRejected,
  AuditingHttpCommunicationHttpResponse,
  AuditingHttpCommunicationHttpResponseRejected,
  AuditingHttpCommunicationId,
  AuditingHttpCommunicationIsReprocessing,
  AuditingHttpCommunicationMethod,
  AuditingHttpCommunicationReprocessingHttpCommunicationId,
  AuditingHttpCommunicationRowId,
  AuditingHttpCommunicationStatus,
  AuditingHttpCommunicationTags,
  AuditingHttpCommunicationUpdatedAt,
  AuditingHttpCommunicationUrl,
} from '@app/auditing/http-communication/domain/value-objects';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class AuditingHttpCommunicationMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param httpCommunication
   */
  mapModelToAggregate(
    httpCommunication: LiteralObject,
    cQMetadata?: CQMetadata,
  ): AuditingHttpCommunication {
    if (!httpCommunication) return;

    return this.makeAggregate(httpCommunication, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param httpCommunications
   */
  mapModelsToAggregates(
    httpCommunications: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): AuditingHttpCommunication[] {
    if (!Array.isArray(httpCommunications)) return;

    return httpCommunications.map((httpCommunication) =>
      this.makeAggregate(httpCommunication, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param httpCommunication
   */
  mapAggregateToResponse(
    httpCommunication: AuditingHttpCommunication,
  ): AuditingHttpCommunicationResponse {
    return this.makeResponse(httpCommunication);
  }

  /**
   * Map array of aggregates to array responses
   * @param httpCommunications
   */
  mapAggregatesToResponses(
    httpCommunications: AuditingHttpCommunication[],
  ): AuditingHttpCommunicationResponse[] {
    if (!Array.isArray(httpCommunications)) return;

    return httpCommunications.map((httpCommunication) =>
      this.makeResponse(httpCommunication),
    );
  }

  private makeAggregate(
    httpCommunication: LiteralObject,
    cQMetadata?: CQMetadata,
  ): AuditingHttpCommunication {
    return AuditingHttpCommunication.register(
      new AuditingHttpCommunicationId(httpCommunication.id, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationRowId(httpCommunication.rowId, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationTags(httpCommunication.tags, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationEvent(httpCommunication.event, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationStatus(httpCommunication.status, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationMethod(httpCommunication.method, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationUrl(httpCommunication.url, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationHttpRequest(httpCommunication.httpRequest, {
        undefinable: true,
      }),
      new AuditingHttpCommunicationHttpRequestRejected(
        httpCommunication.httpRequestRejected,
        { undefinable: true },
      ),
      new AuditingHttpCommunicationHttpResponse(
        httpCommunication.httpResponse,
        { undefinable: true },
      ),
      new AuditingHttpCommunicationHttpResponseRejected(
        httpCommunication.httpResponseRejected,
        { undefinable: true },
      ),
      new AuditingHttpCommunicationIsReprocessing(
        httpCommunication.isReprocessing,
        { undefinable: true },
      ),
      new AuditingHttpCommunicationReprocessingHttpCommunicationId(
        httpCommunication.reprocessingHttpCommunicationId,
        { undefinable: true },
      ),
      new AuditingHttpCommunicationCreatedAt(
        httpCommunication.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new AuditingHttpCommunicationUpdatedAt(
        httpCommunication.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new AuditingHttpCommunicationDeletedAt(
        httpCommunication.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
    );
  }

  private makeResponse(
    httpCommunication: AuditingHttpCommunication,
  ): AuditingHttpCommunicationResponse {
    if (!httpCommunication) return null;

    return new AuditingHttpCommunicationResponse(
      httpCommunication.id.value,
      httpCommunication.rowId.value,
      httpCommunication.tags.value,
      httpCommunication.event.value,
      httpCommunication.status.value,
      httpCommunication.method.value,
      httpCommunication.url.value,
      httpCommunication.httpRequest.value,
      httpCommunication.httpRequestRejected.value,
      httpCommunication.httpResponse.value,
      httpCommunication.httpResponseRejected.value,
      httpCommunication.isReprocessing.value,
      httpCommunication.reprocessingHttpCommunicationId.value,
      httpCommunication.createdAt.value,
      httpCommunication.updatedAt.value,
      httpCommunication.deletedAt.value,
    );
  }
}
