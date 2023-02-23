/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHttpCommunicationCommand } from './create-http-communication.command';
import { CreateHttpCommunicationService } from './create-http-communication.service';
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

@CommandHandler(CreateHttpCommunicationCommand)
export class CreateHttpCommunicationCommandHandler implements ICommandHandler<CreateHttpCommunicationCommand>
{
    constructor(
        private readonly createHttpCommunicationService: CreateHttpCommunicationService,
    ) {}

    async execute(command: CreateHttpCommunicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createHttpCommunicationService.main(
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