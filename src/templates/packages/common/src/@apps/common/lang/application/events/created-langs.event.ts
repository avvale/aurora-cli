import { CreatedLangEvent } from './created-lang.event';

export class CreatedLangsEvent
{
    constructor(
        public readonly langs: CreatedLangEvent[],
    ) {}
}