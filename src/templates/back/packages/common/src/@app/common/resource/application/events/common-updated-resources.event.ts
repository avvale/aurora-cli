import { CommonUpdatedResourceEvent } from './common-updated-resource.event';

export class CommonUpdatedResourcesEvent {
  constructor(public readonly resources: CommonUpdatedResourceEvent[]) {}
}
