import { CreatedSideEffectEvent } from './created-side-effect.event';

export class CreatedSideEffectsEvent
{
    constructor(
        public readonly sideEffects: CreatedSideEffectEvent[],
    ) {}
}