/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertHttpCommunicationCommand } from './upsert-http-communication.command';
import { UpsertHttpCommunicationService } from './upsert-http-communication.service';
import {
    HttpCommunicationId,
    HttpCommunicationTags,
    HttpCommunicationEvent,
    HttpCommunicationStatus,
    HttpCommunicationMethod,
    HttpCommunicationUrl,
    HttpCommunicationHttpRequest,
    HttpCommunicationHttpRequestRejected,
    HttpCommunicationHttpResponse,
    HttpCommunicationHttpResponseRejected,
    HttpCommunicationIsReprocessing,
    HttpCommunicationReprocessingHttpCommunicationId,
    HttpCommunicationCreatedAt,
    HttpCommunicationUpdatedAt,
    HttpCommunicationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertHttpCommunicationCommand)
export class UpsertHttpCommunicationCommandHandler implements ICommandHandler<UpsertHttpCommunicationCommand>
{
    constructor(
        private readonly upsertHttpCommunicationService: UpsertHttpCommunicationService,
    ) {}

    async execute(command: UpsertHttpCommunicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertHttpCommunicationService.main(
            {
                id: new HttpCommunicationId(command.payload.id),
                tags: new HttpCommunicationTags(command.payload.tags),
                event: new HttpCommunicationEvent(command.payload.event),
                status: new HttpCommunicationStatus(command.payload.status),
                method: new HttpCommunicationMethod(command.payload.method),
                url: new HttpCommunicationUrl(command.payload.url),
                httpRequest: new HttpCommunicationHttpRequest(command.payload.httpRequest),
                httpRequestRejected: new HttpCommunicationHttpRequestRejected(command.payload.httpRequestRejected),
                httpResponse: new HttpCommunicationHttpResponse(command.payload.httpResponse),
                httpResponseRejected: new HttpCommunicationHttpResponseRejected(command.payload.httpResponseRejected),
                isReprocessing: new HttpCommunicationIsReprocessing(command.payload.isReprocessing),
                reprocessingHttpCommunicationId: new HttpCommunicationReprocessingHttpCommunicationId(command.payload.reprocessingHttpCommunicationId),
            },
            command.cQMetadata,
        );
    }
}