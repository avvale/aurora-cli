import { AuditingUpdatedAndIncrementedSideEffectEvent } from './auditing-updated-and-incremented-side-effect.event';

export class AuditingUpdatedAndIncrementedSideEffectsEvent
{
    constructor(
        public readonly sideEffects: AuditingUpdatedAndIncrementedSideEffectEvent[],
    ) {}
}
