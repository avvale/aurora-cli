/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedPermissionRoleEvent {
  constructor(
    public readonly event: {
      payload: {
        permissionId: string;
        roleId: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
