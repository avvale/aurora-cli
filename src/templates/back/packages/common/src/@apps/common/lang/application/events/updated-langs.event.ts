import { UpdatedLangEvent } from './updated-lang.event';

export class UpdatedLangsEvent
{
    constructor(
        public readonly langs: UpdatedLangEvent[],
    ) {}
}