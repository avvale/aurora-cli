/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryCustomCode extends StringValueObject {
  public readonly type: string = 'CommonCountryCustomCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryCustomCode',
          nullable: true,
          undefinable: true,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
