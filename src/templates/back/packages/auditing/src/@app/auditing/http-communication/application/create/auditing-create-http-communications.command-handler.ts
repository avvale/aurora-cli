/* eslint-disable key-spacing */
import { AuditingCreateHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { AuditingCreateHttpCommunicationsService } from '@app/auditing/http-communication/application/create/auditing-create-http-communications.service';
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

@CommandHandler(AuditingCreateHttpCommunicationsCommand)
export class AuditingCreateHttpCommunicationsCommandHandler
    implements ICommandHandler<AuditingCreateHttpCommunicationsCommand>
{
    constructor(
        private readonly createHttpCommunicationsService: AuditingCreateHttpCommunicationsService,
    ) {}

    async execute(
        command: AuditingCreateHttpCommunicationsCommand,
    ): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createHttpCommunicationsService.main(
            command.payload.map((httpCommunication) => {
                return {
                    id: new AuditingHttpCommunicationId(httpCommunication.id),
                    tags: new AuditingHttpCommunicationTags(
                        httpCommunication.tags,
                    ),
                    event: new AuditingHttpCommunicationEvent(
                        httpCommunication.event,
                    ),
                    status: new AuditingHttpCommunicationStatus(
                        httpCommunication.status,
                    ),
                    method: new AuditingHttpCommunicationMethod(
                        httpCommunication.method,
                    ),
                    url: new AuditingHttpCommunicationUrl(
                        httpCommunication.url,
                    ),
                    httpRequest: new AuditingHttpCommunicationHttpRequest(
                        httpCommunication.httpRequest,
                    ),
                    httpRequestRejected:
                        new AuditingHttpCommunicationHttpRequestRejected(
                            httpCommunication.httpRequestRejected,
                        ),
                    httpResponse: new AuditingHttpCommunicationHttpResponse(
                        httpCommunication.httpResponse,
                    ),
                    httpResponseRejected:
                        new AuditingHttpCommunicationHttpResponseRejected(
                            httpCommunication.httpResponseRejected,
                        ),
                    isReprocessing: new AuditingHttpCommunicationIsReprocessing(
                        httpCommunication.isReprocessing,
                    ),
                    reprocessingHttpCommunicationId:
                        new AuditingHttpCommunicationReprocessingHttpCommunicationId(
                            httpCommunication.reprocessingHttpCommunicationId,
                        ),
                };
            }),
            command.cQMetadata,
        );
    }
}
