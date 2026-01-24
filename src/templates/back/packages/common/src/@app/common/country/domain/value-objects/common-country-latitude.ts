import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryLatitude extends DecimalValueObject {
  public readonly type: string = 'CommonCountryLatitude';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryLatitude',
          nullable: true,
          undefinable: true,
          decimals: [16, 14],
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
