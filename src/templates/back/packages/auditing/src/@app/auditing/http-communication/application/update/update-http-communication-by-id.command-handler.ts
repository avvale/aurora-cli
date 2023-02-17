/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHttpCommunicationByIdCommand } from './update-http-communication-by-id.command';
import { UpdateHttpCommunicationByIdService } from './update-http-communication-by-id.service';
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

@CommandHandler(UpdateHttpCommunicationByIdCommand)
export class UpdateHttpCommunicationByIdCommandHandler implements ICommandHandler<UpdateHttpCommunicationByIdCommand>
{
    constructor(
        private readonly updateHttpCommunicationByIdService: UpdateHttpCommunicationByIdService,
    ) {}

    async execute(command: UpdateHttpCommunicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateHttpCommunicationByIdService.main(
            {
                id: new HttpCommunicationId(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}