import { AuditingDeletedHttpCommunicationEvent } from '@app/auditing/http-communication';
import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingDeletedHttpCommunicationsEvent {
  constructor(
    public readonly event: {
      payload: AuditingDeletedHttpCommunicationEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
