/* eslint-disable key-spacing */
import { AuditingUpdateHttpCommunicationByIdCommand } from '@app/auditing/http-communication';
import { AuditingUpdateHttpCommunicationByIdService } from '@app/auditing/http-communication/application/update/auditing-update-http-communication-by-id.service';
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

@CommandHandler(AuditingUpdateHttpCommunicationByIdCommand)
export class AuditingUpdateHttpCommunicationByIdCommandHandler implements ICommandHandler<AuditingUpdateHttpCommunicationByIdCommand>
{
    constructor(
        private readonly updateHttpCommunicationByIdService: AuditingUpdateHttpCommunicationByIdService,
    ) {}

    async execute(command: AuditingUpdateHttpCommunicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateHttpCommunicationByIdService.main(
            {
                id: new AuditingHttpCommunicationId(command.payload.id),
                tags: new AuditingHttpCommunicationTags(command.payload.tags),
                event: new AuditingHttpCommunicationEvent(command.payload.event, { undefinable: true }),
                status: new AuditingHttpCommunicationStatus(command.payload.status),
                method: new AuditingHttpCommunicationMethod(command.payload.method, { undefinable: true }),
                url: new AuditingHttpCommunicationUrl(command.payload.url, { undefinable: true }),
                httpRequest: new AuditingHttpCommunicationHttpRequest(command.payload.httpRequest),
                httpRequestRejected: new AuditingHttpCommunicationHttpRequestRejected(command.payload.httpRequestRejected),
                httpResponse: new AuditingHttpCommunicationHttpResponse(command.payload.httpResponse),
                httpResponseRejected: new AuditingHttpCommunicationHttpResponseRejected(command.payload.httpResponseRejected),
                isReprocessing: new AuditingHttpCommunicationIsReprocessing(command.payload.isReprocessing, { undefinable: true }),
                reprocessingHttpCommunicationId: new AuditingHttpCommunicationReprocessingHttpCommunicationId(command.payload.reprocessingHttpCommunicationId),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
