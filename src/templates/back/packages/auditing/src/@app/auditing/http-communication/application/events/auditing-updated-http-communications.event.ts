import { AuditingUpdatedHttpCommunicationEvent } from '@app/auditing/http-communication';
import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingUpdatedHttpCommunicationsEvent {
  constructor(
    public readonly event: {
      payload: AuditingUpdatedHttpCommunicationEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
