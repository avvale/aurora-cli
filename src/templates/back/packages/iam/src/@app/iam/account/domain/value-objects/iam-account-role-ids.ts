import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountRoleIds extends UuidArrayValueObject {
  public readonly type: string = 'IamAccountRoleIds';

  constructor(value: string | string[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamAccountRoleIds',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
