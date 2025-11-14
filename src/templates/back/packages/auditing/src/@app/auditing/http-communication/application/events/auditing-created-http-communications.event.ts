import { AuditingCreatedHttpCommunicationEvent } from '@app/auditing/http-communication';
import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingCreatedHttpCommunicationsEvent {
    constructor(
        public readonly event: {
            payload: AuditingCreatedHttpCommunicationEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
