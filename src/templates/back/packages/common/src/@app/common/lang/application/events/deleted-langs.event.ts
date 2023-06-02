import { DeletedLangEvent } from './deleted-lang.event';

export class DeletedLangsEvent
{
    constructor(
        public readonly langs: DeletedLangEvent[],
    ) {}
}