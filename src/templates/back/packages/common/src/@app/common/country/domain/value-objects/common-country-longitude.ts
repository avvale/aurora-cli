/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryLongitude extends DecimalValueObject {
  public readonly type: string = 'CommonCountryLongitude';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryLongitude',
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
