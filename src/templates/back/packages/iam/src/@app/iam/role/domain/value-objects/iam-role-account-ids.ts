import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamRoleAccountIds extends UuidArrayValueObject {
  public readonly type: string = 'IamRoleAccountIds';

  constructor(value: string | string[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamRoleAccountIds',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
