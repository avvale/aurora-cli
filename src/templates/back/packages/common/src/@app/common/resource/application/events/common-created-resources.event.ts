import { CommonCreatedResourceEvent } from './common-created-resource.event';

export class CommonCreatedResourcesEvent {
  constructor(public readonly resources: CommonCreatedResourceEvent[]) {}
}
