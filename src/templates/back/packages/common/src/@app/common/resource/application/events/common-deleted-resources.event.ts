import { CommonDeletedResourceEvent } from './common-deleted-resource.event';

export class CommonDeletedResourcesEvent {
  constructor(public readonly resources: CommonDeletedResourceEvent[]) {}
}
