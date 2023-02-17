import { UpdatedHttpCommunicationEvent } from './updated-http-communication.event';

export class UpdatedHttpCommunicationsEvent
{
    constructor(
        public readonly httpCommunications: UpdatedHttpCommunicationEvent[],
    ) {}
}