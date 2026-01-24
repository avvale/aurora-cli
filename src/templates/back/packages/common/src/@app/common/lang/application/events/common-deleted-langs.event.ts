import { CommonDeletedLangEvent } from './common-deleted-lang.event';

export class CommonDeletedLangsEvent {
  constructor(public readonly langs: CommonDeletedLangEvent[]) {}
}
