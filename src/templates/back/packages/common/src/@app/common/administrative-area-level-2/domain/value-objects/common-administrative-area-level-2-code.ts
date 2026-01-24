import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2Code extends StringValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel2Code';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel2Code',
          nullable: false,
          undefinable: false,
          maxLength: 8,
        },
        validationRules,
      ),
    );
  }
}
