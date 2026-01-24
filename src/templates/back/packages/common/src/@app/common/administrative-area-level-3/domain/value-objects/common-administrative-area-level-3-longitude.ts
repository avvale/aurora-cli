import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3Longitude extends DecimalValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel3Longitude';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel3Longitude',
          nullable: true,
          undefinable: true,
          decimals: [17, 14],
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
