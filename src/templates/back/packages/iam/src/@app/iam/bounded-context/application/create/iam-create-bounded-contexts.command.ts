/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateBoundedContextsCommand {
  constructor(
    public readonly payload: {
      id: string;
      name: string;
      root: string;
      sort?: number;
      isActive: boolean;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
