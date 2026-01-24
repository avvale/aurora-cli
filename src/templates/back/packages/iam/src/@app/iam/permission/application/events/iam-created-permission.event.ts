/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedPermissionEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        name: string;
        boundedContextId: string;
        roleIds: string[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
