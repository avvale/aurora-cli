/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHttpCommunicationsCommand } from './create-http-communications.command';
import { CreateHttpCommunicationsService } from './create-http-communications.service';
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

@CommandHandler(CreateHttpCommunicationsCommand)
export class CreateHttpCommunicationsCommandHandler implements ICommandHandler<CreateHttpCommunicationsCommand>
{
    constructor(
        private readonly createHttpCommunicationsService: CreateHttpCommunicationsService,
    ) {}

    async execute(command: CreateHttpCommunicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createHttpCommunicationsService.main(
            command.payload
                .map(httpCommunication =>
                {
                    return {
                        id: new HttpCommunicationId(httpCommunication.id),
                        tags: new HttpCommunicationTags(httpCommunication.tags),
                        event: new HttpCommunicationEvent(httpCommunication.event),
                        status: new HttpCommunicationStatus(httpCommunication.status),
                        method: new HttpCommunicationMethod(httpCommunication.method),
                        url: new HttpCommunicationUrl(httpCommunication.url),
                        httpRequest: new HttpCommunicationHttpRequest(httpCommunication.httpRequest),
                        httpRequestRejected: new HttpCommunicationHttpRequestRejected(httpCommunication.httpRequestRejected),
                        httpResponse: new HttpCommunicationHttpResponse(httpCommunication.httpResponse),
                        httpResponseRejected: new HttpCommunicationHttpResponseRejected(httpCommunication.httpResponseRejected),
                        isReprocessing: new HttpCommunicationIsReprocessing(httpCommunication.isReprocessing),
                        reprocessingHttpCommunicationId: new HttpCommunicationReprocessingHttpCommunicationId(httpCommunication.reprocessingHttpCommunicationId),
                    };
                }),
            command.cQMetadata,
        );
    }
}