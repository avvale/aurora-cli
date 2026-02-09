/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryIso3166Numeric extends StringValueObject {
  public readonly type: string = 'CommonCountryIso3166Numeric';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryIso3166Numeric',
          nullable: false,
          undefinable: false,
          length: 3,
        },
        validationRules,
      ),
    );
  }
}
