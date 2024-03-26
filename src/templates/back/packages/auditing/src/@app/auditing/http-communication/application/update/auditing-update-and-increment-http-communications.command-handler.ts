/* eslint-disable key-spacing */
import { AuditingUpdateAndIncrementHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { AuditingUpdateAndIncrementHttpCommunicationsService } from '@app/auditing/http-communication/application/update/auditing-update-and-increment-http-communications.service';
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

@CommandHandler(AuditingUpdateAndIncrementHttpCommunicationsCommand)
export class AuditingUpdateAndIncrementHttpCommunicationsCommandHandler implements ICommandHandler<AuditingUpdateAndIncrementHttpCommunicationsCommand>
{
    constructor(
        private readonly updateHttpCommunicationsService: AuditingUpdateAndIncrementHttpCommunicationsService,
    ) {}

    async execute(command: AuditingUpdateAndIncrementHttpCommunicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateHttpCommunicationsService.main(
            {
                id: new AuditingHttpCommunicationId(command.payload.id, { undefinable: true }),
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
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
