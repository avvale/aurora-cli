/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHttpCommunicationsCommand } from './update-http-communications.command';
import { UpdateHttpCommunicationsService } from './update-http-communications.service';
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

@CommandHandler(UpdateHttpCommunicationsCommand)
export class UpdateHttpCommunicationsCommandHandler implements ICommandHandler<UpdateHttpCommunicationsCommand>
{
    constructor(
        private readonly updateHttpCommunicationsService: UpdateHttpCommunicationsService,
    ) {}

    async execute(command: UpdateHttpCommunicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateHttpCommunicationsService.main(
            {
                id: new HttpCommunicationId(command.payload.id, { undefinable: true }),
                code: new HttpCommunicationCode(command.payload.code),
                event: new HttpCommunicationEvent(command.payload.event, { undefinable: true }),
                status: new HttpCommunicationStatus(command.payload.status),
                method: new HttpCommunicationMethod(command.payload.method, { undefinable: true }),
                url: new HttpCommunicationUrl(command.payload.url, { undefinable: true }),
                httpRequest: new HttpCommunicationHttpRequest(command.payload.httpRequest),
                httpRequestRejected: new HttpCommunicationHttpRequestRejected(command.payload.httpRequestRejected),
                httpResponse: new HttpCommunicationHttpResponse(command.payload.httpResponse),
                httpResponseRejected: new HttpCommunicationHttpResponseRejected(command.payload.httpResponseRejected),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}