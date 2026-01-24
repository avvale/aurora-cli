import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryPrefix extends StringValueObject {
  public readonly type: string = 'CommonCountryPrefix';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryPrefix',
          nullable: true,
          undefinable: true,
          maxLength: 5,
        },
        validationRules,
      ),
    );
  }
}
