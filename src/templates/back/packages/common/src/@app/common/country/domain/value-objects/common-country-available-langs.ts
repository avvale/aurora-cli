/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryAvailableLangs extends JsonValueObject {
  public readonly type: string = 'CommonCountryAvailableLangs';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryAvailableLangs',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
