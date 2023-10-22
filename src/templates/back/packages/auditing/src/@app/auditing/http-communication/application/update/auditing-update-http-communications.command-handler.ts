/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingUpdateHttpCommunicationsCommand } from './auditing-update-http-communications.command';
import { AuditingUpdateHttpCommunicationsService } from './auditing-update-http-communications.service';
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

@CommandHandler(AuditingUpdateHttpCommunicationsCommand)
export class AuditingUpdateHttpCommunicationsCommandHandler implements ICommandHandler<AuditingUpdateHttpCommunicationsCommand>
{
    constructor(
        private readonly updateHttpCommunicationsService: AuditingUpdateHttpCommunicationsService,
    ) {}

    async execute(command: AuditingUpdateHttpCommunicationsCommand): Promise<void>
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
