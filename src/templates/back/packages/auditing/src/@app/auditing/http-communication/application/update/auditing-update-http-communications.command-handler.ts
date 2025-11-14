/* eslint-disable key-spacing */
import { AuditingUpdateHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { AuditingUpdateHttpCommunicationsService } from '@app/auditing/http-communication/application/update/auditing-update-http-communications.service';
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

@CommandHandler(AuditingUpdateHttpCommunicationsCommand)
export class AuditingUpdateHttpCommunicationsCommandHandler
    implements ICommandHandler<AuditingUpdateHttpCommunicationsCommand>
{
    constructor(
        private readonly updateHttpCommunicationsService: AuditingUpdateHttpCommunicationsService,
    ) {}

    async execute(
        command: AuditingUpdateHttpCommunicationsCommand,
    ): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateHttpCommunicationsService.main(
            {
                id: new AuditingHttpCommunicationId(command.payload.id, {
                    undefinable: true,
                }),
                tags: new AuditingHttpCommunicationTags(command.payload.tags),
                event: new AuditingHttpCommunicationEvent(
                    command.payload.event,
                    { undefinable: true },
                ),
                status: new AuditingHttpCommunicationStatus(
                    command.payload.status,
                ),
                method: new AuditingHttpCommunicationMethod(
                    command.payload.method,
                    { undefinable: true },
                ),
                url: new AuditingHttpCommunicationUrl(command.payload.url, {
                    undefinable: true,
                }),
                httpRequest: new AuditingHttpCommunicationHttpRequest(
                    command.payload.httpRequest,
                ),
                httpRequestRejected:
                    new AuditingHttpCommunicationHttpRequestRejected(
                        command.payload.httpRequestRejected,
                    ),
                httpResponse: new AuditingHttpCommunicationHttpResponse(
                    command.payload.httpResponse,
                ),
                httpResponseRejected:
                    new AuditingHttpCommunicationHttpResponseRejected(
                        command.payload.httpResponseRejected,
                    ),
                isReprocessing: new AuditingHttpCommunicationIsReprocessing(
                    command.payload.isReprocessing,
                    { undefinable: true },
                ),
                reprocessingHttpCommunicationId:
                    new AuditingHttpCommunicationReprocessingHttpCommunicationId(
                        command.payload.reprocessingHttpCommunicationId,
                    ),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
