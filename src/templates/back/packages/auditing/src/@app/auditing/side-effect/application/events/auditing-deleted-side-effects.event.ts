import { AuditingDeletedSideEffectEvent } from '@app/auditing/side-effect';
import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingDeletedSideEffectsEvent {
    constructor(
        public readonly event: {
            payload: AuditingDeletedSideEffectEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
