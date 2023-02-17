/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHttpCommunicationsCommand } from './create-http-communications.command';
import { CreateHttpCommunicationsService } from './create-http-communications.service';
import {
    HttpCommunicationId,
    HttpCommunicationCode,
    HttpCommunicationEvent,
    HttpCommunicationStatus,
    HttpCommunicationMethod,
    HttpCommunicationUrl,
    HttpCommunicationHttpRequest,
    HttpCommunicationHttpRequestRejected,
    HttpCommunicationHttpResponse,
    HttpCommunicationHttpResponseRejected,
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
                        code: new HttpCommunicationCode(httpCommunication.code),
                        event: new HttpCommunicationEvent(httpCommunication.event),
                        status: new HttpCommunicationStatus(httpCommunication.status),
                        method: new HttpCommunicationMethod(httpCommunication.method),
                        url: new HttpCommunicationUrl(httpCommunication.url),
                        httpRequest: new HttpCommunicationHttpRequest(httpCommunication.httpRequest),
                        httpRequestRejected: new HttpCommunicationHttpRequestRejected(httpCommunication.httpRequestRejected),
                        httpResponse: new HttpCommunicationHttpResponse(httpCommunication.httpResponse),
                        httpResponseRejected: new HttpCommunicationHttpResponseRejected(httpCommunication.httpResponseRejected),
                    };
                }),
            command.cQMetadata,
        );
    }
}