import { AuditingCreatedSideEffectEvent } from '@app/auditing/side-effect';
import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingCreatedSideEffectsEvent {
  constructor(
    public readonly event: {
      payload: AuditingCreatedSideEffectEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
