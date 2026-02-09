/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nSlug extends StringValueObject {
  public readonly type: string = 'CommonCountryI18nSlug';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryI18nSlug',
          nullable: false,
          undefinable: false,
          maxLength: 128,
        },
        validationRules,
      ),
    );
  }
}
