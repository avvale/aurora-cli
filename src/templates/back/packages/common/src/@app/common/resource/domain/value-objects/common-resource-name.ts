import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonResourceName extends StringValueObject {
  public readonly type: string = 'CommonResourceName';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonResourceName',
          nullable: false,
          undefinable: false,
          maxLength: 127,
        },
        validationRules,
      ),
    );
  }
}
