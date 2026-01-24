/* eslint-disable key-spacing */
import { AuditingCreateHttpCommunicationCommand } from '@app/auditing/http-communication';
import { AuditingCreateHttpCommunicationService } from '@app/auditing/http-communication/application/create/auditing-create-http-communication.service';
import {
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
  AuditingHttpCommunicationUrl,
} from '@app/auditing/http-communication/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AuditingCreateHttpCommunicationCommand)
export class AuditingCreateHttpCommunicationCommandHandler
  implements ICommandHandler<AuditingCreateHttpCommunicationCommand>
{
  constructor(
    private readonly createHttpCommunicationService: AuditingCreateHttpCommunicationService,
  ) {}

  async execute(
    command: AuditingCreateHttpCommunicationCommand,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createHttpCommunicationService.main(
      {
        id: new AuditingHttpCommunicationId(command.payload.id),
        tags: new AuditingHttpCommunicationTags(command.payload.tags),
        event: new AuditingHttpCommunicationEvent(command.payload.event),
        status: new AuditingHttpCommunicationStatus(command.payload.status),
        method: new AuditingHttpCommunicationMethod(command.payload.method),
        url: new AuditingHttpCommunicationUrl(command.payload.url),
        httpRequest: new AuditingHttpCommunicationHttpRequest(
          command.payload.httpRequest,
        ),
        httpRequestRejected: new AuditingHttpCommunicationHttpRequestRejected(
          command.payload.httpRequestRejected,
        ),
        httpResponse: new AuditingHttpCommunicationHttpResponse(
          command.payload.httpResponse,
        ),
        httpResponseRejected: new AuditingHttpCommunicationHttpResponseRejected(
          command.payload.httpResponseRejected,
        ),
        isReprocessing: new AuditingHttpCommunicationIsReprocessing(
          command.payload.isReprocessing,
        ),
        reprocessingHttpCommunicationId:
          new AuditingHttpCommunicationReprocessingHttpCommunicationId(
            command.payload.reprocessingHttpCommunicationId,
          ),
      },
      command.cQMetadata,
    );
  }
}
