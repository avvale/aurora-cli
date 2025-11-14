import { AuditingUpdatedSideEffectEvent } from '@app/auditing/side-effect';
import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingUpdatedSideEffectsEvent {
    constructor(
        public readonly event: {
            payload: AuditingUpdatedSideEffectEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
