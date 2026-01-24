import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamRolePermissionIds extends UuidArrayValueObject {
  public readonly type: string = 'IamRolePermissionIds';

  constructor(value: string | string[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamRolePermissionIds',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
