import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientAuthUrl extends StringValueObject {
  public readonly type: string = 'OAuthClientAuthUrl';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthClientAuthUrl',
          nullable: true,
          undefinable: true,
          maxLength: 2046,
        },
        validationRules,
      ),
    );
  }
}
