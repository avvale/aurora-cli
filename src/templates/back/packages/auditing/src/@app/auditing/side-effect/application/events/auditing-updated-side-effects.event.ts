import { AuditingUpdatedSideEffectEvent } from './auditing-updated-side-effect.event';

export class AuditingUpdatedSideEffectsEvent
{
    constructor(
        public readonly sideEffects: AuditingUpdatedSideEffectEvent[],
    ) {}
}
