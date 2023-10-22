import { AuditingCreatedHttpCommunicationEvent } from './auditing-created-http-communication.event';

export class AuditingCreatedHttpCommunicationsEvent
{
    constructor(
        public readonly httpCommunications: AuditingCreatedHttpCommunicationEvent[],
    ) {}
}
