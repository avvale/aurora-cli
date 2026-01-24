import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserName extends StringValueObject {
  public readonly type: string = 'IamUserName';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamUserName',
          nullable: false,
          undefinable: false,
          maxLength: 128,
        },
        validationRules,
      ),
    );
  }
}
