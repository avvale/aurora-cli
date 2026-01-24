import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserAvatar extends StringValueObject {
  public readonly type: string = 'IamUserAvatar';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamUserAvatar',
          nullable: true,
          undefinable: true,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
