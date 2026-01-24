import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthCredentialGrantType extends EnumValueObject {
  public readonly type: 'OAuthCredentialGrantType';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthCredentialGrantType',
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
