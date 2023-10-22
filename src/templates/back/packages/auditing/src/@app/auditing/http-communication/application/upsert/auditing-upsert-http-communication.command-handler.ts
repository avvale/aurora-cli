/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingUpsertHttpCommunicationCommand } from './auditing-upsert-http-communication.command';
import { AuditingUpsertHttpCommunicationService } from './auditing-upsert-http-communication.service';
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
