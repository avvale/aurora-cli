import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenExpiredAccessToken extends IntValueObject {
  public readonly type: 'OAuthAccessTokenExpiredAccessToken';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthAccessTokenExpiredAccessToken',
          nullable: true,
          undefinable: true,
          maxLength: 10,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
