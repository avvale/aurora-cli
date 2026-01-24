import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nAdministrativeAreaLevel2 extends StringValueObject {
  public readonly type: string = 'CommonCountryI18nAdministrativeAreaLevel2';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryI18nAdministrativeAreaLevel2',
          nullable: true,
          undefinable: true,
          maxLength: 63,
        },
        validationRules,
      ),
    );
  }
}
