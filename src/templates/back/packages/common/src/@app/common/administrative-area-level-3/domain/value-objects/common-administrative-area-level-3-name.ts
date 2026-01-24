import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3Name extends StringValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel3Name';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel3Name',
          nullable: false,
          undefinable: false,
          maxLength: 127,
        },
        validationRules,
      ),
    );
  }
}
