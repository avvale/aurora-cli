import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientRedirect extends StringValueObject {
  public readonly type: string = 'OAuthClientRedirect';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthClientRedirect',
          nullable: true,
          undefinable: true,
          maxLength: 2046,
        },
        validationRules,
      ),
    );
  }
}
