/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingUpdateHttpCommunicationByIdCommand } from './auditing-update-http-communication-by-id.command';
import { AuditingUpdateHttpCommunicationByIdService } from './auditing-update-http-communication-by-id.service';
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
