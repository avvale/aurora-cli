import {
  AuditingHttpCommunication,
  AuditingIHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import {
  AuditingHttpCommunicationCreatedAt,
  AuditingHttpCommunicationEvent,
  AuditingHttpCommunicationHttpRequest,
  AuditingHttpCommunicationHttpRequestRejected,
  AuditingHttpCommunicationHttpResponse,
  AuditingHttpCommunicationHttpResponseRejected,
  AuditingHttpCommunicationId,
  AuditingHttpCommunicationIsReprocessing,
  AuditingHttpCommunicationMethod,
  AuditingHttpCommunicationReprocessingHttpCommunicationId,
  AuditingHttpCommunicationStatus,
  AuditingHttpCommunicationTags,
  AuditingHttpCommunicationUpdatedAt,
  AuditingHttpCommunicationUrl,
} from '@app/auditing/http-communication/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingCreateHttpCommunicationService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: AuditingIHttpCommunicationRepository,
  ) {}

  async main(
    payload: {
      id: AuditingHttpCommunicationId;
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
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const httpCommunication = AuditingHttpCommunication.register(
      payload.id,
      undefined, // rowId
      payload.tags,
      payload.event,
      payload.status,
      payload.method,
      payload.url,
      payload.httpRequest,
      payload.httpRequestRejected,
      payload.httpResponse,
      payload.httpResponseRejected,
      payload.isReprocessing,
      payload.reprocessingHttpCommunicationId,
      new AuditingHttpCommunicationCreatedAt({ currentTimestamp: true }),
      new AuditingHttpCommunicationUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.create(httpCommunication, {
      createOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const httpCommunicationRegister =
      this.publisher.mergeObjectContext(httpCommunication);

    httpCommunicationRegister.created({
      payload: httpCommunication,
      cQMetadata,
    }); // apply event to model events
    httpCommunicationRegister.commit(); // commit all events of model
  }
}
