/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatePermissionsRolesCommand {
  constructor(
    public readonly payload: {
      permissionId: string;
      roleId: string;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
