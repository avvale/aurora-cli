import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthRefreshTokenExpiredRefreshToken extends IntValueObject {
  public readonly type: 'OAuthRefreshTokenExpiredRefreshToken';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthRefreshTokenExpiredRefreshToken',
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
