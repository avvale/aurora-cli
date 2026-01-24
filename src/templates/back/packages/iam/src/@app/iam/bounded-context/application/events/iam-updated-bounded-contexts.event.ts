/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamUpdatedBoundedContextEvent } from '@app/iam/bounded-context';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedBoundedContextsEvent {
  constructor(
    public readonly event: {
      payload: IamUpdatedBoundedContextEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
