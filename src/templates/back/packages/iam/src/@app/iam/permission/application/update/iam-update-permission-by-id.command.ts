/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdatePermissionByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      name?: string;
      boundedContextId?: string;
      roleIds?: string[];
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
