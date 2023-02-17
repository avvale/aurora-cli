import { CreatedHttpCommunicationEvent } from './created-http-communication.event';

export class CreatedHttpCommunicationsEvent
{
    constructor(
        public readonly httpCommunications: CreatedHttpCommunicationEvent[],
    ) {}
}