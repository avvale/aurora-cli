import { UpdatedSideEffectEvent } from './updated-side-effect.event';

export class UpdatedSideEffectsEvent
{
    constructor(
        public readonly sideEffects: UpdatedSideEffectEvent[],
    ) {}
}