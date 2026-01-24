/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  DataValueObject,
  UuidValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class IamPermissionRolePermissionId extends UuidValueObject {
  public readonly type: string = 'IamPermissionRolePermissionId';

  constructor(
    value: string,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'IamPermissionRolePermissionId',
          nullable: false,
          undefinable: false,
          length: 36,
        },
        validationRules,
      ),
      data,
    );
  }
}
