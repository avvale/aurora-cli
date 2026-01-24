import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryZoom extends SmallintValueObject {
  public readonly type: string = 'CommonCountryZoom';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryZoom',
          nullable: true,
          undefinable: true,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
