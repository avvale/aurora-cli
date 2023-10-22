import { AuditingDeletedHttpCommunicationEvent } from './auditing-deleted-http-communication.event';

export class AuditingDeletedHttpCommunicationsEvent
{
    constructor(
        public readonly httpCommunications: AuditingDeletedHttpCommunicationEvent[],
    ) {}
}
