import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryImage extends StringValueObject {
  public readonly type: string = 'CommonCountryImage';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryImage',
          nullable: true,
          undefinable: true,
          maxLength: 1022,
        },
        validationRules,
      ),
    );
  }
}
