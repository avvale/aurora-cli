import {
  DataValueObject,
  PasswordValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class IamUserPassword extends PasswordValueObject {
  public readonly type: string = 'IamUserPassword';

  constructor(
    value: string,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'IamUserPassword',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
      data,
    );
  }
}
