import { AuditingCreatedSideEffectEvent } from './auditing-created-side-effect.event';

export class AuditingCreatedSideEffectsEvent
{
    constructor(
        public readonly sideEffects: AuditingCreatedSideEffectEvent[],
    ) {}
}
