/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamCreatedPermissionEvent } from '@app/iam/permission';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedPermissionsEvent {
  constructor(
    public readonly event: {
      payload: IamCreatedPermissionEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
