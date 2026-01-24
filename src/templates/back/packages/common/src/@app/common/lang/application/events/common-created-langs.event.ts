import { CommonCreatedLangEvent } from './common-created-lang.event';

export class CommonCreatedLangsEvent {
  constructor(public readonly langs: CommonCreatedLangEvent[]) {}
}
