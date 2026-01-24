import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserRememberToken extends StringValueObject {
  public readonly type: string = 'IamUserRememberToken';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamUserRememberToken',
          nullable: true,
          undefinable: true,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
