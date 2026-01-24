/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamDeletedBoundedContextEvent } from '@app/iam/bounded-context';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedBoundedContextsEvent {
  constructor(
    public readonly event: {
      payload: IamDeletedBoundedContextEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
