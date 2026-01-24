import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nAdministrativeAreaLevel3 extends StringValueObject {
  public readonly type: string = 'CommonCountryI18nAdministrativeAreaLevel3';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryI18nAdministrativeAreaLevel3',
          nullable: true,
          undefinable: true,
          maxLength: 63,
        },
        validationRules,
      ),
    );
  }
}
