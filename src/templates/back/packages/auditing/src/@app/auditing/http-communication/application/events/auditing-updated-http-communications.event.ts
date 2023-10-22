import { AuditingUpdatedHttpCommunicationEvent } from './auditing-updated-http-communication.event';

export class AuditingUpdatedHttpCommunicationsEvent
{
    constructor(
        public readonly httpCommunications: AuditingUpdatedHttpCommunicationEvent[],
    ) {}
}
