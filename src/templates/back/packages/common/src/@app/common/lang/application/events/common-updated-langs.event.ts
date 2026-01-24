import { CommonUpdatedLangEvent } from './common-updated-lang.event';

export class CommonUpdatedLangsEvent {
  constructor(public readonly langs: CommonUpdatedLangEvent[]) {}
}
