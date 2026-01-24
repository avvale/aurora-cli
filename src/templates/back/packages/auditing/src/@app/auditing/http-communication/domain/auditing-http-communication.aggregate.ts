/* eslint-disable key-spacing */
import {
  AuditingCreatedHttpCommunicationEvent,
  AuditingDeletedHttpCommunicationEvent,
  AuditingUpdatedHttpCommunicationEvent,
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
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingHttpCommunication extends AggregateRoot {
  id: AuditingHttpCommunicationId;
  rowId: AuditingHttpCommunicationRowId;
  tags: AuditingHttpCommunicationTags;
  event: AuditingHttpCommunicationEvent;
  status: AuditingHttpCommunicationStatus;
  method: AuditingHttpCommunicationMethod;
  url: AuditingHttpCommunicationUrl;
  httpRequest: AuditingHttpCommunicationHttpRequest;
  httpRequestRejected: AuditingHttpCommunicationHttpRequestRejected;
  httpResponse: AuditingHttpCommunicationHttpResponse;
  httpResponseRejected: AuditingHttpCommunicationHttpResponseRejected;
  isReprocessing: AuditingHttpCommunicationIsReprocessing;
  reprocessingHttpCommunicationId: AuditingHttpCommunicationReprocessingHttpCommunicationId;
  createdAt: AuditingHttpCommunicationCreatedAt;
  updatedAt: AuditingHttpCommunicationUpdatedAt;
  deletedAt: AuditingHttpCommunicationDeletedAt;

  constructor(
    id: AuditingHttpCommunicationId,
    rowId: AuditingHttpCommunicationRowId,
    tags: AuditingHttpCommunicationTags,
    event: AuditingHttpCommunicationEvent,
    status: AuditingHttpCommunicationStatus,
    method: AuditingHttpCommunicationMethod,
    url: AuditingHttpCommunicationUrl,
    httpRequest: AuditingHttpCommunicationHttpRequest,
    httpRequestRejected: AuditingHttpCommunicationHttpRequestRejected,
    httpResponse: AuditingHttpCommunicationHttpResponse,
    httpResponseRejected: AuditingHttpCommunicationHttpResponseRejected,
    isReprocessing: AuditingHttpCommunicationIsReprocessing,
    reprocessingHttpCommunicationId: AuditingHttpCommunicationReprocessingHttpCommunicationId,
    createdAt: AuditingHttpCommunicationCreatedAt,
    updatedAt: AuditingHttpCommunicationUpdatedAt,
    deletedAt: AuditingHttpCommunicationDeletedAt,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.tags = tags;
    this.event = event;
    this.status = status;
    this.method = method;
    this.url = url;
    this.httpRequest = httpRequest;
    this.httpRequestRejected = httpRequestRejected;
    this.httpResponse = httpResponse;
    this.httpResponseRejected = httpResponseRejected;
    this.isReprocessing = isReprocessing;
    this.reprocessingHttpCommunicationId = reprocessingHttpCommunicationId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static register(
    id: AuditingHttpCommunicationId,
    rowId: AuditingHttpCommunicationRowId,
    tags: AuditingHttpCommunicationTags,
    event: AuditingHttpCommunicationEvent,
    status: AuditingHttpCommunicationStatus,
    method: AuditingHttpCommunicationMethod,
    url: AuditingHttpCommunicationUrl,
    httpRequest: AuditingHttpCommunicationHttpRequest,
    httpRequestRejected: AuditingHttpCommunicationHttpRequestRejected,
    httpResponse: AuditingHttpCommunicationHttpResponse,
    httpResponseRejected: AuditingHttpCommunicationHttpResponseRejected,
    isReprocessing: AuditingHttpCommunicationIsReprocessing,
    reprocessingHttpCommunicationId: AuditingHttpCommunicationReprocessingHttpCommunicationId,
    createdAt: AuditingHttpCommunicationCreatedAt,
    updatedAt: AuditingHttpCommunicationUpdatedAt,
    deletedAt: AuditingHttpCommunicationDeletedAt,
  ): AuditingHttpCommunication {
    return new AuditingHttpCommunication(
      id,
      rowId,
      tags,
      event,
      status,
      method,
      url,
      httpRequest,
      httpRequestRejected,
      httpResponse,
      httpResponseRejected,
      isReprocessing,
      reprocessingHttpCommunicationId,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  created(event: {
    payload: AuditingHttpCommunication;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new AuditingCreatedHttpCommunicationEvent({
        payload: {
          id: event.payload.id.value,
          tags: event.payload.tags?.value,
          event: event.payload.event.value,
          status: event.payload.status?.value,
          method: event.payload.method.value,
          url: event.payload.url.value,
          httpRequest: event.payload.httpRequest?.value,
          httpRequestRejected: event.payload.httpRequestRejected?.value,
          httpResponse: event.payload.httpResponse?.value,
          httpResponseRejected: event.payload.httpResponseRejected?.value,
          isReprocessing: event.payload.isReprocessing.value,
          reprocessingHttpCommunicationId:
            event.payload.reprocessingHttpCommunicationId?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: {
    payload: AuditingHttpCommunication;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new AuditingUpdatedHttpCommunicationEvent({
        payload: {
          id: event.payload.id?.value,
          tags: event.payload.tags?.value,
          event: event.payload.event?.value,
          status: event.payload.status?.value,
          method: event.payload.method?.value,
          url: event.payload.url?.value,
          httpRequest: event.payload.httpRequest?.value,
          httpRequestRejected: event.payload.httpRequestRejected?.value,
          httpResponse: event.payload.httpResponse?.value,
          httpResponseRejected: event.payload.httpResponseRejected?.value,
          isReprocessing: event.payload.isReprocessing?.value,
          reprocessingHttpCommunicationId:
            event.payload.reprocessingHttpCommunicationId?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: {
    payload: AuditingHttpCommunication;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new AuditingDeletedHttpCommunicationEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          tags: event.payload.tags?.value,
          event: event.payload.event.value,
          status: event.payload.status?.value,
          method: event.payload.method.value,
          url: event.payload.url.value,
          httpRequest: event.payload.httpRequest?.value,
          httpRequestRejected: event.payload.httpRequestRejected?.value,
          httpResponse: event.payload.httpResponse?.value,
          httpResponseRejected: event.payload.httpResponseRejected?.value,
          isReprocessing: event.payload.isReprocessing.value,
          reprocessingHttpCommunicationId:
            event.payload.reprocessingHttpCommunicationId?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      rowId: this.rowId.value,
      tags: this.tags?.value,
      event: this.event.value,
      status: this.status?.value,
      method: this.method.value,
      url: this.url.value,
      httpRequest: this.httpRequest?.value,
      httpRequestRejected: this.httpRequestRejected?.value,
      httpResponse: this.httpResponse?.value,
      httpResponseRejected: this.httpResponseRejected?.value,
      isReprocessing: this.isReprocessing.value,
      reprocessingHttpCommunicationId:
        this.reprocessingHttpCommunicationId?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      tags: this.tags?.value,
      event: this.event.value,
      status: this.status?.value,
      method: this.method.value,
      url: this.url.value,
      httpRequest: this.httpRequest?.value,
      httpRequestRejected: this.httpRequestRejected?.value,
      httpResponse: this.httpResponse?.value,
      httpResponseRejected: this.httpResponseRejected?.value,
      isReprocessing: this.isReprocessing.value,
      reprocessingHttpCommunicationId:
        this.reprocessingHttpCommunicationId?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }
}
