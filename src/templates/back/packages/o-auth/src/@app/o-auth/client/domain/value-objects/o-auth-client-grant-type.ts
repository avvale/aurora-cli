import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientGrantType extends EnumValueObject {
  public readonly type: string = 'OAuthClientGrantType';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthClientGrantType',
          nullable: false,
          undefinable: false,
          enumOptions: [
            'AUTHORIZATION_CODE',
            'CLIENT_CREDENTIALS',
            'PASSWORD',
            'REFRESH_TOKEN',
          ],
        },
        validationRules,
      ),
    );
  }
}
