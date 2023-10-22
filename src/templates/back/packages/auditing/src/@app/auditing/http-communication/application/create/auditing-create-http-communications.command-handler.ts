/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingCreateHttpCommunicationsCommand } from './auditing-create-http-communications.command';
import { AuditingCreateHttpCommunicationsService } from './auditing-create-http-communications.service';
import {
    AuditingHttpCommunicationId,
    AuditingHttpCommunicationTags,
    AuditingHttpCommunicationEvent,
    AuditingHttpCommunicationStatus,
    AuditingHttpCommunicationMethod,
    AuditingHttpCommunicationUrl,
    AuditingHttpCommunicationHttpRequest,
    AuditingHttpCommunicationHttpRequestRejected,
    AuditingHttpCommunicationHttpResponse,
    AuditingHttpCommunicationHttpResponseRejected,
    AuditingHttpCommunicationIsReprocessing,
    AuditingHttpCommunicationReprocessingHttpCommunicationId,
    AuditingHttpCommunicationCreatedAt,
    AuditingHttpCommunicationUpdatedAt,
    AuditingHttpCommunicationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AuditingCreateHttpCommunicationsCommand)
export class AuditingCreateHttpCommunicationsCommandHandler implements ICommandHandler<AuditingCreateHttpCommunicationsCommand>
{
    constructor(
        private readonly createHttpCommunicationsService: AuditingCreateHttpCommunicationsService,
    ) {}

    async execute(command: AuditingCreateHttpCommunicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createHttpCommunicationsService.main(
            command.payload
                .map(httpCommunication =>
                {
                    return {
                        id: new AuditingHttpCommunicationId(httpCommunication.id),
                        tags: new AuditingHttpCommunicationTags(httpCommunication.tags),
                        event: new AuditingHttpCommunicationEvent(httpCommunication.event),
                        status: new AuditingHttpCommunicationStatus(httpCommunication.status),
                        method: new AuditingHttpCommunicationMethod(httpCommunication.method),
                        url: new AuditingHttpCommunicationUrl(httpCommunication.url),
                        httpRequest: new AuditingHttpCommunicationHttpRequest(httpCommunication.httpRequest),
                        httpRequestRejected: new AuditingHttpCommunicationHttpRequestRejected(httpCommunication.httpRequestRejected),
                        httpResponse: new AuditingHttpCommunicationHttpResponse(httpCommunication.httpResponse),
                        httpResponseRejected: new AuditingHttpCommunicationHttpResponseRejected(httpCommunication.httpResponseRejected),
                        isReprocessing: new AuditingHttpCommunicationIsReprocessing(httpCommunication.isReprocessing),
                        reprocessingHttpCommunicationId: new AuditingHttpCommunicationReprocessingHttpCommunicationId(httpCommunication.reprocessingHttpCommunicationId),
                    };
                }),
            command.cQMetadata,
        );
    }
}
