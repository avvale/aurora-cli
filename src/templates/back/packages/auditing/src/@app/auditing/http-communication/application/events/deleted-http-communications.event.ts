import { DeletedHttpCommunicationEvent } from './deleted-http-communication.event';

export class DeletedHttpCommunicationsEvent
{
    constructor(
        public readonly httpCommunications: DeletedHttpCommunicationEvent[],
    ) {}
}