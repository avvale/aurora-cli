/* eslint-disable key-spacing */
import { AuditingUpsertHttpCommunicationCommand } from '@app/auditing/http-communication';
import { AuditingUpsertHttpCommunicationService } from '@app/auditing/http-communication/application/upsert/auditing-upsert-http-communication.service';
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

@CommandHandler(AuditingUpsertHttpCommunicationCommand)
export class AuditingUpsertHttpCommunicationCommandHandler implements ICommandHandler<AuditingUpsertHttpCommunicationCommand>
{
    constructor(
        private readonly upsertHttpCommunicationService: AuditingUpsertHttpCommunicationService,
    ) {}

    async execute(command: AuditingUpsertHttpCommunicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertHttpCommunicationService.main(
            {
                id: new AuditingHttpCommunicationId(command.payload.id),
                tags: new AuditingHttpCommunicationTags(command.payload.tags),
                event: new AuditingHttpCommunicationEvent(command.payload.event),
                status: new AuditingHttpCommunicationStatus(command.payload.status),
                method: new AuditingHttpCommunicationMethod(command.payload.method),
                url: new AuditingHttpCommunicationUrl(command.payload.url),
                httpRequest: new AuditingHttpCommunicationHttpRequest(command.payload.httpRequest),
                httpRequestRejected: new AuditingHttpCommunicationHttpRequestRejected(command.payload.httpRequestRejected),
                httpResponse: new AuditingHttpCommunicationHttpResponse(command.payload.httpResponse),
                httpResponseRejected: new AuditingHttpCommunicationHttpResponseRejected(command.payload.httpResponseRejected),
                isReprocessing: new AuditingHttpCommunicationIsReprocessing(command.payload.isReprocessing),
                reprocessingHttpCommunicationId: new AuditingHttpCommunicationReprocessingHttpCommunicationId(command.payload.reprocessingHttpCommunicationId),
            },
            command.cQMetadata,
        );
    }
}
