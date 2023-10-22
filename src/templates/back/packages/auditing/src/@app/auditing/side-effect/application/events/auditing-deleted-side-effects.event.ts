import { AuditingDeletedSideEffectEvent } from './auditing-deleted-side-effect.event';

export class AuditingDeletedSideEffectsEvent
{
    constructor(
        public readonly sideEffects: AuditingDeletedSideEffectEvent[],
    ) {}
}
