/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonCreatedResourceEvent } from '@app/common/resource';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedResourcesEvent {
  constructor(
    public readonly event: {
      payload: CommonCreatedResourceEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
