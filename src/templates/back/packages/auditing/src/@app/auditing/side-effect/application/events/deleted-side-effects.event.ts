import { DeletedSideEffectEvent } from './deleted-side-effect.event';

export class DeletedSideEffectsEvent
{
    constructor(
        public readonly sideEffects: DeletedSideEffectEvent[],
    ) {}
}