import { AuditingUpdatedAndIncrementedHttpCommunicationEvent } from './auditing-updated-and-incremented-http-communication.event';

export class AuditingUpdatedAndIncrementedHttpCommunicationsEvent
{
    constructor(
        public readonly httpCommunications: AuditingUpdatedAndIncrementedHttpCommunicationEvent[],
    ) {}
}
